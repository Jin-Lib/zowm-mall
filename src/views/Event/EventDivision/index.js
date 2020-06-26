import React from 'react';
import { PageTitle, ContentTitle } from '../../../components'
import { EventDetails } from './components'
import './index.scss'

const detailTitle = '赛事标题君，在这里显示2020届舞蹈赛事投票'
const detailContent = '从4月到现在，整整半年时间，银川高级中学舞蹈队从第五届“荷花少年”全国舞蹈展演一路走来，终于登上了中国舞蹈届的最高舞台——“荷'
const detailImgOrVideo = ''
const detailType = 'img'

const voteList = [
    {
        img: '',
        title: '2020赛事“荷花奖”100进50',
        state: '投票进行中',
    },
    {
        img: '',
        title: '2020赛事“荷花奖”100进50',
        state: '投票进行中',
    },
    {
        img: '',
        title: '2020赛事“荷花奖”100进50',
        state: '投票进行中',
    },
]

const videoList = [
    {
        text: 'Troles,ina伦巴踩点2 020喜盈门亚洲巡赛Troles,ina伦巴踩点2 020喜盈门亚洲巡赛',
        url: '',
    },
    {
        text: 'Troles,ina伦巴踩点2 020喜盈门亚洲巡赛Troles,ina伦巴踩点2 020喜盈门亚洲巡赛',
        url: '',
    },
    {
        text: 'Troles,ina伦巴踩点2 020喜盈门亚洲巡赛Troles,ina伦巴踩点2 020喜盈门亚洲巡赛',
        url: '',
    },
    {
        text: 'Troles,ina伦巴踩点2 020喜盈门亚洲巡赛Troles,ina伦巴踩点2 020喜盈门亚洲巡赛',
        url: '',
    },
]

const photoList = ['', '', '', '',]

function EventDivision() {
    return (<div className="event-division">
        <PageTitle
            rightCon={(<span className="event-division-title-right">投票规则</span>)}/>
        <div className="event-division-content">
            <div className="event-division-content-details">
                <EventDetails
                    title={detailTitle}
                    content={detailContent}
                    url={detailImgOrVideo}
                    type={detailType}
                />
            </div>
            <div className="event-division-content-vote">
                <ContentTitle
                    title="投票专区"/>
                <ul>
                    {
                        voteList.map((item, index) => {
                            return <li key={index}>
                                <img src={item.img} alt=""/>
                                <div>
                                    <h6>{item.title}</h6>
                                    <span>{item.state}</span>
                                </div>
                                <button>进入专区</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="event-division-content-video">
                <ContentTitle
                    title="赛事视频"
                    rightCon={<span className="event-division-content-video-title-right">更多</span>}/>
                <div className="event-division-content-video-box">
                    <ul>
                        {
                            videoList.map((item, index) => {
                                return <li key={index}>
                                    <img src={item.url} alt=""/>
                                    <p>{item.text}</p>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="event-division-content-photo">
                <ContentTitle
                    title="赛事相册"
                    rightCon={<span className="event-division-content-video-title-right">更多</span>}/>
                <div className="event-division-content-photo-box">
                    <ul>
                        {
                            photoList.map((item, key) => {
                                return <li key={key}>
                                    <img src={item} alt=""/>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    </div>)
}

export default EventDivision