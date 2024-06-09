import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BottomBar.css';

function BottomBar() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // 뒤로 가기
  };

  const handleCartClick = () => {
    navigate('/cart'); // 장바구니 페이지로 이동
  };

  const handleVoiceClick = () => {
    // 음성인식 기능을 사용하는 로직 추가
  };

  return (
    <div className="bottom-bar">
      <div className="back-button" onClick={handleBackClick}></div>
      <div className="voice-button" onClick={handleVoiceClick}></div>
      <div className="cart-button" onClick={handleCartClick}></div>
    </div>
  );
}

export default BottomBar;
