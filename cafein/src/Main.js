import React from 'react';
import {Link} from 'react-router-dom';
import background2 from './background2.png';
import './Header.css'


const Main = () => {
    return (
        <div className="container">
            <img className="background2" src={background2}></img>
            <div id="mbti_box">
                <button class = "mbti_btn" style={{cursor:'pointer'}}>커피 MBTI</button>
            </div>
        </div>
    );
};

export default Main;