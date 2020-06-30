import React, { useState, useEffect } from 'react';
import { PageTitle, ListView } from  '../../../components'
import { Tabs, Toast } from 'antd-mobile';
import { GoodsInfo } from './components'
import { httpApp as request } from '../../../utils'

import './index.scss';

const titleTabs = [
    { title: '全部', key: 't1' },
    { title: '待支付', key: 't2' },
    { title: '待发货', key: 't3' },
    { title: '待收货', key: 't4' },
    { title: '退款售后', key: 't5' },
];

/**
 * status
 * 
 * pay 待支付
 * done 已完成
 * cacel 取消
 *  */

const payData = [
    {
        title: "华尔兹系列课程",
        price: '¥999.00',
        serises: '华尔兹课程（01）',
        count: '1',
        shopName: '中欧舞盟官方',
        shopImg: '',
        status: 'done'
    },
    {
        title: "华尔兹系列课程",
        price: '¥999.00',
        serises: '华尔兹课程（01）',
        count: '1',
        shopName: '中欧舞盟官方',
        shopImg: '',
        status: 'pay'
    },
    {
        title: "华尔兹系列课程",
        price: '¥999.00',
        serises: '华尔兹课程（01）',
        count: '1',
        shopName: '中欧舞盟官方',
        shopImg: '',
        status: 'cancel'
    }
]

export default function MyOrder() {

    // 当前 tab value
    const [ currentTabValue, setTabValue ] = useState('t1');

    // 课程列表数据
    const [ currentData, setCurrentData ] = useState(payData);

    // 课程 分页
    const [ pageNum, setPageNum ] = useState(0);
    const [ pageSize, setPageSize ] = useState(5);

    /**
     * 获取课程列表
     * @date 2020-06-28
     * @param {any} data
     * @returns {any}
     */
    const getCourseOrderPage = (data) => {
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/course/getCourseOrderPage',
            method: "GET",
            data: data,
        }
        return new Promise(() => {
            request(params)
                .then((res) => {
                    const { pageResult } = res;
                    setCurrentData(pageResult)
                    Toast.hide();
                })
                .catch((error) => {
                    const { data } = error;
                    const { error: errMsg } = data || {};
                    Toast.info(errMsg || "当前网络异常, 请稍后重试!")
                })
        })
    }

    useEffect(() => {
        getCourseOrderPage({
            pageNum,
            pageSize,
        })
    }, [pageNum, pageSize])

    /**
     * title tab chagne
     * @date 2020-06-17
     * @returns {any}
     */
    const titleTabsChagne = (tab, index) => {
        console.log('tab, index', tab, index)
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
                    <ListView
                        onEndReached={onEndReached}>
                        {
                            currentData && Array.isArray(currentData) && currentData.length > 0
                                ? (<>
                                    {
                                        currentData.map((item, index) => {
                                            return <GoodsInfo key={index} {...item} />
                                        })
                                    }
                                </>)
                                : null
                        }
                    </ListView>
                </div>
            </Tabs>
            </div>
    </div>)
}