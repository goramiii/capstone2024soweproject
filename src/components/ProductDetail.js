import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import { CartContext } from '../contexts/CartContext';
import cartimage from 'C:/Capstone/sowe/src/components/assets/cartImage.png';
import backLogo from 'C:/Capstone/sowe/src/components/assets/backLogo.png';

function ProductDetail() {
  const { productName, category } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // 수량 상태 추가
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const menuResponse = await axios.get(`http://127.0.0.1:5000/menu/${category}`);
        const menuItem = menuResponse.data.find(item => item.collection_name === productName);

        if (menuItem) {
          const descriptionResponse = await axios.get(`http://127.0.0.1:5000/description/${category}/${productName}`);
          if (descriptionResponse.data) {
            setProduct({
              collection_name: menuItem.collection_name,
              img: menuItem.img,
              description: descriptionResponse.data.desc,
              price: descriptionResponse.data.price,
              calories: descriptionResponse.data.Calories,
              sodium: descriptionResponse.data.Sodium,
              sodiumPercent: descriptionResponse.data.SodiumPercent,
              sugar: descriptionResponse.data.Sugar,
              sugarPercent: descriptionResponse.data.SugarPercent,
              caffeine: descriptionResponse.data.Caffeine,
              greasiness: descriptionResponse.data.greasiness,
              hardness: descriptionResponse.data.hardness,
              spiciness: descriptionResponse.data.spiciness,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [category, productName]);

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={backLogo} alt="Back" className="back-icon" />
      </button>
      <h1>{product.collection_name}</h1>
      <img src={product.img.link} alt={product.collection_name} className="product-image" />
      <p>{product.description}</p>
      <p>Price: {product.price} 원</p>
      <p>Calories: {product.calories}</p>
      <p>Sodium: {product.sodium} mg ({product.sodiumPercent}%)</p>
      <p>Sugar: {product.sugar} g ({product.sugarPercent}%)</p>
      <p>Caffeine: {product.caffeine ? "Yes" : "No"}</p>
      <p>Greasiness: {product.greasiness}</p>
      <p>Hardness: {product.hardness}</p>
      <p>Spiciness: {product.spiciness}</p>
      <div className="quantity-selector">
        <button onClick={() => handleQuantityChange(-1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => handleQuantityChange(1)}>+</button>
      </div>
      <button className="add-to-cart-button" onClick={() => addToCart({ ...product, quantity })}>장바구니에 넣기</button>
      <button className="cart-button" onClick={() => navigate('/cart')}>
        <img src={cartimage} alt="Cart" className="cart-icon" />
      </button>
    </div>
  );
}

export default ProductDetail;
