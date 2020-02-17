import React from 'react';
import './Body.css';

export const AppBody = (props) => {
    return (
        <div className="AppBody">
            { props.children }
        </div>
    );
}