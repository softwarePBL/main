import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useMatch, useParams, BrowserRouter} from'react-router-dom';
import { createRoot } from 'react-dom';
import {authService} from '../src/fbase';

import NotFound from './NotFound';
import Headers from './Headers';
import Main from './Main';
import NotLogIn from './NotLogIn';
import Mypagenavi from './EleNav/Mypagenavi';
// 마이페이지 드롭다운
import DropDown from './DropDown'; 
// 마이페이지 홈
import Home from '../src/MyPage/Home';
// 장바구니
import Cart from '../src/MyPage/Cart';
import CartInfo from '../src/MyPage/CartInfo';
// 찜한 상품
import Like from '../src/MyPage/Like';
import LikeList from '../src/MyPage/LikeList';
// 주문 목록
import ShopList from '../src/MyPage/ShopList';
// 리뷰 관련
import Review from '../src/MyPage/Review';
import Reviewlist from '../src/MyPage/Reviewlist';
import ReviewWrite from '../src/MyPage/ReviewWrite';
//계정정보
import Account from './MyPage/AccountChange/Account';
import Address from './MyPage/AccountChange/Address';
import AddressL from './MyPage/AccountChange/AddressL';
import ChangePassword from './MyPage/AccountChange/ChangePassword';
import MyPageCategory from './EleNav/MyPageCategory';
//로그인/로그아웃
import Logout from '../src/Sign/Logout';
import Auth from '../src/Sign/Auth';
import UserAddress from './Sign/UserAddress';
import Modal from './AboutAddress/Modal';
import Portal from './AboutAddress/Portal';
import UserInfo from './Sign/UserInfo';
import SignUpDone from './Sign/SignUpDone';
// 리뷰
import All from './AboutReview/All';
import List from './AboutReview/List';
import Delete from './AboutReview/Delete';
import Edit from './AboutReview/Edit';
import Write from './AboutReview/Write';
// mbti
import mbtiTest from './coffembti/mbtiTest';
import data from './coffembti/data';
// shop
import Shop from './Shop/Shop';
import Event from './Shop/Event';
import Event1 from './Shop/Event1';
import Event2 from './Shop/Event2';
import Event3 from './Shop/Event3';
import Event4 from './Shop/Event4';
import Tool from './Shop/Tool';
import Coffee_machine from './Shop/Coffee_machine';
import Grinder from './Shop/Grinder';
import Accessory from './Shop/Accessory';
import Drip_coffee from './Shop/Drip_coffee';


const App = () => {
  const [init, setInit] = useState(false); // init = false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null); 

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? (
          <DropDown/>
        ):(
          <Headers />
        )}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/coffeembti/mbtiTest" element={<mbtiTest/>} />
              <Route path="/MyPage/Home/*" element={<Home/>} />
              <Route path="/MyPage/Cart/*" element={<Cart/>} />
              <Route path="/MyPage/Like/*" element={<Like/>} />
              <Route path="/MyPage/ShopList/*" element={<ShopList/>} />
              <Route path="/MyPage/Review/*" element={ <Review/>} />
              <Route path="/MyPage/Reviewlist/*" element={ <Reviewlist/>} />
              <Route path="/MyPage/ReviewWrite/*" element={ <ReviewWrite/>} />
              <Route path="/MyPage/Account/*" element={ <Account/>} />
              <Route path="/MyPage/AccountChange/Address/*" element={<Address/>} />
              <Route path="/MyPage/AccountChange/AddressL/*" element={<AddressL/>} />
              <Route path="/MyPage/AccountChange/ChangePassword/*" element={<ChangePassword/>} />
              <Route path="/MyPage/AccountChange/Account/*" element={<Account/>} />
              <Route path="/MyPage/CartInfo/*" element={<CartInfo/>} />
              <Route path="/MyPage/LikeList/*" element={<LikeList/>} />
              <Route path="/MyPage/ReviewList/*" element={<Reviewlist/>} />
              <Route path="/Sign/Logout/*" element={<Logout/>} />    
              <Route path="/AboutReview/All/*" element={<All/>} />
              <Route path="/AboutReview/List/*" element={<List/>} />
              <Route path="/AboutReview/Delete/*" element={<Delete/>} />
              <Route path="/AboutReview/Edit/*" element={<Edit/>} />
              <Route path="/AboutReview/Write/*" element={<Write/>} />
            </>
          ):(
            <>
              <Route path="/Sign/Auth/*" element={<Auth/>} />
              <Route path="/Sign/UserInfo/*" element={ <UserInfo/>} />
              <Route path="/Sign/UserAddress/*" element={<UserAddress/>} />
              <Route path="/Sign/SignUpDone/*" element={<SignUpDone/>} /> 
            </>
          )}
          <Route path="/*" element={<Main />} />
          <Route path="/Shop/Shop/*" element={<Shop/>}/>
          <Route path="/Shop/Event/*" element={<Event/>}/>
          <Route path="/Shop/Event1/*" element={<Event1/>}/>
          <Route path="/Shop/Event2/*" element={<Event2/>}/>
          <Route path="/Shop/Event3/*" element={<Event3/>}/>
          <Route path="/Shop/Event4/*" element={<Event4/>}/>
          <Route path="/Shop/Tool/*" element={<Tool/>}/>
          <Route path="/Shop/Coffee_machine/*" element={<Coffee_machine/>}/>
          <Route path="/Shop/Grinder/*" element={<Grinder/>}/>
          <Route path="/Shop/Accessory/*" element={<Accessory/>}/>
          <Route path="/Shop/Drip_coffee/*" element={<Drip_coffee/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;