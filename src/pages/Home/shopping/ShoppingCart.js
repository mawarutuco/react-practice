import React, { useState } from "react";
import { Modal, Row, Col, Alert } from "react-bootstrap";

//購物車按鈕&Modal
const ShoppingCart = ({ shoppingCartArr,setShoppingCart,cashNotEnough,alertSussesAndUpdateCash,putToBoughtProduct }) => {
  //Modal要不要顯示
  const [show, setShow] = useState(false);

  const inCartItemQuantity = shoppingCartArr.length;

  const toggleModal = () => setShow(!show);

  const total = shoppingCartArr.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );

  //購物車內單品
  const ProductInCart = (item) => {
    const { id, name, price } = item;

    const deleteItem = (id) => {
      const newShoppingCartArr = shoppingCartArr.filter((item) => item.id !== id);
      setShoppingCart(newShoppingCartArr);
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

  //結帳
  const clearCart = (arr, productPrice) => {
    if (cashNotEnough(productPrice)) return;
    alertSussesAndUpdateCash(productPrice);
    putToBoughtProduct(arr);
    setShow(false);
    setShoppingCart([]);
  };

  return (
    <>
      <button onClick={() => toggleModal()}>購物車({inCartItemQuantity})</button>
      <Modal show={show} onHide={toggleModal}>
        <Modal.Header>
          <h3>購物車</h3>
        </Modal.Header>
        <Modal.Body>
          {shoppingCartArr.map((item) => {
            const { id, name, price } = item;
            return <ProductInCart key={id} id={id} name={name} price={price} />;
          })}
          {inCartItemQuantity ? <Alert>總金額：{total}</Alert> : "目前沒有商品"}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => clearCart(shoppingCartArr, total)}
            disabled={inCartItemQuantity ? false : true}
          >
            結帳
          </button>
          <button onClick={toggleModal}>取消</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShoppingCart;
