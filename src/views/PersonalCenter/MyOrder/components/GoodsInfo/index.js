import React from 'react';
import './index.scss';

// title: "华尔兹系列课程",
//         price: '¥999.00',
//         serises: '华尔兹课程（01）',
//         count: '1',
//         shopName: '中欧舞盟官方',
//         shopImg: '',
//         status: 'done'

export default function GoodsInfo({ title, price, shopName, shopImg, serises, count, status }) {
    return (<div className="my-order-goods-info">
        <div className="my-order-goods-info-title">
            <div className="my-order-goods-info-title-info">
                <img src={shopImg} alt=""/>
                <h6>{shopName}</h6>
            </div>
            {
                status === "done" ? <div className="my-order-goods-info-title-status my-order-goods-info-title-status-done">已完成</div> : null
            }
            {
                status === "cancel" ? <div className="my-order-goods-info-title-status my-order-goods-info-title-status-cancel">已取消</div> : null
            }
            {
                status === "pay" ? <div className="my-order-goods-info-title-status my-order-goods-info-title-status-pay">待支付</div> : null
            }
        </div>
        <div className="my-order-goods-info-content">
            <div className="my-order-goods-info-content-goods-info">
                <div className="my-order-goods-info-content-goods-info-img">
                    <img src="" alt=""/>
                </div>
                <div className="my-order-goods-info-content-goods-info-info">
                    <div className="my-order-goods-info-content-goods-info-info-title">
                        <p>{title}</p>
                        <span>{price}</span>
                    </div>
                    <div className="my-order-goods-info-content-goods-info-info-series">
                        <p>{serises}</p>
                        <span>× {count}</span>
                    </div>
                </div>
            </div>
            <div className="my-order-goods-info-content-goods-price">
                <p className="my-order-goods-info-content-goods-price-type">课程订单</p>
                <div>
                    <p className="my-order-goods-info-content-goods-price-count">共{count}件</p>
                    <p className="my-order-goods-info-content-goods-price-pay-count">
                        <span>实付：</span>
                        <span>¥999.00</span>
                    </p>
                </div>
            </div>
            <div className="my-order-goods-info-content-goods-op">
                {
                    status === 'pay' ? (<button className="my-order-goods-info-content-goods-op-button my-order-goods-info-content-goods-op-button-cancel-order">取消订单</button>) : null
                }
                {
                    (status === 'done' || status === 'pay' || status === 'cancel') ? (<button className="my-order-goods-info-content-goods-op-button my-order-goods-info-content-goods-op-button-get-detail">查看详情</button>) : null
                }
                {
                    status === 'pay' ? (<button className="my-order-goods-info-content-goods-op-button my-order-goods-info-content-goods-op-button-pay">去支付</button>) : null
                }
            </div>
        </div>
    </div>)
}