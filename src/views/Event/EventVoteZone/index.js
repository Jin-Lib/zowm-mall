import React from 'react';
import { Carousel } from 'antd-mobile'
import { PageTitle, ContentTitle } from '../../../components'
import './index.scss'

const peopleList = [
    [
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
    ],
    [
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
    ],[
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
    ],[
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
        {
            name: '雅莉嗒莎',
            count: '3986',
        },
    ]   
]

function EventVoteZone() {
    return <div className="event-vote-zone">
        <PageTitle title="投票专区" />
        <div className="event-vote-zone-content">
            <div className="event-vote-zone-content-title">
                <img src={require('../../../assets/imgs/vote-zone-title.png')} alt=""/>
                <div>
                    <p>1票相当于6票</p>
                    <span>购买课程可享受超级投票权益</span>
                </div>
            </div>
            <div className="event-vote-zone-content-info">
                <img src="" alt=""/>
                <div>
                    <p>雅莉嗒莎</p>
                    <span>票数：3986</span>
                </div>
                <button>投票</button>
            </div>
            <div className="event-vote-zone-content-video"></div>
            <div className="event-vote-zone-content-people">
                <ContentTitle title="参赛选手" />
                <Carousel autoplay={false}>
                    {
                        peopleList.map((item, index) => {
                            console.log('item', item)
                            return (<ul key={index}>
                                {
                                    item.map((sub, subIndex) => {
                                        return (<li key={subIndex}>
                                            <img src={sub.url} alt=""/>
                                            <p>{sub.name}</p>
                                            <span style={{
                                                color: `${index==0 && (subIndex == 0 || subIndex == 1 || subIndex == 2 || subIndex == 3) ? '#FF7B00' : ''}`
                                            }}>
                                                {sub.count}
                                            </span>
                                        </li>)
                                    })
                                }
                            </ul>)
                        })
                    }
                </Carousel>
            </div>
        </div>
    </div>
}

export default EventVoteZone;