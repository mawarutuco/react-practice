import React, { useState } from "react";
import "./all.css";
import swal from "sweetalert";
import ShoppingCart from "./ShoppingCart";
import Products from "./Store.js"

const Shopping = ({ skinName, setSkinName }) => {
  //個人餘額
  const [myCash, setMyCash] = useState(400);

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

  //商品放進購物車
  const [shoppingCartArr, setShoppingCart] = useState([]);

  //成功買到的商品塞到已擁有的商品Array
  const putToBoughtProduct = (obj) => {
    if (obj.length === undefined) {
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
  
  return (
    <>
      <p>個人餘額：{myCash}</p>
      <h3>賣場</h3>
      <ShoppingCart
        shoppingCartArr={shoppingCartArr}
        setShoppingCart={setShoppingCart}
        cashNotEnough={cashNotEnough}
        alertSussesAndUpdateCash={alertSussesAndUpdateCash}
        putToBoughtProduct={putToBoughtProduct}
      />
      <Products
        skinName={skinName}
        setSkinName={setSkinName}
        shoppingCartArr={shoppingCartArr}
        setShoppingCart={setShoppingCart}
        cashNotEnough={cashNotEnough}
        alertSussesAndUpdateCash={alertSussesAndUpdateCash}
        putToBoughtProduct={putToBoughtProduct}
        boughtProductArr={boughtProductArr}
      />
    </>
  );
};

export default Shopping;
