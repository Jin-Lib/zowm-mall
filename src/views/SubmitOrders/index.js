import React, { Component } from 'react';

import { Radio, List, Toast } from 'antd-mobile';

import request from '../../utils/http'

import './index.scss';

const RadioItem = Radio.RadioItem;

const payList = [{ value: 'wxpay', label: '微信' }, { value: 'alipay', label: '支付宝' }]

export default class SubmitOrders extends Component{
    constructor(props) {
        super(props);

        this.state = {
            selectValue: '',
            payCount: '268.00',
            popupShow: false,
            couponSts: 1,
            couponList: [],
            // 订单入口 0购物车 1立即购买
            orderEntry: "0",
            userAddr: null,
            orderItems: [],
            coupon: {
            totalLength: 0,
            canUseCoupons: [],
            noCanUseCoupons: []
            },
            actualTotal: 0,
            total: 0,
            totalCount: 0,
            transfee: 0,
            reduceAmount: 0,
            remark: "",
            couponIds: []
        }

        this.addressInfo = window.localStorage.getItem('addressInfo') || undefined
    }

    componentDidMount() {
        this.loadOrderData();
    }

    submitPay = () => {
        console.log(this.props.history)
    }

    payChange = (value) => {
        this.setState({
            selectValue: value
        })
    }

    /**
     * 选择地址
     * @date 2020-06-16
     * @returns {any}
     */
    toAddrListPage = () => {
        // 跳转到地址页
        const { history } = this.props;
        history.push('/addressList')
    }

    /**
     * 提交订单
    */
    toPay = () => {
        if (!this.state.userAddr) {
            Toast.info('请选择地址', 2)
            return;
        }

        this.submitOrder();
    }

    //加载订单数据
    loadOrderData = () => {
        let addrId = 0;
        if (this.state.userAddr != null) {
            addrId = this.state.userAddr.addrId;
        }
        const params = {
            url: "/p/order/confirm",
            method: "POST",
            data: {
                addrId: addrId,
                orderItem: JSON.parse(localStorage.getItem("orderItem")),
                basketIds: this.state.orderEntry === "0" ? JSON.parse(localStorage.getItem("basketIds")) : undefined,
                couponIds: this.state.couponIds,
                userChangeCoupon: 1
            },
        };
        Toast.loading('正在加载中', 0);
        request(params)
            .then(res => {
                Toast.hide();
                let orderItems = [];
                res.shopCartOrders[0].shopCartItemDiscounts.forEach(itemDiscount => {
                    orderItems = orderItems.concat(itemDiscount.shopCartItems)
                })
                if (res.shopCartOrders[0].coupons) {
                    let canUseCoupons = []
                    let unCanUseCoupons = []
                    res.shopCartOrders[0].coupons.forEach(coupon => {
                        if (coupon.canUse) {
                            canUseCoupons.push(coupon)
                        } else {
                            unCanUseCoupons.push(coupon)
                        }
                    })
                    this.setState({
                        coupons: {
                            totalLength: res.shopCartOrders[0].coupons.length,
                            canUseCoupons: canUseCoupons,
                            unCanUseCoupons: unCanUseCoupons
                        }
                    })
                }

                this.setState({
                    orderItems: orderItems,
                    actualTotal: res.actualTotal,
                    total: res.total,
                    totalCount: res.totalCount,
                    userAddr: res.userAddr,
                    transfee: res.shopCartOrders[0].transfee,
                    shopReduce: res.shopCartOrders[0].shopReduce,
                });
            })
            .catch(error => {
                console.log('error', error)
                const { data } = error;
                if (typeof data === 'string') {
                    Toast.hide();
                    Toast.info(data);
                } else {
                    Toast.hide();
                }
            })
    }

