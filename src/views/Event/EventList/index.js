import React, { useState, useEffect } from 'react';
import { PageTitle } from '../../../components';
import { Tabs, Toast } from 'antd-mobile';
import { httpApp as request } from '../../../utils'
import './index.scss';
    
function EventList(props) {
    // 当前 tab value
    const [ currentTabValue, setTabValue ] = useState('0');

    // 赛事类别
    const [ eventTypes, setEventTypes ] = useState([]);

    // 赛事
    const [ eventList, setEventList ] = useState([]);

    // 赛事状态
    const [ eventStatus, setEventStatus ] = useState([]);

    // 当前选中的赛事类别
    const [ unionId, setUnionId ] = useState(null);

    /**
     * 获取赛事状态
     * @date 2020-06-27
     * @param {any} (
     * @returns {any}
     */
    useEffect(() => {
        Toast.loading('请求中', 0);
        async function getEventStatus() {
            const params = {
                url: '/app/event/getEventState',
                method: "GET",
            }
            return new Promise(() => {
                request(params)
                    .then((res) => {
                        const result = res.map(item => {
                            return {
                                title: item.value,
                                key: item.code,
                            }
                        })
                        const initialTitle = [
                            {
                                title: '全部',
                                key: 0,
                            }
                        ]
                        setEventStatus(initialTitle.concat(result))
                        Toast.hide();
                    })
                    .catch((error) => {
                        const { data } = error;
                        const { error: errMsg } = data || {};
                        Toast.info(errMsg || "当前网络异常, 请稍后重试!")
                    })
            })
        }
        getEventStatus()
    }, [])

    /**
     * 请求赛事类别
     * @date 2020-06-26
     * @param {any} (
     * @returns {any}
     */
    useEffect(() => {
        Toast.loading('请求中', 0);
        async function getEventType() {
            const params = {
                url: '/app/event/getEventCategory',
                method: "GET",
            }
            return new Promise(() => {
                request(params)
                    .then((res) => {
                        setEventTypes(res)
                        Toast.hide();
                    })
                    .catch((error) => {
                        const { data } = error;
                        const { error: errMsg } = data || {};
                        Toast.info(errMsg || "当前网络异常, 请稍后重试!")
                    })
            })
        }
        getEventType()
    }, [])

    const getEventList = (data) => {
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/event/getEvents',
            method: "GET",
            data: data,
        }
        return new Promise(() => {
            request(params)
                .then((res) => {
                    setEventList(res);
                    Toast.hide();
                })
                .catch((error) => {
                    const { data } = error;
                    const { error: errMsg } = data || {};
                    Toast.info(errMsg || "当前网络异常, 请稍后重试!")
                })
        })
    }

    /**
     * 请求赛事列表
     * @date 2020-06-26
     * @param {any} (
     * @returns {any}
     */
    useEffect(() => {
        getEventList({
            code: currentTabValue,
            categoryUnionId: unionId,
        })
    }, [currentTabValue, unionId])

    /**
     * title tab chagne
     * @date 2020-06-17
     * @returns {any}
     */
    const titleTabsChagne = (tab, index) => {
        setTabValue(tab.key)
    }

    /**
     * 列表详情点击
     * @date 2020-06-26
     * @returns {any}
     */
    const eventListItemClick = (item) => {
        return () => {
            const { history } = props;
            history.push('/eventDivision', { id: item.unionId })
        }
    } 

    /**
     * 赛事类别点击
     * @date 2020-06-27
     * @returns {any}
     */
    const eventTypeItemClick = (item) => {
        return () => {
            setUnionId(item.unionId)
        }
    }

    return (<div className="event-event-list">
        <PageTitle title="赛事" />
        <div className="event-event-list-content">
            <Tabs
                tabs={eventStatus}
                initialPage={currentTabValue}
                tabBarUnderlineStyle={{ width: '15px', height: '2px', background: 'red!important' }}
                tabBarActiveTextColor="#222222"
                tabBarInactiveTextColor="#787878"
                tabBarTextStyle={{ fontSize: '15px', }}
                onChange={titleTabsChagne}
            >
                <div className="event-event-list-content-box">
                    <div className="event-event-list-content-left">
                        <ul>
                            {
                                eventTypes.map((item, key) => {
                                    return (
                                        <li key={key} onClick={eventTypeItemClick(item)}>
                                            {item.catagoryName}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="event-event-list-content-right">
                        <ul>
                            {
                                eventList.map((item, key) => {
                                    return (<li key={key} onClick={eventListItemClick(item)}>
                                        <img src={item.eventPicUrl} alt=""/>
                                    </li>)
                                }) 
                            }
                        </ul>
                    </div>
                </div>
            </Tabs>
        </div>
    </div>)
}

export default EventList