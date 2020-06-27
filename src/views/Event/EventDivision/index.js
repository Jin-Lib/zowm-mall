import React, { useEffect, useState } from 'react';
import { PageTitle, ContentTitle } from '../../../components'
import { EventDetails } from './components'
import { Toast } from 'antd-mobile';
import { httpApp as request } from '../../../utils'
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

const photoList = ['', '', '', '',]

function EventDivision(props) {

    const { history } = props
    const { location } = history
    const { state } = location

    // 视频列表
    const [ videoList, setVideoList ] = useState([])
    // 相册列表
    const [ photoList, setPhotoList ] = useState([])

    /**
     * 请求赛事视频
     * @date 2020-06-27
     * @param {any} data
     * @returns {any}
     */
    const getEventVideo = (id) => {
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/event/getEventVideos',
            method: "GET",
            data: {
                eventUnionId: id,
            },
        }
        return new Promise(() => {
            request(params)
                .then((res) => {
                    console.log('请求赛事视频', res)
                    setVideoList(res)
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
     * 请求赛事相册
     * @date 2020-06-27
     * @param {any} data
     * @returns {any}
     */
    const getEventAlbums = (id) => {
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/event/getEventAlbums',
            method: "GET",
            data: {
                eventUnionId: id,
            },
        }
        return new Promise(() => {
            request(params)
                .then((res) => {
                    console.log('请求赛事相册', res)
                    setPhotoList(res)
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
     * 请求投票专区
     * @date 2020-06-27
     * @param {any} data
     * @returns {any}
     */
    const getEventVote = (id) => {
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/event/getVoteAreas',
            method: "GET",
            data: {
                eventUnionId: id,
            },
        }
        return new Promise(() => {
            request(params)
                .then((res) => {
                    console.log('请求赛事视频', res)
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
        getEventVideo(state.id)
        getEventVote(state.id)
        getEventAlbums(state.id)
    }, [])

    const videoItemClick = (item) => {
        return () => {
            console.log(item)
        }
    }

    return (<div className="event-division">
        <PageTitle />
        <div className="event-division-content">
            <div className="event-division-content-details">
                <EventDetails
                    id={state.id}
                    history={history} />
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
                                return <li key={index} onClick={videoItemClick(item)}>
                                    {/* <img src={item.firstFrameUrl} alt=""/> */}
                                    <video src={'https://www.w3school.com.cn/i/movie.ogg' || item.videoUrl}></video>
                                    <p>{item.videoName}</p>
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
                                    <img src={item.albumUrl} alt=""/>
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