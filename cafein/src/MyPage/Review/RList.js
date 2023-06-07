import React, { useEffect, useState } from 'react';
import { Link } from'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import ReviewEdit from './Edit';
import { authService, dbService } from '../../fbase';
import Edit from './Edit';
import Col from 'react-bootstrap/Col';

const RList = () => {
    const [userReviews, setUserReviews] = useState([]);
    const user = authService.currentUser;

    useEffect(() => {
        const q = query(
        collection(dbService, 'userReviews'),
        where('creatorId', '==', user.uid)
        );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userReviewArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, }));
      setUserReviews(userReviewArray);
    }); }, [user]);

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

        <div id="myPageReview" className="col-9">
          <h2 style={{ marginTop: "5%", marginLeft: "30%", marginBottom: "2%" }}>
            리뷰 관리
          </h2>
    <ul style={{ listStyle: "none" }}>
      <li>
        <h3>
          <Link to="/MyPage/Review/Review/*"
           style={{
            fontWeight: 600,
            textDecoration: "none",
            position: "relative",
            float:"left",
            left:"28%",
            color: "#6F6F6F"
          }}
          >
            작성 가능한 리뷰
          </Link>
        </h3>
      </li>
      <li>
        <h3
          style={{
            fontWeight: 600,
            textDecoration: "none",
            float:"left",
            position: "relative",
            left:"35%"
          }}
        >
          내가 작성한 리뷰
        </h3>
      </li>
    </ul>
  </div>
  <div
    className="myPageReview2"
    style={{ marginTop: "6%" }}
    id="myPageReviewed"
  >
        {userReviews.map((userReview) => (
            <Edit
            key={userReview.id}
            reviewObj={userReview}
            isOwner={true} 
            />
        ))}
        </div>
        </>
    );
};

export default RList;
