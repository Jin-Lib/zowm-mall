import React, { useState, useEffect } from 'react';
import { PageTitle, ListView } from  '../../../components'
import { Tabs, Toast } from 'antd-mobile';
import { GoodsInfo } from './components'
import { httpApp as request } from '../../../utils'

import './index.scss';

const titleTabs = [
    { title: '全部', key: 0 },
    { title: '待支付', key: 1 },
    { title: '待发货', key: 2 },
    { title: '待收货', key: 3 },
    { title: '退款售后', key: 5 },
];

export default function MyOrder({ history }) {

    // 当前 tab value
    const [ currentTabValue, setTabValue ] = useState('0');

    // 课程列表数据
    const [ orderList, setOrderList ] = useState([]);

    /**
     * 获取课程列表
     * @date 2020-06-28
     * @param {any} data
     * @returns {any}
     */
    const getCourseOrderPage = (data) => {
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/order/getMyOrderList',
            method: "GET",
            data: data,
        }
        return new Promise(() => {
            request(params)
                .then((res) => {
                    setOrderList(res)
                    Toast.hide();
                })
                .catch((error) => {
                    const { data } = error;
                    const { error: errMsg } = data || {};
                    Toast.info(errMsg || "未获取到订单")
                })
        })
    }

    useEffect(() => {
        getCourseOrderPage(currentTabValue != 0 ? {
            orderStatus: currentTabValue,
        } : null)
    }, [currentTabValue])

    /**
     * title tab chagne
     * @date 2020-06-17
     * @returns {any}
     */
    const titleTabsChagne = (tab) => {
        const { key } = tab;
        setTabValue(key)
    }

    const onEndReached = () => {}

    return (<div className="my-order">
        <PageTitle title="我的订单" />
        <div className="my-order-tab-content">
            <Tabs
                tabs={titleTabs}
                initialPage={currentTabValue}
                tabBarUnderlineStyle={{ width: '15px', height: '2px', background: 'red!important' }}
                tabBarActiveTextColor="#222222"
                tabBarInactiveTextColor="#787878"
                tabBarTextStyle={{ fontSize: '15px', }}
                onChange={titleTabsChagne}
            >
                <div className="my-order-tab-content-box">
                    {
                        orderList && Array.isArray(orderList) && orderList.length > 0
                            ? (<ListView
                                onEndReached={onEndReached}>
                                <>
                                    {
                                        orderList.map((item, index) => {
                                            return <GoodsInfo key={index} {...item} history={history} />
                                        })
                                    }
                                </>
                            </ListView>)
                            : <img className="no-order-bg" src={require('../../../assets/imgs/no-order.png')} alt=""/>
                    }
                </div>
            </Tabs>
            </div>
    </div>)
}