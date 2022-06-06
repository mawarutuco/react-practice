import React from "react";
import { useState } from "react-dom";
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
      name: "hyyyo",
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
        <img src={imgURL} />
        <span className="sale">{isSale ? "特價中!" : " "}</span>
        <p>品名:{name}</p>
        <p>價錢:{price}</p>
        <button onClick={() => addToCar(item)}>加入購物車</button>
        <button onClick={() => buySomething(price)}>購買</button>
      </div>
    );
  };

  const tmp =[]
  const [shoppingCarArr, setCar] = React.useState([]);
  const addToCar = (item) => {
    tmp.push(item);
    setCar(tmp);
    console.log(shoppingCarArr, shoppingCarArr.length);
  };

  const ShoppingCar = () => {
    // const tmp = true;
    const tmp = shoppingCarArr.length;

    const [show, setShow] = React.useState(false);
    const toggleModal = () => setShow(!show);

    return (
      <>
        <button onClick={() => toggleModal()}>購物車({tmp})</button>
        <Modal show={show} onHide={toggleModal}>
          <Modal.Header>購物車</Modal.Header>
          <Modal.Body>{tmp ? "結帳吧~~" : "目前沒有商品"}
          {}
          </Modal.Body>
          <Modal.Footer>
            <button disabled={tmp ? false : true}>結帳</button>
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
    </>
  );
};

export default Shopping;
