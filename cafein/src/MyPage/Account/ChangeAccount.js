import React from'react';
import UserInfoChange from './InfoChange';
import MyAddress from './MyAd';

import InfoChange from './InfoChange';
import MyAd from './MyAd';
import './ChangeAccount.css';

const changeAccount = () =>{
    return (
        <>
            <div className="changeAccountWrap">
                <h1> 정보 변경 </h1>
                <div>
                <InfoChange/>
                </div>
                <br/>
                </div>
                <MyAd/>
        </>
        );
};

export default changeAccount;
