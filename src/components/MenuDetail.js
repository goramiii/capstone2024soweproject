import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MenuDetail.css';
import homelogo from 'C:/Capstone/sowe/src/components/assets/homelogo.png';
import cartimage from 'C:/Capstone/sowe/src/components/assets/cartImage.png';

function MenuDetail() {
  const { type } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [greasiness, setGreasiness] = useState(3);
  const [hardness, setHardness] = useState(3);
  const [spiciness, setSpiciness] = useState(3);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/menu/${type}`);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, [type]);

  const handleFilterApply = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/filter`, {
        params: {
          category: type,
          greasiness,
          hardness,
          spiciness
        }
      });
      setMenuItems(response.data);
      setShowFilter(false); // 필터 적용 후 팝업 닫기
    } catch (error) {
      console.error("Error fetching filtered menu items:", error);
    }
  };

  const handleItemClick = (item) => {
    const productName = item.collection_name;
    navigate(`/product/${productName}/${type}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/menu-details/${category}`);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="menu-details-container">
      <header className="header">
        <div className="header-left">
          <button className="filter-button" onClick={toggleFilter}>맛조절</button>
        </div>
        <div className="header-right">
          <img src={homelogo} alt="Home Logo" className="home-logo" />
          <span className="title">주문하기</span>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleCategoryClick('burger')}>버거</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleCategoryClick('McMorning')}>맥모닝</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleCategoryClick('desserts')}>디저트</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleCategoryClick('McCafe')}>맥카페</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleCategoryClick('sides')}>사이드</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleCategoryClick('drinks')}>음료</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className={`filter-popup ${showFilter ? 'show' : ''}`}>
        <div className="filter-popup-content">
          <h2>맛 조절</h2>
          <div className="filter-input">
            <label>
              기름짐: {greasiness}
              <input
                type="range"
                min="1"
                max="5"
                value={greasiness}
                onChange={(e) => setGreasiness(Number(e.target.value))}
              />
            </label>
          </div>
          <div className="filter-input">
            <label>
              단단함: {hardness}
              <input
                type="range"
                min="1"
                max="5"
                value={hardness}
                onChange={(e) => setHardness(Number(e.target.value))}
              />
            </label>
          </div>
          <div className="filter-input">
            <label>
              맵기: {spiciness}
              <input
                type="range"
                min="1"
                max="5"
                value={spiciness}
                onChange={(e) => setSpiciness(Number(e.target.value))}
              />
            </label>
          </div>
          <button onClick={handleFilterApply}>적용하기</button>
        </div>
      </div>

      <div className={`body2 ${showFilter ? 'dimmed' : ''}`}>
        <div className="menu-items">
          {menuItems.map((item, index) => (
            <div 
              key={`${item.collection_name}-${index}`}
              className="menu-item"
              onClick={() => handleItemClick(item)}
            >
              <img src={item.img.link} alt={item.collection_name} className="menu-image" />
              <h2>{item.collection_name}</h2>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <button className="cart-button" onClick={() => navigate('/cart')}>
          <img src={cartimage} alt="Cart" className="cart-icon" />
        </button>
      </footer>
    </div>
  );
}

export default MenuDetail;
