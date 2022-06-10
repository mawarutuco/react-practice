import React, { useState } from "react";
import swal from "sweetalert";
import "./all.css";

//假商品資料
const productData = [
  {
    id: "tail0001",
    imgURL: "https://fakeimg.pl/50/?text=PinkTail",
    name: "粉色長條尾巴",
    price: 50,
    isSale: false,
  },
  {
    id: "tail0601",
    imgURL: "https://fakeimg.pl/50/",
    name: "粉色毛茸茸尾巴",
    price: 200,
    isSale: true,
  },
  {
    id: "tail0602",
    imgURL: "https://fakeimg.pl/50/",
    name: "金色毛茸茸尾巴",
    price: 500,
    isSale: false,
  },
  {
    id: "horn0101",
    imgURL: "https://fakeimg.pl/50/",
    name: "獨角獸角",
    price: 150,
    isSale: false,
  },
  {
    id: "sp0001",
    imgURL: "https://fakeimg.pl/50/",
    name: "阿尼亞笑你表情包",
    price: 1000,
    isSale: false,
  },
];

//展示所有商品
const Products = ({
  shoppingCartArr,
  setShoppingCart,
  cashNotEnough,
  alertSussesAndUpdateCash,
  putToBoughtProduct,
  boughtProductArr,
  skinName,
  setSkinName,
}) => {
  //展示單項商品
  const Product = ({ item }) => {
    const { id, imgURL, name, price, isSale } = item;

    //判斷商品狀態是在購物車or已經買了
    const alreadyInCart = shoppingCartArr.some((item) => item.id === id);
    const alreadyBought = boughtProductArr.some((item) => item.id === id);

    //已放購物車or已買，btn都不能再按
    const btnDisabled = alreadyInCart || alreadyBought;

    //商品放進購物車
    const addToCart = (item) => {
      const { id, name, price } = item;
      const pushItem = (prev) => {
        return [{ id, name, price }, ...prev];
      };
      setShoppingCart(pushItem);
    };

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
            setSkinName(id);
          }}
          disabled={btnDisabled}
        >
          <img src={imgURL} />
        </button>
        <span className="sale">{isSale ? "特價中" : ""}</span>
        <span className="bought">
          {alreadyInCart ? "已放購物車" : ""}
          {alreadyBought ? "已購買" : ""}
        </span>
        <p>品名:{name}</p>
        <p>價錢:{price}</p>
        <button onClick={() => addToCart(item)} disabled={btnDisabled}>
          加入購物車
        </button>
        <button onClick={() => buyProduct(item)} disabled={btnDisabled}>
          購買
        </button>
      </div>
    );
  };

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

export default Products;
