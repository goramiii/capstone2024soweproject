import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import './OrderType.css';
import homelogo from 'C:/Capstone/sowe/src/components/assets/homelogo.png';
import inhere from 'C:/Capstone/sowe/src/components/assets/inhere.png';
import togo from 'C:/Capstone/sowe/src/components/assets/togo.png';

function OrderType() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleSelect = (type) => {
    addToCart(`Order Type: ${type}`);
    navigate('/menu-type');
  };

  return (
    <div className="order-container">
      <img src={homelogo} alt="Home Logo" className="home-logo" />
      <h1>식사하실 장소를 선택해주십시오</h1>
      <div className="button-container">
        <button className="order-option" onClick={() => handleSelect('매장에서 식사')}>
          <img src={inhere} alt="매장에서 식사" className="option-image" />
          매장에서 식사
        </button>
        <button className="order-option" onClick={() => handleSelect('포장하기')}>
          <img src={togo} alt="포장하기" className="option-image" />
          포장하기
        </button>
      </div>
      <p className="instruction-text">
        매장에서 드실 분은 매장식사를,<br />
        포장해서 드실 분은 포장하기 버튼을 <br />
        눌러주십시오.
      </p>
      <Link to="/" className="back-button">홈으로 돌아가기</Link>
    </div>
  );
}

export default OrderType;
