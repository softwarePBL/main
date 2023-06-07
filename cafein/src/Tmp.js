import { dbService, authService } from './fbase';
  import React, { useEffect, useState } from 'react';
  import { collection, query, where, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';
  import { Link } from 'react-router-dom';
  import Container from 'react-bootstrap/Container';
  import Col from 'react-bootstrap/Col';
  import Row from 'react-bootstrap/Row';

  // 장바구니
  const Tmp = () => {
    const [userCart, setUserCart] = useState([]);
    const user = authService.currentUser;

    useEffect(() => {
      const q = query(
        collection(dbService, 'Cart'),
        where('UserID', '==', user.uid)
      );
          
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const userArray = snapshot.docs.map((doc)=>({
          ...doc.data(), 
          id: doc.id,}));
        setUserCart(userArray);});
      },[user]);
    

    return (
        <>
          {userCart.map((userCart) => (
              <div
              key={userCart.id} 
              cart={userCart}
              > 
              이미지 : <img src={userCart.ProductImg}/><br />
            상품 이름 : {userCart.ProductName} <br />
             상품 가격 : {userCart.ProductPrice} <br />
             상품 갯수 : {userCart.countNumber}
             </div>  ))}
      </>
    );
  }

export default Tmp;


