import React, { useState } from 'react';
import Event from './Event.js';
import Event1 from './Event1.js';
import {Link} from 'react-router-dom';
import event1 from './img/event1.jpg'
import event2 from './img/event2.jpg'
import event3 from './img/event3.jpg'
import event4 from './img/event4.jpg'
import './coffee.css'
import './event.css'


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

const Event_page = () => {

    const handleChange = (value) => {
        console.log(value);
    };

    return (
        <>
        <div className = "shop_page">
            <div className ="nav2">
                <ul>
                    <li><a><Link to='/Shop/Shop'>원두</Link></a></li>
                    <li><a href="tool.html">도구</a></li>
                    <li><a href="new_product.html">신상</a></li>
                    <li><a href="sale.html">세일</a></li>
                    <li><a href="./Event.js" style={{ color: 'burlywood' }}>기획전</a></li>
                </ul>
            </div>
        </div>

        <MyForm handleChange={handleChange}/>

        <div class="title_plan">
        <span class="banner_title">
            Weekly Special<br/>
            <span class="title_content">
                꼭 갖고 싶은 그 상품들! 다양한 혜택까지!
            </span>
        </span>
        </div>

        <div class="event_banner">
            <div class="weekly_special">
                <div class="weekly_special_banner">
                    <div class="event_1">
                        <Link to='/Shop/Event1'>
                            <img src={event1} ></img>
                        </Link>
                    </div>
                    <div class="event_2">
                        <Link to='/Shop/Event2'>
                            <img src={event2} ></img>
                        </Link>
                    </div>
                </div>
            </div>
            <div class="ongoing_event">
                <span class="ongoing_title">
                    지금 진행 중인 행사예요
                </span>
            </div>
        </div>
        <div class="ongoing_special_banner">
            <div class="event_3">
                <Link to='/Shop/Event3'>
                    <img src={event3} ></img>
                </Link>
            </div>
            <div class="event_4">
                <Link to='/Shop/Event4'>
                    <img src={event4} ></img>
                </Link>
            </div>
        </div>

        </>  
    );
};

export default Event_page;