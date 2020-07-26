import React from 'react';
import './index.scss'

function ItemDetail({ title, children }) {
    let type = Object.prototype.toString.call(children) === '[object Object]';

    return (<div className="my-data-item-detail">
        <p>{title}</p>
        <div>{type ? [children] : children}</div>
    </div>)
}

export default ItemDetail