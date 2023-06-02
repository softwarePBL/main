import React, { useState } from 'react';
import event_1 from './img/event_1.jpg'
import {Link} from 'react-router-dom';
import './coffee.css'
import './event.css'
import './event1.css'


const MyForm = ({ handleChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        handleChange(event.target.value);
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
            <button type="button" className="search_button" id="search_button" style={{ cursor: 'pointer' }}>   
                검색
            </button>
        </div>
    );
};

const Event1 = () => {

    const handleChange = (value) => {
        console.log(value);
    };

    return (
        <>
        <div className = "shop_page">
            <div className ="nav2">
                <ul>
                    <li><a href="coffee.html" >원두</a></li>
                    <li><a href="tool.html">도구</a></li>
                    <li><a href="new_product.html">신상</a></li>
                    <li><a href="sale.html">세일</a></li>
                    <li><a href="./Event.js" style={{ color: 'burlywood' }}>기획전</a></li>
                </ul>
            </div>
        </div>

        <div class="event_page1">
            <img class="img12345" src={event_1}></img>
        </div>

        </>  
    );
};

export default Event1;