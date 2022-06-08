import React, { useState, useEffect } from "react";
import "./all.css";
import { Modal, Row, Col, Alert, Stack } from "react-bootstrap";
import swal from "sweetalert";

const Shopping = () => {
  //個人餘額
  const [myCash, setMyCash] = useState(400);

  //假商品資料
  const productData = [
    {
      id: 0,
      imgURL: "https://fakeimg.pl/50/?text=PinkTail",
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
      price: 150,
      isSale: false,
    },
    {
      id: 4,
      imgURL: "https://fakeimg.pl/50/",
      name: "阿尼亞笑你表情包",
      price: 1000,
      isSale: false,
    },
  ];

  //檢查錢夠不夠，不夠=>return true
  const cashNotEnough = (productPrice) => {
    if (myCash < productPrice) {
      swal(`尷尬...錢不夠`, { icon: "error" });
      return true;
    }
  };

  //購買後扣個人餘額，彈出alert說購買成功
  const alertSussesAndUpdateCash = (productPrice) => {
    let tmp = myCash - productPrice;
    setMyCash(tmp);
    swal(`購買成功，剩餘餘額${tmp}`, { icon: "success" });
  };

  //已擁有的商品Array
  const [boughtProductArr, setBoughtProduct] = useState([]);

  //成功買到的商品塞到已擁有的商品Array
  const putToBoughtProduct = (obj) => {
    if (obj.length == undefined) {
      //直接購買時，傳來的不是陣列，直接作setState動作
      const { id } = obj;
      const pushItem = (prev) => [{ id }, ...prev];
      setBoughtProduct(pushItem);
    } else {
      //商城結帳，傳來的是陣列，故需map跑
      obj.map((item) => {
        const { id } = item;
        const pushItem = (prev) => [{ id }, ...prev];
        setBoughtProduct(pushItem);
      });
    }
  };

  //商品放進購物車
  const [shoppingCarArr, setShoppingCar] = useState([]);
  const addToCar = (item) => {
    const { id, name, price } = item;
    const pushItem = (prev) => {
      const quantity = 1;
      return [{ id, name, price, quantity }, ...prev];
    };
    setShoppingCar(pushItem);
  };

  //展示單項商品
  const Product = ({ item }) => {
    const { id, imgURL, name, price, isSale } = item;

    //判斷商品狀態是在購物車or已經買了
    const alreadyInCar = shoppingCarArr.some((item) => item.id === id);
    const alreadyBought = boughtProductArr.some((item) => item.id === id);

console.log(alreadyInCar);

    //已放購物車or已買，btn都不能再按
    const btnDisabled = alreadyInCar || alreadyBought;

    //買東西
    const buyProduct = (item) => {
      const { price } = item;
      if (cashNotEnough(price)) return;
      swal({
        text: "確定購買?",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          alertSussesAndUpdateCash(price);
          putToBoughtProduct(item);
        }
      });
    };

    return (
      <div className="Product">
        <button
          onClick={() => {
            //要跟pixiJS對接
            console.log("TDM換裝");
          }}
          disabled={btnDisabled}
        >
          <img src={imgURL} />
        </button>
        <span className="sale">{isSale ? "特價中" : ""}</span>
        <span className="bought">
          {alreadyInCar ? "已放購物車" : ""}
          {alreadyBought ? "已購買" : ""}
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

  //展示所有商品
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

  //購物車內單品
  const ProductInCar = (item) => {
    const { id, name, price } = item;

    const deleteItem = (id) => {
      const newShoppingCarArr = shoppingCarArr.filter((item) => item.id != id);
      setShoppingCar(newShoppingCarArr);
    };

    return (
      <Row key={id}>
        <Col>{name}</Col>
        <Col>{price}</Col>
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

  //Modal要不要顯示
  const [show, setShow] = useState(false);

  //購物車按鈕&Modal
  const ShoppingCar = () => {
    const inCarItemQuantity = shoppingCarArr.length;

    const toggleModal = () => setShow(!show);

    const total = shoppingCarArr.reduce(
      (accumulator, item) => accumulator + item.price,
      0
    );

    //結帳
    const clearCar = (arr, productPrice) => {
      if (cashNotEnough(productPrice)) return;
      alertSussesAndUpdateCash(productPrice);
      putToBoughtProduct(arr);
      setShow(false);
      setShoppingCar([]);
    };

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
            {shoppingCarArr.map((item) => {
              const { id, name, price } = item;
              return (
                <ProductInCar key={id} id={id} name={name} price={price} />
              );
            })}
            {inCarItemQuantity ? (
              <Alert>總金額：{total}</Alert>
            ) : (
              "目前沒有商品"
            )}
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
