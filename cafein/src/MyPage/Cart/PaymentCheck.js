import { dbService, authService} from '../../fbase';
import React, { useEffect,useCallback, useState } from 'react';
import { getFirestore, addDoc, collection, query, updateDoc, where, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';

import { Link } from 'react-router-dom';
import './Cart.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import List from '../Account/List';
import '../../Sign/UserAddress.css';
import Modal from "../../AboutAddress/Modal";
import DaumPostcode from "react-daum-postcode";

// 결제 페이지
const PaymentCheck = () => {
    const [PayOrder, setPayOrder] = useState(false);
    const user = authService.currentUser;
    
    const [Tog1, setTog1] = useState(false);
    const [Tog2, setTog2] = useState(false);

    const toggleEditing = () => setTog1((prev) => !prev);
    const toggleEditing2 = () => setTog2((prev) =>!prev);
    
    const [BeforeuserAddress, setBeforeUserAddress] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [ChangeInfo, setChangeInfo] = useState([]);

     useEffect(() => {
            const Address = query( 
            collection(dbService, 'userAddress'),
            where('createrId', '==', user.uid)
            ); // 기존 배송지 정보

            const Infomation = query(
                collection(dbService, 'userInfomation'),
                where('createrId', '==', user.uid)
            ); // 기존 유저 정보

            const unsubscribe1 = onSnapshot(Address, (snapshot) => {
            const userArray = snapshot.docs.map((doc)=>({
                ...doc.data(), 
                id: doc.id,}));
                setBeforeUserAddress(userArray);
                console.log(userArray);
            }); // 기본 배송지 정보

            const unsubscribe2 = onSnapshot(Infomation, (snapshot) => {
                const userInfoArray = snapshot.docs.map((doc)=>({
                    ...doc.data(), 
                    id: doc.id,}));
                    setUserInfo(userInfoArray);
                });  // 기본 유저 정보    
    },[user]);

    return (
        <>
        <div>
                <h1> 기존에 저장된 배송자 정보</h1>
                {userInfo && userInfo.length > 0 ? (
                    <div>{userInfo[0].name}
                    <br/>
                    {userInfo[0].number}
                    </div>
                    ) : (
                    <div>No user information available</div>
                    )}
                    <h4> 기존 저장된 주소 </h4>
                    {BeforeuserAddress && (
    <>
        {BeforeuserAddress.map((address) => (
            <div key={address.id}>
                <p> 우편 번호: {address.number} </p>
                <p> 주소: {address.address} </p>
            </div>
        ))}
    </>
)}
                <Link to="/MyPage/Cart/Delivery/*"> <button> 배송지 정보 변경하기 </button></Link>
         <br/>
          <Link to="/MyPage/Cart/PurchaseDone/*"><button> 결제 하기 </button></Link>
          </div>
      </>
  );
}

export default PaymentCheck;
