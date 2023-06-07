import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className='myPageAccount'>
                <h2>계정 관리</h2>
                <div className="myPageAccountBackground">
                    <table>
                        <thead>
                            <tr>
                                <th>계정 정보</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <h4 style={{ paddingLeft: "10%" }}>계정 정보</h4>
                                </td>
                                <td>
                                    <Link to="/MyPage/Account/InfoChange/*">
                                        <button className='myPageAccountMNprofileButton'>수정</button>
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4 style={{ paddingLeft: "10%" }}>비밀번호</h4>
                                </td>
                                <td>
                                    <Link to="/MyPage/Account/ChangePassword/*">
                                        <button className='myPageAccountMNprofileButton'>변경</button>
                                    </Link>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <h4 style={{ paddingLeft: "10%" }}>주소지</h4>
                                </td>
                                <td>
                                    <Link to="/Mypage/Account/Address/*">
                                        <button className='myPageAccountMNprofilebutton'>변경</button>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Home;
