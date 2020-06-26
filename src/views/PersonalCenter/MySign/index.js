import React from 'react';
import { PageTitle } from '../../../components'
import './index.scss';

const signStatus = [
    {
        day: 1,
        status: 'done',
    },
    {
        day: 2,
        status: 'done',
    },
    {
        day: 3,
        status: 'finished',
    },
    {
        day: 4,
        status: 'unfinished',
    },
    {
        day: 5,
        status: 'unfinished',
    },
    {
        day: 6,
        status: 'unfinished',
    },
    {
        day: 7,
        status: 'unfinished',
    }
]

function MySign() {
    return (<div className="my-sign-page">
        <PageTitle title="每日签到" />
        <div className="my-sign-page-content">
            <div className="my-sign-page-sign-bg">
                <p className="my-sign-page-sign-title">已连续签到</p>
                <div className="my-sign-page-sign-data-show">
                    <span className="data-bg-item">0</span>
                    <span className="data-bg-item">0</span>
                    <span className="data-bg-item">3</span>
                    <span>天</span>
                </div>
            </div>
            <div className="my-sign-page-sign-dashboard">
                <ul>
                    {
                        signStatus && Array.isArray(signStatus) && signStatus.length > 0
                            ? (<>
                                {
                                    signStatus.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                {
                                                    item.status === 'done'
                                                        ? (
                                                            <span className="my-sign-page-sign-dashboard-done my-sign-page-sign-dashboard-icon">
                                                                <img src={require("../../../assets/imgs/ok-icon.png")} alt=""/>
                                                            </span>
                                                        )
                                                        : null
                                                }
                                                {
                                                    item.status === 'unfinished'
                                                        ? (
                                                            <span className="my-sign-page-sign-dashboard-unfinished my-sign-page-sign-dashboard-icon">
                                                                +100
                                                            </span>
                                                        )
                                                        : null
                                                }
                                                {
                                                    item.status === 'finished'
                                                        ? (
                                                            <span className="my-sign-page-sign-dashboard-finished my-sign-page-sign-dashboard-icon">
                                                                +100
                                                            </span>
                                                        )
                                                        : null
                                                }
                                                <span className="my-sign-page-sign-dashboard-label">第{item.day}天</span>
                                            </li>
                                        )
                                    })
                                }
                            </>)
                            : null
                    }
                </ul>
            </div>
            <button className="my-sign-page-sign-button">立即签到</button>
            <h6 className="my-sign-page-action-list-title">任务列表</h6>
            <div className="my-sign-page-invitation">
                    <div className="my-sign-page-invitation-left">
                        <img src={require('../../../assets/imgs/inver-icon.png')} alt=""/>
                        <div>
                            <h6>每邀请1位新成员</h6>
                            <span>+1000盟友币</span>
                        </div>
                    </div>
                    <button className="my-sign-page-invitation-right">立即邀请</button>
            </div>
        </div>
    </div>)
}

export default MySign