import React, { useEffect, useState } from 'react';
import { PageTitle, ContentTitle } from '../../../components'
import { EventDetails } from './components'
import { Toast } from 'antd-mobile';
import { httpApp as request } from '../../../utils'
import { getQueryString, serializeData } from '../../../utils/common'
import { navigate, shareTo } from '../../../utils/bridge'
import { share } from '../../../assets/imgs'
import './index.scss'

function EventDivision(props) {

    const { history } = props
    const { location } = history
    let { state = {} } = location || {}
    if(state && !state.id) {
      state.id = getQueryString('id')
    }

    // 视频列表
    const [ videoList, setVideoList ] = useState([])
    // 相册列表
    const [ photoList, setPhotoList ] = useState([])
    // 投票专区
    const [ voteList, setVoteList ] = useState([])
    // 赛事详情
    const [detail, setDetail] = useState('')

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
                    console.log('请求投票专区', res)
                    setVoteList(res)
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

    /**
     * 点击视频详情
     * @date 2020-06-27
     * @param {any} item
     * @returns {any}
     */
    const videoItemClick = (item) => {
      console.log(item, `/short-video-single-swiper?shortVideo=${encodeURIComponent(JSON.stringify(item))}`);
      navigate && navigate({
        url: `/short-video-single-swiper?shortVideo=${encodeURIComponent(JSON.stringify(item))}`
      });
    }

    /**
     * 点击进入专区
     * @date 2020-06-27
     * @param {object} item
     * @returns {any}
     */
    const voteItemClick = (item) => {
        return () => {
            history.push('/eventVoteZone', {
                eventUnionId: state.id,
                voteAreaUnionId: item.unionId,
                state: item.state
            })
        }
    }

    // 分享
    const shareBtn = () => {
      shareTo({
        webPage: window.location.href + '?id=' + state.id,
        thumbnail: detail && detail.eventName || '',
        description: detail && detail.eventAddress || '',
        messageExt: 'messageExt',
        mediaTagName: 'mediaTagName',
        thumbnail: detail && detail.eventPicUrl || ''
      }, () => {
        console.log('分享成功')
      });
    }

    return (<div className="event-division">
        <PageTitle title={'赛事详情'} rightCon={<div className="event-share" onClick={shareBtn} ><img src={share} /></div>}/>
        <div className="event-division-content">
            <div className="event-division-content-details">
                <EventDetails
                    id={state.id}
                    getDetail={(data) => {
                      setDetail(data)
                    }}
                    history={history} />
            </div>
            <div className="event-division-content-vote">
                <ContentTitle
                    title="投票专区"/>
                {
                  voteList && Array.isArray(voteList) && voteList.length === 0 && (
                    <div className="empty">暂无数据</div>
                  )
                }
                <ul>
                    {
                        voteList && Array.isArray(voteList) && voteList.length > 0 && voteList.map((item, index) => {
                            return <li key={index}>
                                <img src={item.voteAreaPic} alt=""/>
                                <div>
                                    <h6>{item.voteAreaName}</h6>
                                    <div style={{ fontSize: '12px', color: '#999', marginBottom: '12px' }}>
                                      { item.eventStartTime } - {item.eventEndTime}
                                    </div>
                                    {/* <span>{item.state}</span> */}
                                    <span>{item.state === 1 ? "投票已结束" : "投票进行中"}</span>
                                </div>
                                <button className="event-division-content-vote-into-button" onClick={voteItemClick(item)}>进入专区</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="event-division-content-video">
                <ContentTitle
                    title="赛事视频" />
                {
                  voteList && Array.isArray(voteList) && voteList.length === 0 && (
                    <div className="empty">暂无数据</div>
                  )
                }
                <div className="event-division-content-video-box">
                    <ul>
                        {
                            videoList && Array.isArray(videoList) && videoList.length > 0 && videoList.map((item, index) => {
                                return <li key={index} onClick={() => { videoItemClick(item)}}>
                                    <div className="edcvb"><img src={item.firstFrameUrl} alt=""/></div>
                                    {/* <video src={'https://www.w3school.com.cn/i/movie.ogg' || item.videoUrl}></video> */}
                                    <p>{item.videoName}</p>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div style={{ height: '10px', backgroundColor: '#f3f3f3' }}></div>

            <div className="event-division-content-photo">
                <ContentTitle
                    title="赛事相册"
                    // rightCon={<span className="event-division-content-video-title-right" onClick={() => {
                    //   navigate && navigate({
                    //     url: `/photo-dive-list?themeUnionId=${state.id}`,
                    //   });
                    // }}>更多</span>}
                />
                {
                  voteList && Array.isArray(voteList) && voteList.length === 0 && (
                    <div className="empty">暂无数据</div>
                  )
                }
                <div className="event-division-content-photo-box">
                    <ul>
                        {
                            photoList && Array.isArray(photoList) && photoList.length > 0 && photoList.map((item, key) => {
                                return <li key={key} onClick={() => {
                                  navigate && navigate({
                                    url: `/gallery?themeUnionId=${item.unionId}`,
                                  });
                                }}>
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