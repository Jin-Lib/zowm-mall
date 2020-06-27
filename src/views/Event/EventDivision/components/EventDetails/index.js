import React, { useState, useEffect } from 'react';
import { PageTitle } from '../../../../../components'
import { Toast } from 'antd-mobile';
import { httpApp as request } from '../../../../../utils'
import classnames from 'classnames';
import './index.scss';

function EventDetails(params) {
    let { id, showMore, location } = params;

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
            showMore ? <PageTitle /> : null
        }
        <h6 className="event-details-title">{eventDetailInfo.eventName}</h6>
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
                    查看更多
                    <svg t="1593242737458" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3611"><path d="M500.408996 544.70045c3.684558 3.684558 8.674063 5.757121 13.893853 5.757121 5.21979 0 10.209295-2.072564 13.893853-5.757121L717.567616 355.406297c7.676162-7.676162 7.676162-20.111544 0-27.787706-7.676162-7.676162-20.111544-7.676162-27.787706 0L514.302849 503.018891 333.682759 322.398801c-7.676162-7.676162-20.111544-7.676162-27.787707 0-7.676162 7.676162-7.676162 20.111544 0 27.787706l194.513944 194.513943z m189.370914-59.874063L514.302849 660.303448 333.682759 479.606597c-7.676162-7.676162-20.111544-7.676162-27.787707 0-7.676162 7.676162-7.676162 20.111544 0 27.787706l194.513944 194.513943c3.684558 3.684558 8.674063 5.757121 13.893853 5.757121 5.21979 0 10.209295-2.072564 13.893853-5.757121l189.370914-189.370915c4.989505-4.989505 6.908546-12.205097 5.066267-18.96012-1.842279-6.755022-7.138831-12.051574-13.893853-13.893853-6.755022-1.765517-13.970615 0.153523-18.96012 5.143029z m0 0" p-id="3612"></path></svg>
                </p>)
                : <p className="event-details-content" dangerouslySetInnerHTML={{ __html: eventDetailInfo.eventProfile }} />
        }
    </div>)
}

export default EventDetails;