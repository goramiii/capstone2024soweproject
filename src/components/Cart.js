import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import './Cart.css';
import homelogo from 'C:/Capstone/sowe/src/components/assets/homelogo.png';

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <header className="cart-header">
        <img src={homelogo} alt="Home Logo" className="home-logo" />
        <h1>결제하기</h1>
      </header>
      <div className="cart-body">
        <div className="cart-items">
          <div className="cart-item-header">
            <span>제품</span>
            <span>수량</span>
            <span>금액</span>
          </div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.collection_name}</span>
              <span>{item.quantity}</span>
              <span>{item.price * item.quantity} 원</span>
              <button onClick={() => handleRemove(index)} className="remove-button">
                제거
              </button>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <span>총 주문 금액: {totalAmount} 원</span>
        </div>
      </div>
      <div className="cart-actions">
        <button className="cancel-button">결제취소</button>
        <button className="checkout-button">결제하기</button>
      </div>
    </div>
  );
}

export default Cart;
