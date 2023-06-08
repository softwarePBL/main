import React, { useState, useEffect } from 'react';
import { dbService } from '../fbase';
import { getFirestore, addDoc, collection, query, updateDoc, where, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { getDownloadURL } from 'firebase/storage';
import Coffee_machine from './Coffee_machine';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const MyForm = ({ handleChange, handleSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
      setInputValue(event.target.value);
      handleChange(event.target.value);
  };

  const handleSearchClick = () => {
      handleSearch(inputValue);
    };

  return (
      <div className="search">
          <input
          name="searching"
          type="search"
          className="input"
          placeholder="검색어를 입력하세요"
          onChange={handleInputChange}
          />
          <button type="button" className="search_button" id="search_button" style={{ cursor: 'pointer' }} onClick={handleSearchClick}>      
              검색
          </button>
      </div>
  );
};

const Tool = () => {
  const [isMoreCoffeeVisible, setMoreCoffeeVisible] = useState(false);

    const handleChange = (value) => {
        console.log(value);
    };

    const toggleMoreCoffee = () => {
        setMoreCoffeeVisible(!isMoreCoffeeVisible);
    };

    const [products, setProducts] = useState([]);

  const [Tools, setTools] = useState([]);
    useEffect(() => {
      const s = query(collection(dbService, "product"), where('isbean', '==', false));
      onSnapshot(s, (snapshot) =>{
        const ProductArray = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          img: doc.data().img,
          price: doc.data().price,
        }));
        setTools(ProductArray);
      });
    }, []);

    return (
    <>
      <div className = "shop_page">
            <div className ="nav2">
                <ul>
                <li><Link to='/Shop/Shop'>원두</Link></li>
                    <li><Link to ='/Shop/Tool' style={{ color: 'burlywood'}}>도구</Link></li>
                    <li><a href="new_product.html">신상</a></li>
                    <li><a href="sale.html">세일</a></li>
                    <li><Link to='/Shop/Event'>기획전</Link></li>
                </ul>
            </div>
            
        </div>

			<MyForm handleChange={handleChange} />

        <div className="body2_content">
            <div className="tool_content">
                <ul>
                    <li>카테고리</li>
                    <li><Link to='/Shop/Coffee_machine'>커피머신</Link></li>
                    <li><Link to='/Shop/Grinder'>그라인더</Link></li>
                    <li><Link to='/Shop/Accessory'>액세서리</Link></li>
                    <li><Link to='/Shop/Drip_coffee'>드립커피</Link></li>
                </ul>
            </div>
        </div>
        <ul>
  {Tools.map((product) => (
    <li key={product.id}>
      <Link to={`/detail/${product.title}`}>
        {product.title}
        <img src={product.img} alt={product.title} />
      </Link>
    </li>
  ))}
</ul>

    </>
    );
};
export default Tool;