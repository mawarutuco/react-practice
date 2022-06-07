import React from "react";
import { useState, useEffect } from "react-dom";
import "./all.css";
import { Modal, Alert } from "react-bootstrap";
import swal from "sweetalert";

const Shopping = () => {
  //個人餘額
  const [myCash, setMyCash] = React.useState(200);

  //商品資料
  let data = [
    {
      id: 0,
      imgURL: "https://fakeimg.pl/50/?text=Hello",
      name: "hyo",
      price: 50,
      isSale: false,
    },
    {
      id: 1,
      imgURL: "https://fakeimg.pl/50/",
      name: "hyo_hyo",
      price: 200,
      isSale: true,
    },
    {
      id: 2,
      imgURL: "https://fakeimg.pl/50/",
      name: "hyyyoaaa",
      price: 500,
      isSale: false,
    },
  ];

  //所有商品
  const Products = () => {
    return (
      <>
        <div className="Products">
          {data.map((item) => {
            return <Product key={item.id} item={item} />;
          })}
        </div>
      </>
    );
  };

  //下單買東西
  const buySomething = (price) => {
    if (myCash < price) {
      return swal(`餘額不足`, { icon: "error" });
    }
    swal({
      title: "Are you sure?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("購買成功", { icon: "success" });
        setMyCash(myCash - price);
      }
    });
  };

  //單項商品
  const Product = ({ item }) => {
    const { id, imgURL, name, price, isSale } = item;

    return (
      <div className="Product">
        <img onClick={() => buySomething(price)} src={imgURL} />
        <span className="sale">{isSale ? "特價中!" : " "}</span>
        <p>品名:{name}</p>
        <p>價錢:{price}</p>
        <button onClick={() => addToCar(item)}>加入購物車</button>
        <button onClick={() => buySomething(price)}>購買</button>
      </div>
    );
  };

  //放進購物車
  const [shoppingCarArr, setCar] = React.useState([]);
  const addToCar = (item) => {
    const { id, name, price } = item;
    const pushItem = (prev) => {
      const quantity = 1;
      return [{ id, name, price, quantity }, ...prev];
    };
    setCar(pushItem);
    // console.log(shoppingCarArr);
  };

  const CarItem = (item) => {
    const { id, name, price, quantity } = item;
    return (
      <>
        <table>
          <tr>
            <td>品名{name}</td>
            <td>價格{price}</td>
            <td>數量{quantity}</td>
            <td>
              <button
                onClick={() => {
                  console.log(item);
                }}
              >
                刪除
              </button>
            </td>
          </tr>
        </table>
      </>
    );
  };

  const ShoppingCar = () => {
    const inCarItemQuantity = shoppingCarArr.length;

    const [show, setShow] = React.useState(false);
    const toggleModal = () => setShow(!show);

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
            <ol>
              {shoppingCarArr.map((item) => {
                const { id, name, price, quantity } = item;
                return (
                  <li key={id}>
                    <CarItem
                      id={id}
                      name={name}
                      price={price}
                      quantity={quantity}
                    />
                  </li>
                );
              })}
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <button disabled={inCarItemQuantity ? false : true}>結帳</button>
            <button onClick={toggleModal}>取消</button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <p>餘額{myCash}</p>
      <h3>賣場</h3>
      <Products />
      <br />
      <ShoppingCar />
      <button onClick={console.log(shoppingCarArr)}>查看目前</button>
    </>
  );
};

export default Shopping;
