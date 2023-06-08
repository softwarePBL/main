// ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import './productDetail.css';
import ik from'./img/user.png';

const firebaseConfig = {
    apiKey: "AIzaSyCd6bZWVMldbGNF8AVJ_uqnDkUQfKNlr2o",
    authDomain: "cafein-dd39e.firebaseapp.com",
    databaseURL: "https://cafein-dd39e-default-rtdb.firebaseio.com",
    projectId: "cafein-dd39e",
    storageBucket: "cafein-dd39e.appspot.com",
    messagingSenderId: "298159218568",
    appId: "1:298159218568:web:ba8d244cfd92458749e43d"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [countNumber, setCountNumber] = useState(1);
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const db = firebase.firestore();
          const productsRef = db.collection('product');
          const query = productsRef.where('id', '==', productId);
          const snapshot = await query.get();
  
          if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            const productData = { id: doc.id, ...doc.data() };
            setProduct(productData);
            console.log('Matching Product:', productData);
          } else {
            console.log('No such product!');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
  
      fetchProduct();
    }, [productId]);
  
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const db = firebase.firestore();
            const reviewsRef = db.collection('userReviews');
            const query = reviewsRef.where('productid', '==', productId);
            const snapshot = await query.get();
      
            if (!snapshot.empty) {
              const reviewList = [];
              for (const doc of snapshot.docs) {
                const reviewData = doc.data();
                console.log(reviewData);
                const userQuery = await db.collection('userInfomation').where('createrId', '==', reviewData.creatorId).get();
                const userData = userQuery.docs[0].data();
                const reviewWithCreatorName = {
                  id: doc.id,
                  creatorName: userData.name,
                  ...reviewData,
                };
                reviewList.push(reviewWithCreatorName);
              }
              setReviews(reviewList);
              console.log('Reviews:', reviewList);
            } else {
              console.log('No reviews found!');
            }
          } catch (error) {
            console.error('Error fetching reviews:', error);
          }
        };
      
        fetchReviews();
      }, [productId]);
      
  
      const handleLike = async () => {
        if (!user) {
          console.log('User is not logged in!');
          return;
        }
      
        const { uid } = user;
      
        try {
          const db = firebase.firestore();
          const likesRef = db.collection('Like');
          const query = likesRef.where('userId', '==', uid).where('id', '==', productId);
          const snapshot = await query.get();
      
          if (!snapshot.empty) {
            console.log('Product is already in Likes!');
            // 여기에서 추가되지 않은 알림을 표시할 수 있습니다.
            return;
          }
      
          await likesRef.add({
            id: productId,
            img: product.img,
            title: product.title,
            price: product.price,
            userId: uid,
          });
      
          console.log('Product added to Likes!');
        } catch (error) {
          console.error('Error adding product to Likes:', error);
        }
      };
      
  
    // const handleCart = async () => {
    //   if (!user) {
    //     alert("로그인을 해주십시오")
    //     console.log('User is not logged in!');
    //     return;
    //   }
  
    //   const { uid } = user;
  
    //   try {
    //     const db = firebase.firestore();
    //     const cartRef = db.collection('Cart');
    //     await cartRef.add({
        //   id: productId,
        //   img: product.img,
        //   title: product.title,
        //   price: product.price,
        //   text: product.text,
        //   stock: product.stock,
        //   userId: uid,
        //   countNumber: countNumber,
    //     });
    //     alert("장바구니에 추가되었습니다");
    //     console.log('Product added to Cart!');
    //   } catch (error) {
    //     console.error('Error adding product to Cart:', error);
    //   }
    // };

    const handleCart = async () => {
        if (!user) {
          console.log('User is not logged in!');
          return;
        }
      
        const { uid } = user;
      
        try {
          const db = firebase.firestore();
          const cartRef = db.collection('Cart');
          const query = cartRef.where('creatorId', '==', uid).where('productId', '==', productId);
          const snapshot = await query.get();
      
          if (!snapshot.empty) {
            console.log('Product is already in the cart!');
            // 여기에서 추가되지 않은 알림을 표시할 수 있습니다.
            return;
          }
      
          await cartRef.add({
            id: productId,
            img: product.img,
            title: product.title,
            price: product.price,
            text: product.text,
            stock: product.stock,
            userId: uid,
            countNumber: countNumber,
          });
      
          console.log('Product added to Cart!');
        } catch (error) {
          console.error('Error adding product to Cart:', error);
        }
      };
      
  
    return (
      <div>

        {product ? (
          <div>
            <h3 id='title'>{product.title}</h3>
            <div id='productIMG'><img src={product.img} alt={product.title} style={{width:"70%"}}/> </div>
            <p id='price'>가격: {product.price}</p>
            {/* 상품의 추가 정보 표시 */}
            <button onClick={handleLike}>찜하기</button>
            <button onClick={handleCart}>Add to Cart</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
  
  <h3 id='REVIEW'>Reviews</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} id='review_detial'>
                <img src={ik}/>
              <p>작성자: 익명</p>
              <p>내용: {review.text}</p>
              <img src={review.reviewimage}></img>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found.</p>
      )}
      </div>
    );
  };
  
  export default ProductDetail;