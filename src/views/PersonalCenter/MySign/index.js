import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../../components'
import { Toast } from 'antd-mobile';
import { httpApp as request } from '../../../utils'
import classnames from 'classnames';
import './index.scss';


function MySign() {
    
    // 连续签到的天数
    const [day, setDay] = useState([0, 0, 0]);

    // 当前签到到哪一天了
    const [currentSignDay, setCurrentSignDay] = useState(-1);

    // 签到列表
    const [signInDayDtoList, setSignInDayDtoList] = useState([]);

    // 点击签到标示符
    const [signOrNot, setSignOrNot] = useState(false);

    // 是否可以点击签到
    const [isSignButton, setIsSignButton] = useState(true);

    /**
     * 获取用户签到详情DTO
     * @date 2020-06-30
     * @returns {any}
     */
    const getSignInAccountDto = () => {
        const params = {
            url: '/app/finance/getSignInAccountDto',
            method: "GET",
        }
        return request(params)
    }

    /**
     * 点击签到
     * @date 2020-07-04
     * @returns {any}
     */
    const commitWuMengBiSignIn = () => {
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/finance/commitWuMengBiSignIn',
            method: "POST",
        }
        request(params)
            .then(response => {
                Toast.info(response)
                setIsSignButton(true)
            })
            .catch(error => {
                Toast.info("签到失败!")
                setIsSignButton(true)
            })
    }

    useEffect(() => {
        async function _getSignInAccountDto() {
            Toast.loading('请求中', 0);
            const result = await getSignInAccountDto()
            if (result) {
                Toast.hide()
                const { havaSignInDaySum, continuitySignInDaySum, signInDayDtoList } = result
                setSignInDayDtoList(signInDayDtoList)
                let day = havaSignInDaySum.toString().split()
                if (day.length < 3) {
                    day.length = 3
                    day = day.reverse();
                    day = day.fill(0, 0, 3-day.length-1)
                }
                setDay(day)
            } else {
                Toast.info("当前网络异常, 请稍后重试!")
            }
        }
        _getSignInAccountDto()
    }, [signOrNot])

    const signButton = () => {
        commitWuMengBiSignIn()
        setSignOrNot(state => {
            return !state
        })
        setIsSignButton(false)
    }

    const signButtonClassNames = classnames("my-sign-page-sign-button")

    return (<div className="my-sign-page">
        <PageTitle title="每日签到" />
        <div className="my-sign-page-content">
            <div className="my-sign-page-sign-bg">
                <p className="my-sign-page-sign-title">已连续签到</p>
                <div className="my-sign-page-sign-data-show">
                    {
                        day && Array.isArray(day) && day.map((d, i) => <span className="data-bg-item" key={i}>{d}</span>)
                    }
                    {/* <span className="data-bg-item">0</span>
                    <span className="data-bg-item">0</span>
                    <span className="data-bg-item">3</span> */}
                    <span>天</span>
                </div>
            </div>
            <div className="my-sign-page-sign-dashboard">
                <ul>
                    {
                        signInDayDtoList && Array.isArray(signInDayDtoList) && signInDayDtoList.length > 0
                            ? (<>
                                {
                                    signInDayDtoList.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                {
                                                    item.signOrNot
                                                        ? (
                                                            <span className="my-sign-page-sign-dashboard-done my-sign-page-sign-dashboard-icon">
                                                                <img src={require("../../../assets/imgs/ok-icon.png")} alt=""/>
                                                            </span>
                                                        )
                                                        : null
                                                }
                                                {/* {
                                                    !item.signOrNot
                                                        ? (
                                                            <span className="my-sign-page-sign-dashboard-unfinished my-sign-page-sign-dashboard-icon">
                                                                {item.wuMengBi}
                                                            </span>
                                                        )
                                                        : null
                                                } */}
                                                {
                                                    !item.signOrNot
                                                        ? (
                                                            <span className="my-sign-page-sign-dashboard-finished my-sign-page-sign-dashboard-icon">
                                                                {item.wuMengBi}
                                                            </span>
                                                        )
                                                        : null
                                                }
                                                <span className="my-sign-page-sign-dashboard-label">{item.docDay}</span>
                                            </li>
                                        )
                                    })
                                }
                            </>)
                            : null
                    }
                </ul>
            </div>
            <button
                disabled={!isSignButton}
                className={signButtonClassNames}
                onClick={signButton}>
                立即签到
            </button>
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