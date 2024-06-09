import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuType.css';
import BottomBar from './BottomBar'; // 하단 바 추가
import homelogo from './assets/homelogo.png';
import mcCafeImage from './assets/mcCafe.png';
import mcMorningImage from './assets/mcMorning.png';
import burgerImage from './assets/burger.png';
import dessertsImage from './assets/dessert.png';
import drinksImage from './assets/drink.png';
import sidesImage from './assets/side.png';

const menuSections = [
  { type: 'burger', label: '햄버거', image: burgerImage },
  { type: 'McMorning', label: '맥모닝', image: mcMorningImage },
  { type: 'sides', label: '사이드', image: sidesImage },
  { type: 'desserts', label: '디저트', image: dessertsImage },
  { type: 'McCafe', label: '맥카페', image: mcCafeImage },
  { type: 'drinks', label: '음료', image: drinksImage },
];

function MenuType() {
  const navigate = useNavigate();

  const handleMenuSelect = (type) => {
    navigate(`/menu-details/${type}`);
  };

  return (
    <div className="menu-type-container">
      <img src={homelogo} alt="Home Logo" className="home-logo" />
      <h2>원하시는 음식 종류를 골라주십시오.</h2>
      <div className="menu-sections">
        {menuSections.map(section => (
          <div key={section.type} className="menu-button" onClick={() => handleMenuSelect(section.type)}>
            <img src={section.image} alt={section.label} className="menu-image" />
            <span>{section.label}</span>
          </div>
        ))}
      </div>
      <BottomBar /> {/* 하단 바 추가 */}
    </div>
  );
}

export default MenuType;
