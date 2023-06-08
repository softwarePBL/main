import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from '../fbase';
import { Link } from 'react-router-dom';

const OnSale = () => {
  const [OnSale, setOnSale] = useState([]);

  async function fetchProducts() {
    const OnSaleCollectionRef = collection(dbService, 'product');
    const querySnapshot = await getDocs(OnSaleCollectionRef);
    const OnSaleArray = [];

    querySnapshot.forEach((doc) => {
      const { img, id, title, issale, price, sale } = doc.data();
      if (issale === true) {
        const discountedPrice = price - (price * (sale / 100));
        OnSaleArray.push({
          issale,
          img,
          sale,
          id,
          title,
          price,
          discountedPrice
        });
      }
    });

    OnSaleArray.sort((a, b) => b.sale - a.sale);

    setOnSale(OnSaleArray);

    
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  

  return (
    <div>
      <h1>메인페이지</h1>
      <Link to="/Shop/Shop">원두</Link>
      <Link to="/Shop/Tool">도구</Link>
      <Link to="/Shop/Event">이벤트</Link>

      <h2>issale이 true인 상품:</h2>
      <ul>
        {OnSale.map((product) => (
          <React.Fragment key={product.id}> {/*제품 id */}
            <li>{product.title}</li> {/*제품 이름 */}
            <li>
              <input type="image" src={product.img} alt={product.title} /> {/*제품 가격 */}
            </li>
            <li>가격: {product.price} 원</li>
            <li>할인된 가격: {product.price - (product.price * (product.sale / 100))} 원</li>
  
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default OnSale;
