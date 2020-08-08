import React, { Component } from 'react';

import { Radio, List, Toast } from 'antd-mobile';

import { getQueryString } from '../../utils/common'

import request from '../../utils/http'
import requestApp from '../../utils/http-app'

import { PageTitle } from '../../components';
import { wxPay } from '../../utils/bridge'

import './index.scss';

const RadioItem = Radio.RadioItem;

const payList = []

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
            couponIds: [],
            payList: [],
            shopCartOrders: [], // 商铺结算信息
        }

        this.addressInfo = window.localStorage.getItem('addressInfo') || undefined

        this.payType = getQueryString('payType');

        this.isWX = Number(this.payType) === 1;
    }

    componentDidMount() {
        this._loadOrderData()
        /**
         * payType
         * 
         * 1 微信支付
         * 
         * 2 舞盟币支付
         */
        this.setState({
            selectValue: this.isWX ? 'wxpay' : 'integral',
            payList: this.isWX ? [{ value: 'wxpay', label: '微信' }] : [{ value: 'integral', label: '积分' }]
        })
    }

    submitPay = () => {
        // 判断是否选择地址 如未选择请先选择
        if (!this.addressInfo) {
            Toast.info('请先选择地址');
            return;
        }
        // 根据订单id获取
        if (this.isWX) {
            this.wxPay()
        } else {
            this.ineroPay()
        }
    }

    wxPay = async () => {
        // 结算，生成订单信息
        Toast.loading('生成订单中..', 0);
        // const { shopCartOrders } = await this.loadOrderData();
        const { shopCartOrders } = this.state;
        Toast.hide();
        // 提交订单，返回支付流水号
        const { orderNumbers } = await this.submitOrderReturnNumber(shopCartOrders)
        // 根据订单号进行支付
        Toast.loading('支付中..', 0);
        // const response = await this.pay(orderNumbers);
        wxPay({
          orderSourceType: 1,
          orderId: orderNumbers
        }, function(data) {
          this.setState({
            data: JSON.stringify(data)
          });
          Toast.hide();
        })

        // 获取到的值
        // appId: "wxd3c4504fd36f4c93"
        // nonceStr: "1595688566141"
        // packageValue: "Sign=WXPay"
        // partnerId: "1594221891"
        // prepayId: "wx25224926043124a0907a37301805892900"
        // sign: "BFAC65A276CE5B41273EAB587694E89B"
        // timeStamp: "1595688566"
        // console.log(response)
    }

    ineroPay = async () => {
        // 结算，生成订单信息
        Toast.loading('生成订单中..', 0);
        // const { shopCartOrders } = await this.loadOrderData();
        const { shopCartOrders } = this.state;
        Toast.hide();
        // 提交订单，返回支付流水号
        const { orderNumbers } = await this.submitOrderReturnNumber(shopCartOrders)
        // 根据订单号进行支付
        Toast.loading('支付中..', 0);
        const response = await this.ineroPayFn(orderNumbers);
        Toast.hide();
        Toast.info('支付成功')

        const { history } = this.props;
        history.push('/success')
    }

    payChange = (value) => {
        this.setState({
            selectValue: value
        })
    }

    // 根据订单id返回支付组件所需信息
    getPayComponentDto = () => {
        const { prodId } = JSON.parse(localStorage.getItem("orderItem"));
        const params = {
            url: "/app/order/getPayComponentDto",
            method: "POST",
            data: {
                orderId: prodId,
            },
        };
        request(params)
            .then(res => {
            })
            .catch(error => {
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

    // 结算，生成订单信息
    loadOrderData = () => {
        const addressInfo = localStorage.getItem('addressInfo')
        const { addrId } = JSON.parse(addressInfo || '{}') || {}
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
        return request(params)
    }

    // 加载订单数据
    _loadOrderData = () => {
        const addressInfo = localStorage.getItem('addressInfo')
        const { addrId } = JSON.parse(addressInfo || '{}') || {}

        if(!addrId) {
          Toast.info('请选择收获地址');
          return;
        }
        const params = {
            url: "/p/order/confirm",
            method: "POST",
            data: {
                addrId: addrId || 0,
                orderItem: JSON.parse(localStorage.getItem("orderItem")),
                basketIds: this.state.orderEntry === "0" ? JSON.parse(localStorage.getItem("basketIds")) : undefined,
                couponIds: this.state.couponIds,
                userChangeCoupon: 1
            },
        };
        request(params)
            .then(res => {
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
                    shopCartOrders: res.shopCartOrders
                });
            })
    }

    /**
     * 提交订单，返回支付流水号
     * @date 2020-07-25
     * @returns {any}
     */
    submitOrderReturnNumber = (shopCartOrders) => {
        const _shopCartOrders = shopCartOrders.map(item => ({
            remarks: item.remarks || "",
            shopId: Number(item.shopId),
        }))
        const params = {
            url: "/p/order/submit",
            method: "POST",
            data: {
                orderShopParam: _shopCartOrders
            },
        };
        return request(params)
    }

    /**
     * 根据订单号进行支付
     * @date 2020-07-25
     * @returns {any}
     */
    pay = (orderNumbers) => {
        const params = {
            url: "/p/order/pay",
            method: "POST",
            data: {
                orderNumbers: orderNumbers,
                payType: 1
            },
        };
        return request(params)
    }

    ineroPayFn = (orderNumbers) => {
        const params = {
            url: "/app/order/payOrderMallByWuMengBi",
            method: "POST",
            data: {
                orderId: orderNumbers,
                payChanel: 0
            },
        };
        return requestApp(params)
    }

    render() {
        const formatAddressInfo = this.addressInfo && JSON.parse(this.addressInfo)

        const {
            selectValue, payCount, 
            orderItems, 
            total, payList,
        } = this.state;

        return (<div className="submit-orders-page">
            <PageTitle title="确认订单" />
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
                {
                    orderItems && Array.isArray(orderItems) && orderItems.length > 0
                        ? (
                            <div className="prod-item">
                                {
                                    orderItems.map((item, key) => {
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
                            </div>)
                        : null
                }
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
                                    : null
                            }
                            {
                                i.value === 'integral'
                                    ? (<div className="submit-orders-page-pay-area-aliPay">
                                        <svg t="1595245525558" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2119" width="200" height="200"><path d="M431.569901 389.052463c104.681923 0 213.559308-23.023883 278.947137-66.922754l0 79.918457 60.578395 0L771.095433 227.066653c0-105.193565-174.879185-161.98581-339.423204-161.98581S92.146697 121.873089 92.146697 227.066653l0 477.566503c0 105.193565 174.879185 161.98581 339.423204 161.98581L431.569901 806.1429c-172.832617 0-278.947137-59.145798-278.947137-101.509743L152.622764 561.066453c65.387829 43.796542 174.162886 66.922754 278.947137 66.922754l0-60.578395c-172.832617 0-278.947137-59.145798-278.947137-101.509743L152.622764 322.232038C218.010593 366.02858 326.887978 389.052463 431.569901 389.052463zM431.569901 125.55691c172.832617 0 278.947137 59.145798 278.947137 101.509743s-106.11452 101.509743-278.947137 101.509743-278.947137-59.145798-278.947137-101.509743S258.839612 125.55691 431.569901 125.55691zM702.944739 422.206855c-150.320376 0-228.908564 57.815529-228.908564 114.91476L474.036175 844.004397c0 57.099231 78.690517 114.91476 228.908564 114.91476 149.194764 0 227.680624-56.996902 228.908564-113.686819l0.102328 0L931.955631 537.121615C931.853303 480.022384 853.265114 422.206855 702.944739 422.206855zM702.944739 482.682922c111.12861 0 168.432497 38.168482 168.432497 54.438693 0 16.270211-57.303887 54.438693-168.432497 54.438693S534.512241 553.391826 534.512241 537.121615C534.512241 520.851404 591.816129 482.682922 702.944739 482.682922zM702.944739 898.44309c-111.12861 0-168.432497-38.168482-168.432497-54.438693l0-73.267113c38.373139 20.874988 94.756071 34.791646 168.432497 34.791646s129.95703-13.916658 168.432497-34.791646L871.377236 844.004397C871.377236 860.274608 814.073349 898.44309 702.944739 898.44309zM702.944739 744.950535c-111.12861 0-168.432497-38.168482-168.432497-54.438693l0-73.267113c38.373139 20.874988 94.756071 34.791646 168.432497 34.791646s129.95703-13.916658 168.432497-34.791646l0 73.267113C871.377236 706.782053 814.073349 744.950535 702.944739 744.950535z" p-id="2120" fill="#8a8a8a"></path></svg>
                                        舞盟币
                                    </div>)
                                    : null
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