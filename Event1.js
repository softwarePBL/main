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
                    <li><Link to='/Shop/Shop'>원두</Link></li>
                    <li><Link to='/Shop/Tool'>도구</Link></li>
                    <li>신상</li>
                    <li>세일</li>
                    <li><Link to='/Shop/Event0' style={{ color: 'burlywood'}}>기획전</Link></li>
                </ul>
            </div>
        </div>

        <div className="event_page1">
            <img className="img12345" src={event_1}></img>
        </div>

        </>  
    );
};

export default Event1;