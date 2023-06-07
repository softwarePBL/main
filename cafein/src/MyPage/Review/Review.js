import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { dbService, authService } from '../../fbase';
import { Link } from 'react-router-dom';
import './Review.css';
import Col from 'react-bootstrap/Col';

const Review = () => {
  const user = authService.currentUser;
  const [confirmedProducts, setConfirmedProducts] = useState([]);

  //WReview에서 정보 가져오기
  useEffect(() => {
    const fetchConfirmedProducts = async () => {
      try {
        const wReviewCollectionRef = collection(dbService, 'WReview');
        const querySnapshot = await getDocs(wReviewCollectionRef);
        const confirmedProducts = [];
        querySnapshot.forEach((doc) => {
          const { ProductID, ProductImg, ProductName, userId } = doc.data();
          if (userId === user.uid) {
            confirmedProducts.push({
              ProductID,
              ProductImg,
              ProductName,
            });
          }
        });
        setConfirmedProducts(confirmedProducts);
      } catch (error) {
        console.error('Error retrieving confirmed products:', error);
      }
    };
  
    fetchConfirmedProducts();
  }, [user.uid]);
  
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
              <h3
                style={{
                  fontWeight: 600,
                  textDecoration: "none",
                  position: "relative",
                  float:"left",
                  left:"28%"
                }}
              >
                작성 가능한 리뷰
              </h3>
            </li>
            <li>
              <h3>
               <Link to="/MyPage/Review/RList/*"
                  style={{
                    fontWeight: 600,
                    textDecoration: "none",
                    color: "#6F6F6F",
                    float:"left",
                    position: "relative",
                    left:"35%"
                  }}
                >
                  내가 작성한 리뷰
                </Link>
              </h3>
            </li>
          </ul>
        </div>

        
        <div className="myPageReview2" style={{ marginTop: "6%" }}>
          <form>
            {confirmedProducts.map((product) => (
              <div className="myPageReviewContents" id="myPageReviewedContents1" key={product.ProductID}>
                <img src={product.ProductImg} id="imgConts" alt={product.ProductName} />
                <p id="idConts">{product.ProductName}</p>
                <Link to="/Mypage/Review/Write/*">
                  <button className="btn btn-primary"> 리뷰 작성하기 </button>
                </Link>
              </div>
            ))}
          </form>
          </div>
        </>
    );
};

export default Review;