    render() {
        const formatAddressInfo = this.addressInfo && JSON.parse(this.addressInfo)

        const {
            selectValue, payCount, 
            orderItems, 
            total,
        } = this.state;

        return (<div className="submit-orders-page">
            <div className="submit-orders-page-select-address" onClick={this.toAddrListPage}>
                {
                    !this.addressInfo
                        ? (
                            <React.Fragment>
                                <svg t="1592120660901" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2633"><path d="M234 651.328c11-3.328 28 0.307 28 25.672 0 25.365-19 32-28 34.807-65.678 19.559-106 46.04-106 75.193 0 60.199 171.923 109 384 109s384-48.801 384-109c0-29.006-39.913-55.365-105-74.894C781 709 757 708 757 682s16-37 34-30.365C893.993 683.332 960 732.19 960 787c0 95.545-200.576 173-448 173S64 882.545 64 787c0-54.988 66.435-103.984 170-135.672zM512.5 821C389.606 704.75 308.991 623.416 270.657 576.999 225.893 522.795 199 453.289 199 377.5 199 204.359 339.359 64 512.5 64S826 204.359 826 377.5c0 75.844-26.933 145.398-71.756 199.619C715.909 623.49 635.328 704.784 512.5 821z m0-94c81.667-76 132.39-126.587 152.168-151.76C712.934 513.811 762 458.014 762 377.5 762 239.705 650.295 128 512.5 128 374.705 128 263 239.705 263 377.5c0 80.239 48.266 136.53 96.726 197.272C385.909 607.59 436.833 658.333 512.5 727z m-0.5-166c-101.62 0-184-82.38-184-184s82.38-184 184-184 184 82.38 184 184-82.38 184-184 184z m0-64c66.274 0 120-53.726 120-120s-53.726-120-120-120-120 53.726-120 120 53.726 120 120 120z" p-id="2634" fill="#2c2c2c"></path></svg>
                                <span>选择地址</span>
                            </React.Fragment>
                        )
                        : <div className="submit-orders-page-select-address-info">
                            <p>{formatAddressInfo.receiver} {formatAddressInfo.mobile}</p>
                            <p>{formatAddressInfo.province} {formatAddressInfo.city} {formatAddressInfo.area} {formatAddressInfo.addr}</p>
                        </div>
                }
                <svg className="submit-orders-page-select-address-right" t="1592120801594" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8271"><path d="M368.3 879.4c-5.1 0-10.2-2-14.1-5.9-7.8-7.8-7.8-20.5 0-28.3L599 600.4c23.6-23.6 36.6-55 36.6-88.4s-13-64.8-36.6-88.4L354.2 178.7c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l244.8 244.8c31.2 31.2 48.4 72.6 48.4 116.7 0 44.1-17.2 85.6-48.4 116.7l-244.8 245c-3.9 3.9-9 5.8-14.2 5.8z" p-id="8272" fill="#2c2c2c"></path></svg>
            </div>
            <div className="submit-orders-page-goods-info">
                <div className="prod-item">
                    {
                        orderItems && orderItems.map((item, key) => {
                            return (
                                <React.Fragment key={key}>
                                    <div className="item-cont">
                                        <div className="prod-pic">
                                            <img src={item.pic} alt=""/>
                                        </div>
                                        <div className="prod-info">
                                            <p className="prodname">{item.prodName}</p>
                                            <div className="prod-info-cont">{item.skuName}</div>
                                            <div className="price-nums">x {item.prodCount}</div>
                                        </div>
                                        
                                    </div>
                                    <div className="totalPrice">
                                        <p className='symbol'>￥</p>
                                        <p className='big-num'>{item.price}</p>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
            <div className="submit-orders-page-pay-area">
                <List>
                    {payList.map(i => (
                        <RadioItem key={i.value} checked={selectValue === i.value} onChange={() => this.payChange(i.value)}>
                            {
                                i.value === "wxpay"
                                    ? (<div className="submit-orders-page-pay-area-wxPay">
                                        <svg t="1592121463103" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9901" width="200" height="200"><path d="M395.846 603.585c-3.921 1.98-7.936 2.925-12.81 2.925-10.9 0-19.791-5.85-24.764-14.625l-2.006-3.864-78.106-167.913c-0.956-1.98-0.956-3.865-0.956-5.845 0-7.83 5.928-13.68 13.863-13.68 2.965 0 5.928 0.944 8.893 2.924l91.965 64.43c6.884 3.864 14.82 6.79 23.708 6.79 4.972 0 9.85-0.945 14.822-2.926L861.71 282.479c-77.149-89.804-204.684-148.384-349.135-148.384-235.371 0-427.242 157.158-427.242 351.294 0 105.368 57.361 201.017 147.323 265.447 6.88 4.905 11.852 13.68 11.852 22.45 0 2.925-0.957 5.85-2.006 8.775-6.881 26.318-18.831 69.334-18.831 71.223-0.958 2.92-2.013 6.79-2.013 10.75 0 7.83 5.929 13.68 13.865 13.68 2.963 0 5.928-0.944 7.935-2.925l92.922-53.674c6.885-3.87 14.82-6.794 22.756-6.794 3.916 0 8.889 0.944 12.81 1.98 43.496 12.644 91.012 19.53 139.48 19.53 235.372 0 427.24-157.158 427.24-351.294 0-58.58-17.78-114.143-48.467-163.003l-491.39 280.07-2.963 1.98z" fill="#09BB07" p-id="9902"></path></svg>
                                        微信
                                    </div>)
                                    : (<div className="submit-orders-page-pay-area-aliPay">
                                        <svg t="1592121526388" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11856" width="200" height="200"><path d="M230.4 576.512c-12.288 9.728-25.088 24.064-28.672 41.984-5.12 24.576-1.024 55.296 22.528 79.872 28.672 29.184 72.704 37.376 91.648 38.912 51.2 3.584 105.984-22.016 147.456-50.688 16.384-11.264 44.032-34.304 70.144-69.632-59.392-30.72-133.632-64.512-212.48-61.44-40.448 1.536-69.632 9.728-90.624 20.992z m752.64 135.68c26.112-61.44 40.96-129.024 40.96-200.192C1024 229.888 794.112 0 512 0S0 229.888 0 512s229.888 512 512 512c170.496 0 321.536-83.968 414.72-211.968-88.064-43.52-232.96-115.712-322.56-159.232-42.496 48.64-105.472 97.28-176.64 118.272-44.544 13.312-84.992 18.432-126.976 9.728-41.984-8.704-72.704-28.16-90.624-47.616-9.216-10.24-19.456-22.528-27.136-37.888 0.512 1.024 1.024 2.048 1.024 3.072 0 0-4.608-7.68-7.68-19.456-1.536-6.144-3.072-11.776-3.584-17.92-0.512-4.096-0.512-8.704 0-12.8-0.512-7.68 0-15.872 1.536-24.064 4.096-20.48 12.8-44.032 35.328-65.536 49.152-48.128 114.688-50.688 148.992-50.176 50.176 0.512 138.24 22.528 211.968 48.64 20.48-43.52 33.792-90.112 41.984-121.344h-307.2v-33.28h157.696v-66.56H272.384V302.08h190.464V235.52c0-9.216 2.048-16.384 16.384-16.384h74.752V302.08h207.36v33.28h-207.36v66.56h165.888s-16.896 92.672-68.608 184.32c115.2 40.96 278.016 104.448 331.776 125.952z" fill="#06B4FD" p-id="11857"></path></svg>
                                        支付宝
                                    </div>)
                            }
                        </RadioItem>
                    ))}
                </List>
            </div>
            <div className="submit-orders-page-pay">
                <p>合计<span>¥{total}</span></p>
                <button onClick={this.submitPay}>提交支付</button>
            </div>
        </div>)
    }
}