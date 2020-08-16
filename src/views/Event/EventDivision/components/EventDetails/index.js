import React, { useState, useEffect } from 'react';
import { PageTitle } from '../../../../../components'
import { Toast } from 'antd-mobile';
import { httpApp as request } from '../../../../../utils'
import classnames from 'classnames';
import './index.scss';

function EventDetails(params) {
    let { id, showMore, location, getDetail } = params;

    if (!id && location && location.state && location.state.showMore) {
        id = location.state.id;
        showMore = location.state.showMore;
    }

    const initialEventDetailInfo = {
        eventName: '',
        eventProfile: '',
        eventPicUrl: '',
        eventVideocUrl: '',
    }

    // 赛事详情
    const [ eventDetailInfo, setEventDetailInfo ] = useState(initialEventDetailInfo);

     /**
     * 请求赛事详情
     * @date 2020-06-27
     * @param {any} data
     * @returns {any}
     */
    const getEventDetail = (id) => {
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/event/getEventDetail',
            method: "GET",
            data: {
                eventUnionId: id,
            }
        }
        return new Promise(() => {
            request(params)
                .then((res) => {
                    setEventDetailInfo(res)
                    getDetail && getDetail(res);
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
        const { history } = params;
        const { location } = history;
        const { state } = location;
        console.log(state)
        getEventDetail(id)
    }, [id])

    const linkToDetail = () => {
        const { history } = params;
        history.push('/eventDetail', {
            id: id,
            showMore: true
        })
    }

    const wrapperClassNames = classnames('event-details', {
        'event-details-page': showMore
    })

    return (<div className={wrapperClassNames}>
        {
            showMore ? <PageTitle title={eventDetailInfo && eventDetailInfo.eventName} /> : null
        }
        {/* <h6 className="event-details-title">{eventDetailInfo.eventName}</h6> */}
        <div style={{}}>
          <div style={{ fontFamily: 'PingFangSC-Regular', fontSize: '14px', color: "#aaa" }}>日期：<span style={{ color: '#222' }}>{eventDetailInfo.eventStartTime} - {eventDetailInfo.eventEndTime}</span></div>
          <div style={{ fontFamily: 'PingFangSC-Regular', fontSize: '14px', color: "#aaa", marginTop: '8px' }}>地点：<span style={{ color: '#222' }}>{eventDetailInfo.eventAddress}</span></div>
        </div>
        <div className="event-details-propaganda">
            {
                eventDetailInfo.eventPicUrl ? (<img src={eventDetailInfo.eventPicUrl} />) : null
            }
            {
                eventDetailInfo.eventVideocUrl ? <video controls="controls" src={eventDetailInfo.eventVideocUrl}></video> : null
            }
        </div>
        {
            !showMore
                ? (<p className="event-details-more-show" onClick={linkToDetail}>
                    <button
                      className="event-details-more-show-btn"
                    >
                      查看详情
                  </button>
                </p>)
                : <p className="event-details-content" dangerouslySetInnerHTML={{ __html: eventDetailInfo.eventProfile }} />
        }
    </div>)
}

export default EventDetails;