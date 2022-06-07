import React, { useState, useEffect } from "react";
import "./all.css";
import { Modal, Row, Col, Alert } from "react-bootstrap";
import swal from "sweetalert";

const Shopping = () => {
  //個人餘額
  const [myCash, setMyCash] = useState(200);

  //商品資料
  // let productData = [
  //   {
  //     id: 0,
  //     imgURL: "https://fakeimg.pl/50/?text=Hello",
  //     name: "hyo",
  //     price: 50,
  //     isSale: false,
  //   },
  //   {
  //     id: 1,
  //     imgURL: "https://fakeimg.pl/50/",
  //     name: "hyo_hyo",
  //     price: 200,
  //     isSale: true,
  //   },
  //   {
  //     id: 2,
  //     imgURL: "https://fakeimg.pl/50/",
  //     name: "hyyyoaaa",
  //     price: 500,
  //     isSale: false,
  //   },
  //   {
  //     id: 3,
  //     imgURL: "https://fakeimg.pl/50/",
  //     name: "yoooo",
  //     price: 100,
  //     isSale: false,
  //   },
  // ];
  const [productData, setProductData] = useState([
    {
      id: 0,
      imgURL: "https://fakeimg.pl/50/?text=Hello",
      name: "粉色長條尾巴",
      price: 50,
      isSale: false,
    },
    {
      id: 1,
      imgURL: "https://fakeimg.pl/50/",
      name: "粉色毛茸茸尾巴",
      price: 200,
      isSale: true,
    },
    {
      id: 2,
      imgURL: "https://fakeimg.pl/50/",
      name: "金色毛茸茸尾巴",
      price: 500,
      isSale: false,
    },
    {
      id: 3,
      imgURL: "https://fakeimg.pl/50/",
      name: "獨角獸角",
      price: 100,
      isSale: false,
    },
  ]);

  //檢查錢夠不夠
  const cashNotEnough = (price) => {
    if (myCash < price) {
      swal(`尷尬...錢不夠`, { icon: "error" });
      return true;
    }
  };

  //購買後扣錢
  const updateCash = (price) => {
    setMyCash(myCash - price);
  };

  //買的東西塞到已買
  const putToBoughtProduct = (id) => {
    const pushItem = (prev) => [{ id }, ...prev];
    setBoughtProduct(pushItem);
  };

  const [boughtProductArr, setBoughtProduct] = useState([]);
  //買東西
  const buyProduct = (item) => {
    const { id, name, price } = item;
    if (cashNotEnough(price)) return;
    swal({
      text: "確定購買?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        updateCash(price);
        putToBoughtProduct(id);
        swal("購買成功", { icon: "success" });
      }
    });
  };

  //放進購物車
  const [shoppingCarArr, setShoppingCar] = useState([]);
  const addToCar = (item) => {
    const { id, name, price } = item;
    const pushItem = (prev) => {
      const quantity = 1;
      return [{ id, name, price, quantity }, ...prev];
    };
    setShoppingCar(pushItem);
  };

  //單項商品
  const Product = ({ item }) => {
    const { id, imgURL, name, price, isSale } = item;

    //判斷商品是在購物車 or 已經買了
    const itemInCar = shoppingCarArr.find((item) => item.id === id);
    const boughtItem = boughtProductArr.find((item) => item.id === id);
    const btnDisabled = itemInCar || boughtItem;

    return (
      <div className="Product">
        <button
          onClick={() => {
            console.log("TDM換裝");
          }}
          disabled={btnDisabled}
        >
          <img src={imgURL} />
        </button>
        <span className="sale">{isSale ? "特價中!" : ""}</span>
        <span className="bought">
          {itemInCar ? "已放購物車" : ""}
          {boughtItem ? "已購買" : ""}
        </span>
        <p>品名:{name}</p>
        <p>價錢:{price}</p>
        <button onClick={() => addToCar(item)} disabled={btnDisabled}>
          加入購物車
        </button>
        <button onClick={() => buyProduct(item)} disabled={btnDisabled}>
          購買
        </button>
      </div>
    );
  };

  //所有商品
  const Products = () => {
    return (
      <>
        <div className="Products">
          {productData.map((item) => {
            if (!item.bought) return <Product key={item.id} item={item} />;
          })}
        </div>
      </>
    );
  };

  //結帳
  const clearCar = (arr, price) => {
    if (cashNotEnough(price)) return;
    updateCash(price);
    setShoppingCar([]);
    arr.map((item) => {
      const { id } = item;
      putToBoughtProduct(id);
    });
    swal("購買成功", { icon: "success" });
  };

  //購物車內單品
  const ProductInCar = (item) => {
    const { id, name, price, quantity } = item;

    const deleteItem = (id) => {
      const newShoppingCarArr = shoppingCarArr.filter((item) => item.id != id);
      setShoppingCar(newShoppingCarArr);
    };

    return (
      <Row key={id}>
        <Col>{name}</Col>
        <Col>{price}</Col>
        <Col>{quantity}</Col>
        <Col>
          <button
            onClick={() => {
              deleteItem(id);
            }}
          >
            刪除
          </button>
        </Col>
      </Row>
    );
  };

  //購物車按鈕&Modal
  const ShoppingCar = () => {
    const inCarItemQuantity = shoppingCarArr.length;

    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    const total = shoppingCarArr.reduce(
      (accumulator, item) => accumulator + item.price,
      0
    );

    return (
      <>
        <button onClick={() => toggleModal()}>
          購物車({inCarItemQuantity})
        </button>
        <Modal show={show} onHide={toggleModal}>
          <Modal.Header>
            <h3>購物車</h3>
          </Modal.Header>
          <Modal.Body>
            {inCarItemQuantity ? "" : "目前沒有商品"}
            {shoppingCarArr.map((item) => {
              const { id, name, price, quantity } = item;
              return (
                <ProductInCar
                  key={id}
                  id={id}
                  name={name}
                  price={price}
                  quantity={quantity}
                />
              );
            })}
            <br />
            {inCarItemQuantity ? <Alert>總金額：{total}</Alert> : ""}
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => clearCar(shoppingCarArr, total)}
              disabled={inCarItemQuantity ? false : true}
            >
              結帳
            </button>
            <button onClick={toggleModal}>取消</button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <p>個人餘額：{myCash}</p>
      <h3>賣場</h3>
      <ShoppingCar />
      <Products />
    </>
  );
};

export default Shopping;
