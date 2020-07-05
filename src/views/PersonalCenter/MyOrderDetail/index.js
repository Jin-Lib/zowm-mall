import React from 'react';
import { PageTitle } from '../../../components'
import './index.scss'
import GoodsInfo from '../MyOrder/components/GoodsInfo'

const MyOrderDetail = ({ history, location: { state } }) => {
    console.log('state', state)
    return (<div className="my-order-detail">
        <PageTitle title="订单详情" />
        <div className="my-order-detail-content">
            <GoodsInfo {...state} history={history} isDetailPage />
            <div className="my-order-detail-order-info">
                <h6>订单信息</h6>
                <div className="my-order-detail-order-info-content">
                    <p><span>订单编号</span>{state.orderNo}</p>
                    <p><span>下单时间</span>{state.orderDate}</p>
                    <p><span>快递单号</span></p>
                    <p><span>支付方式</span></p>
                </div>
            </div>
        </div>
    </div>)
}

export default MyOrderDetail