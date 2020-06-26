import React, { useState, useEffect } from 'react';
import { PageTitle } from '../../../components';
import { Tabs, Toast } from 'antd-mobile';
import { httpApp as request } from '../../../utils'
import './index.scss';

const titleTabs = [
    { title: '全部', key: 't1' },
    { title: '进行中', key: 't2' },
    { title: '即将开始', key: 't3' },
    { title: '已结束', key: 't4' },
];

const eventTypes = [
    {
        label: '国内赛事',
        value: '1',
    },
    {
        label: '国外赛事',
        value: '1',
    },
    {
        label: '训练营',
        value: '1',
    },
    {
        label: '舞蹈节',
        value: '1',
    },
    {
        label: '教师培训班',
        value: '1',
    },
]

const eventList = [
    {
        img: '',
        linkTo: '',
        id: '',
    },
    {
        img: '',
        linkTo: '',
        id: '',
    },
    {
        img: '',
        linkTo: '',
        id: '',
    },
    {
        img: '',
        linkTo: '',
        id: '',
    },
    {
        img: '',
        linkTo: '',
        id: '',
    },
    {
        img: '',
        linkTo: '',
        id: '',
    },
]

// Toast.loading('请求中', 0);
    
function EventList() {
    // 当前 tab value
    const [ currentTabValue, setTabValue ] = useState('t1');

    useEffect(() => {
        async function getEventList() {
            const params = {
                url: '/app/event/getEvents',
                method: "POST",
                data: {
                    "categoryUnionId": "",
                    "code": 0
                }
            }
            return new Promise(() => {
                request(params)
                    .then((res) => {
                        Toast.hide();
                    })
                    .catch((error) => {
                        const { data } = error;
                        const { error: errMsg } = data || {};
                        Toast.info(errMsg)
                    })
            })
        }
        getEventList()
    }, [])

    /**
     * title tab chagne
     * @date 2020-06-17
     * @returns {any}
     */
    const titleTabsChagne = (tab, index) => {
        console.log('tab, index', tab, index)
    }

    return (<div className="event-event-list">
        <PageTitle title="赛事" />
        <div className="event-event-list-content">
            <Tabs
                tabs={titleTabs}
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
                                    return <li key={key}>{item.label}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="event-event-list-content-right">
                        <ul>
                            {
                                eventList.map((item, key) => {
                                    return (<li key={key}>
                                        <img src={item.img} alt=""/>
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