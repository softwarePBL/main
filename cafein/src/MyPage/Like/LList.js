import { getFirestore, addDoc, doc, updateDoc, deleteDoc, getDocs, collection, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { dbService, authService, storageService } from "../../fbase";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { deleteObject, ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import './Like.css';

// LikeList.js
const LList = ({like, isOwner}) => {
    const user = authService.currentUser;

    const onDeleteClick = async () => {
            await deleteDoc(doc(dbService, `Like/${like.id}`));
            if(like.ProductImg !== "") {
                await deleteDoc(doc(dbService, like.ProductImg));
            }
    };

    return(
        <>
        <img src={like.ProductImg} className="LikeimgConts"/> {/*상품 사진*/}
         <p className="LikeidConts">{like.ProductName}</p> {/*상품명*/}
           <button onClick={onDeleteClick} className={`${"cancleConts"} ${"btn-close"}`}></button>
           <br/>
        </>
    );
};

export default LList;

{/*<form>
          <div className="myPageLikeConts" id="myPageLikeContents3">
            <a href="#">
              <img src={Pic} className="imgConts" />
              <p className="idConts">상품명상품명상품명상품명상품명</p>
            </a>
            <button className={`${"cancleConts"} ${"btn-close"}`}
              aria-label="Close"/>
            </div>
            </form>
<hr />*/}
