import React from 'react';
import {Link} from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <h1>메인페이지</h1>
            <Link to='/Shop/Shop'>원두</Link>
            <Link to='/Shop/Tool'>도구</Link>
            <Link to='/Shop/Event'>이벤트</Link>

        </div>
    );
};

export default Main;