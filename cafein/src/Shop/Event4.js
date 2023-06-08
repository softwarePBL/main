import React, { useState } from 'react';
import event_4_2 from './img/event_4_2.jpg'
import {Link} from 'react-router-dom';
import './coffee.css'
import './event.css'
import './event4.css'


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

const Event4 = () => {

    const handleChange = (value) => {
        console.log(value);
    };

    return (
        <>
        <div className = "shop_page">
            <div className ="nav2">
                <ul>
                <li><a><Link to='/Shop/Shop'>원두</Link></a></li>
                    <li><a><Link to='/Shop/Tool'>도구</Link></a></li>
                    <li><a><Link to='/Shop/NewProduct'>신상</Link></a></li>
                    <li><a><Link to='/Shop/OnSale'>세일</Link></a></li>
                    <li><a><Link to='/Shop/Event0' style={{ color: 'burlywood'}}>기획전</Link></a></li>
                </ul>
        </div>
            
        </div>

        <div className="event_page1">
            <img className="img123456" src={event_4_2}></img>
        </div>

        </>  
    );
};

export default Event4;