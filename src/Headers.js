
import { Link } from'react-router-dom';
import Auth from './Sign/Auth';
import Shop from './Shop/Shop';

import logo from './Sign/logo_2.jpg';
import {React, useState} from 'react';
import './Header.css';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


export default function Header() {
      return(
      <div className="header">
        <div className="logo">
                  {/*로고*/}
                  <img src={logo} className="logo_home_img" alt="logo" />
              </div>
              <span className="title">Cafe인</span>
              <span className="nav1">
                  <ul>
                      <li>
                          <Link to="../Shop/Shop" style={{ fontSize: "2.2vw" }}> 
                              Shop
                          </Link>
                      </li>
                      <li>
                          <Link to="../Sign/Auth">Login</Link>
                      </li>
                  </ul>
              </span>
              
        <div className="guest">guest1 님</div>
        </div>
    );
} 