import React from 'react';
import './index.scss';

function ContentTitle({ title, rightCon }) {
    return (<div className="content-title">
        <p>{title}</p>
        <div>{rightCon}</div>
    </div>)
}

export default ContentTitle