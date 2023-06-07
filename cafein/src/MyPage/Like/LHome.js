import { dbService, authService } from '../../fbase';
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';
import LList from './LList';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import './Like.css';

// 찜한 상품 ( Like.js )
const LHome = () => {
  const [userLike, setUserLike] = useState([]);
  const user = authService.currentUser;

  useEffect(() => {
    const q = query(
      collection(dbService, 'Like'),
      where('UserID', '==', user.uid)
    );
        
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userArray = snapshot.docs.map((doc)=>({
        ...doc.data(), 
        id: doc.id,}));
      setUserLike(userArray);
    },[user]);
  });

  return (
    <>
    <Col lg="3" md="3" sm="1" xs="1">
          <div className="myCafeIn">
                <Link to="/Home/*">My CafeIn</Link>
                  <ul className="list-group list-group-flush" style={{ listStyle: "none" }}>
                      <li>
                      <Link to="/MyPage/Cart/*" style={{color:'#8D5124', fontWeight:550}}>장바구니</Link>
                      </li>
                      <hr/>
                      <li>
                      <Link to="/MyPage/Like/*"> 찜한 상품</Link>
                      </li>
                      <hr />
                      <li>
                      <Link to="/MyPage/ShopList/*">주문목록</Link>
                      </li>
                      <hr />
                      <li>
                      <Link to="/MyPage/Review/*">리뷰관리</Link>
                      </li>
                      <li>
                      <Link to="/MyPage/Review/*" style={{ color: "#6F6F6F" }}>작성 가능한 리뷰</Link>
                      </li>
                      <li>
                      <Link to="/MyPage/Reviewlist/*" style={{ color: "#6F6F6F" }}>내가 작성한 리뷰 </Link></li>
                      <hr/>
                      <li>
                        <Link to="/MyPage/Account/*">계정 관리</Link>
                        </li>
                  </ul>
              </div>
              </Col> 

    <div>
      <div id="myPageLike" className="col-9">
          <h2 style={{ marginTop: "5%", marginLeft: "30%", marginBottom: "2%" }}>
            관심 상품
          </h2>
    
        </div>
        
        <div className="myPageLike2">
      {userLike.map((likes) => (
            <LList
              key={likes.id} 
              like={likes}
              />  
      ))} 
    </div>
    </div>
    </>
  );
};

export default LHome;