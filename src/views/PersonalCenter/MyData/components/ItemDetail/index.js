import React from 'react';
import './index.scss'

function ItemDetail({ title, children }) {
    return (<div className="my-data-item-detail">
        <p>{title}</p>
        <div>{children}</div>
    </div>)
}

export default ItemDetail