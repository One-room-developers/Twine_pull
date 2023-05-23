import * as React from 'react';
import './user-board-route.css';



export const UserBoardRoute: React.FC = () => {
    return (
        <div className="user-board" >
            <div className="top">
                <div className='search-bar'></div>
            </div>
            <div left-ui></div>
            <div className='main'></div>
        </div>
    );
};