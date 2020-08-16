import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../../components'
import { Toast, Modal } from 'antd-mobile';
import { httpApp as request } from '../../../utils'
import QRCode from '../../../utils/qrcode'
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

    // 签到记录
    const [signRecord, setSignRecord] = useState([]);

    // 舞盟币数量
    const [count, setCount] = useState(0);

    // 获取二维码
    const [qrCode, setQRCode] = useState('');
    const [showQR ,setShowQR] = useState(false);

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

    // 获取账户详情
    const getAccountList = () => {
      let params = {
        url: '/app/finance/getUserWmAccountInfo',
        method: 'GET'
      };
      request(params)
        .then(response => {
          setSignRecord(response && response.accountInOutDtos || []);
        })
        .catch(error => {
          setIsSignButton([])
        })
    }

    // 获取邀请获取到的舞盟币个数
    const getAccountNum = () => {
      let params = {
        url: '/app/common/getSysConfigParam',
        method: 'GET',
        data: {
          key: 'ZOWM_INVITE_USER_WU_MENG_BI'
        }
      };
      request(params)
        .then(response => {
          setCount(response || 0);
        })
        .catch(error => {
        })
    }

    // 获取二维码信息
    const getQRCode = () => {
      let params = {
        url: '/app/userCenter/getAppUserDto',
        method: 'GET'
      };
      request(params)
        .then(response => {
          var options = {
            text: response && response.userErCodeUrl || '',
            width: 200,
            height: 200,
            codeWidth: 200,
            codeHeight: 200,
            top: 0,
            left: 0,
            /**
             * materials unit options
             */
            // materials: {
            //     border: "./materials/electron/border.png",
            //     eye: "./materials/electron/eye.png",
            //     row4: "./materials/electron/row4.png",
            //     col4: "./materials/electron/col3.png",
            //     row2col3: "./materials/electron/row2col3.png",
            //     row3col2: "./materials/electron/row3col2.png",
            //     col3: ["./materials/electron/col3.png", "./materials/electron/col3_2.png"],
            //     row2col2: "./materials/electron/row2col2.png",
            //     corner: "./materials/electron/corner.png",
            //     row2: ["./materials/electron/row2.png", "./materials/electron/row2_2.png"],
            //     col2: "./materials/electron/col2.png",
            //     single: ["./materials/electron/single.png", "./materials/electron/single_2.png"],
            // }
          }
        /**
          * when the artqrcode loaded, run this function
          */
          function callBack(status) {
              console.log(status) // [loaded|success]
          }
          var code = new QRCode(document.getElementById("qrcode"), options, callBack);
          // setQRCode(response && response.userErCodeUrl || '')
        })
        .catch(error => {
        })
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
                console.log('response', response)
                Toast.info(response)
                setSignOrNot(state => {
                  return !state
                })
            })
            .catch(error => {
                // console.log('response', error)
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
                const { havaSignInDaySum, continuitySignInDaySum, signInDayDtoList, signOrNot} = result
                setSignInDayDtoList(signInDayDtoList)
                setIsSignButton(!signOrNot)
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
        getAccountList()
        getAccountNum()
    }, [signOrNot])

    const signButton = () => {
        commitWuMengBiSignIn()
    }

    const signButtonClassNames = classnames(
      "my-sign-page-sign-button",
      {
        disabled: !isSignButton
      }
    )

    return (<div className="my-sign-page">
        <PageTitle title="每日签到" />
        <div className="my-sign-page-content">
            <div className="my-sign-page-sign-bg">
                <p className="my-sign-page-sign-title">累计签到</p>
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
                {isSignButton ? "立即签到" : "已签到"}
            </button>
            <h6 className="my-sign-page-action-list-title">任务列表</h6>
            <div className="my-sign-page-invitation">
                    <div className="my-sign-page-invitation-left">
                        <img src={require('../../../assets/imgs/inver-icon.png')} alt=""/>
                        <div>
                            <h6>每邀请1位新成员</h6>
                            <span>+{count}盟友币</span>
                        </div>
                    </div>
                    <button className="my-sign-page-invitation-right" onClick={() => {
                      setShowQR(true)
                      getQRCode()
                    }}>立即邀请</button>
            </div>

            <h6 className="my-sign-page-action-list-title">舞盟币明细列表</h6>
            {
              (signRecord || []).map((item, index) => (
                <div className="my-sign-page-invitation" key={index}>
                  <div className="my-sign-page-invitation-left">
                      <img src={item.sourceUserHeadPic} alt=""/>
                      <div>
                          <h6>{item.sourceTypeName}</h6>
                          <span style={{ color: '#999' }}>{item.inOutDate}</span>
                      </div>
                  </div>
                  <span style={{ color: 'red' }}>{item.inOutType == 1 ? '+' : '-'}{item.amount}</span>
                </div>
              ))
            }

            <Modal
              closable
              transparent
              title="邀请好友"
              animationType="slide"
              onClose={() => {
                setShowQR(false)
              }}
              visible={showQR}>
              <div id="qrcode" style={{ display: 'flex', justifyContent: 'center', height: 200 }}></div>
              {/* <img className="wechatCode" src={qrCode} alt="" /> */}
            </Modal>
            
        </div>
    </div>)
}

export default MySign