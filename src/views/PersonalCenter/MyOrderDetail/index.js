import React, { useEffect, useState } from 'react';
import { Toast } from 'antd-mobile';
import { PageTitle } from '../../../components'
import './index.scss'
import GoodsInfo from '../MyOrder/components/GoodsInfo'
import { httpApp as request } from '../../../utils'

const MyOrderDetail = ({ history, location: { state } }) => {
    const [orderDetail, setOrderDetail] = useState({})
    /**
     * 获取课程列表
     * @date 2020-06-28
     * @param {any} data
     * @returns {any}
     */
    const getOrderDetail = (data) => {
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/order/getMyOrderDetail',
            method: "GET",
            data: data,
        }
        return new Promise(() => {
            request(params)
                .then((res) => {
                    Toast.hide();
                    setOrderDetail(res)
                })
                .catch((error) => {
                    const { data } = error;
                    const { error: errMsg } = data || {};
                    Toast.info(errMsg || "未获取到订单")
                })
        })
    }

    useEffect(() => {
        getOrderDetail({
            orderId: state.orderId,
            sourceType: state.sourceType,
        })
    }, [])

    return (<div className="my-order-detail">
        <PageTitle title="订单详情" />
        <div className="my-order-detail-content">
            <GoodsInfo {...orderDetail} history={history} isDetailPage />
            <div className="my-order-detail-order-info">
                <h6>订单信息</h6>
                <div className="my-order-detail-order-info-content">
                    <p><span>订单编号</span>{orderDetail.orderNo}</p>
                    <p><span>下单时间</span>{orderDetail.orderDate}</p>
                    <p><span>快递单号</span>{orderDetail.expressNo}</p>
                    <p><span>支付方式</span>{orderDetail.payWay}</p>
                </div>
            </div>
        </div>
    </div>)
}

export default MyOrderDetail