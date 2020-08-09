import React from 'react';
import './index.scss';

export default function GoodsInfo(params) {
    const {
        count, objectLogo, objectName,
        price, orderName, status, orderPic,
        orderNo, history, isDetailPage,
        sourceType, orderId, sourceTypeName, productPrice
    } = params;

    const showDetail = () => {
        if (!isDetailPage) {
            history.push('/myOrderDetail', {
                sourceType, orderId,
            })
        }
    }

    return (<div className="my-order-goods-info">
        <div className="my-order-goods-info-title">
            <div className="my-order-goods-info-title-info">
                <img src={objectLogo} alt=""/>
                <h6>{objectName}</h6>
            </div>
            {
                status == "1" ? <div className="my-order-goods-info-title-status my-order-goods-info-title-status-pay">{params.statusName}</div> : null
            }
            {
                status == "2" ? <div className="my-order-goods-info-title-status my-order-goods-info-title-status-cancel">{params.statusName}</div> : null
            }
            {
                status == "3" ? <div className="my-order-goods-info-title-status my-order-goods-info-title-status-pay">{params.statusName}</div> : null
            }
            {
                status == "4" ? <div className="my-order-goods-info-title-status my-order-goods-info-title-status-pay">{params.statusName}</div> : null
            }
            {
                status == "5" ? <div className="my-order-goods-info-title-status my-order-goods-info-title-status-done">{params.statusName}</div> : null
            }
            {
                status == "6" ? <div className="my-order-goods-info-title-status my-order-goods-info-title-status-pay">{params.statusName}</div> : null
            }
        </div>
        <div className="my-order-goods-info-content" onClick={showDetail}>
            <div className="my-order-goods-info-content-goods-info">
                <div className="my-order-goods-info-content-goods-info-img">
                    <img src={orderPic} alt=""/>
                </div>
                <div className="my-order-goods-info-content-goods-info-info">
                    <div className="my-order-goods-info-content-goods-info-info-title">
                        <p>{orderName}</p>
                    </div>
                    <div className="my-order-goods-info-content-goods-info-info-series">
                        <p>{productPrice}</p>
                        <span>× {count}</span>
                    </div>
                </div>
            </div>
            <div className="my-order-goods-info-content-goods-price">
                <p className="my-order-goods-info-content-goods-price-type">{sourceTypeName}</p>
                <div>
                    <p className="my-order-goods-info-content-goods-price-count">共{count}件</p>
                    <p className="my-order-goods-info-content-goods-price-pay-count">
                        <span>实付：</span>
                        <span>{price}</span>
                    </p>
                </div>
            </div>
            <div className="my-order-goods-info-content-goods-op">
                {/* {
                    status == '1' ? (<button className="my-order-goods-info-content-goods-op-button my-order-goods-info-content-goods-op-button-cancel-order">取消订单</button>) : null
                } */}
                {/* {
                    (status == '5' || status == '1' || status === 'cancel') ?
                    (<button
                        className="my-order-goods-info-content-goods-op-button my-order-goods-info-content-goods-op-button-get-detail"
                        onClick={showDetail}>
                        查看详情
                    </button>) : null
                } */}
                {
                  !isDetailPage && (
                    <button
                      className="my-order-goods-info-content-goods-op-button my-order-goods-info-content-goods-op-button-get-detail"
                      onClick={showDetail}>
                      查看详情
                    </button>
                  )
                }
                {
                    status == '1' ? (<button className="my-order-goods-info-content-goods-op-button my-order-goods-info-content-goods-op-button-pay">去支付</button>) : null
                }
            </div>
        </div>
    </div>)
}