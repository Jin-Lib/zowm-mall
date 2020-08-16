import React, { useEffect, useState } from 'react';
import { Carousel, Toast } from 'antd-mobile'
import { PageTitle, ContentTitle } from '../../../components'
import { httpApp as request } from '../../../utils'
import classnames from 'classnames'
import { isEmpty } from 'loadsh'
import { getQueryString } from '../../../utils/common'
import { play } from '../../../assets/imgs'
import './index.scss'

function EventVoteZone(props) {
    const { history } = props;
    // const { location } = history;
    let payerRef = null;

    // 所有参赛选手
    const [peopleList, setPeopleList] = useState([[]]);
    // 当前选手
    const [player, setPlayer] = useState({});
    // 当前被选中的选手下标
    const [playerSub, setPlayerSub] = useState('00');

    const [started, setStarted] = useState(false);

    let dataParams = {
      eventUnionId: getQueryString('eventUnionId'),
      voteAreaUnionId: getQueryString('voteAreaUnionId')
    };

    document.title = '投票专区';

    /**
     *  eventUnionId: state.id,
        voteAreaUnionId: item.unionId
     */

    const getVoteInfo = (data) => {
        // Toast.loading('请求中', 0);
        const params = {
            url: '/app/event/getEventPlayers',
            method: "GET",
            data: data,
        }
        return new Promise(() => {
            request(params)
                .then((res) => {
                    let len = res.length;
                    let n = 8; //假设每行显示4个
                    let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
                    let result = [];
                    for (let i = 0; i < lineNum; i++) {
                        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
                        let temp = res.slice(i*n, i*n+n);
                        result.push(temp);
                    }
                    console.log(result)
                    setPeopleList(result)
                    if(isEmpty(player)) {
                      setPlayer(res[0] || {})
                    } else {
                      (res || []).forEach(item => {
                        if(item.unionId == player.unionId) {
                          setPlayer(item);
                        }
                      })
                    }
                })
        })
    }

    useEffect(() => {
        getVoteInfo(dataParams)
    }, [])

    const sendVoteTicket = (data) => {
      history && history.push('/sharePage');
    }

    /**
     * 点击投票
     * @date 2020-06-27
     * @returns {any}
     */
    const sendVoteEvent = (id) => {

        return sendVoteTicket.bind(this, {
            playerUnionId: id,
            ticketNum: 1,
            type: 0,
        })
    }

    /**
     * 点击当前选手
     * @date 2020-06-28
     * @returns {any}
     */
    const playerItemClick = (index, item) => {
        return () => {
            setPlayerSub(index);
            setPlayer(item);
            setTimeout(() => {
              console.log(payerRef, 'payerRef')
              payerRef && payerRef.play();
              setStarted(true);
            }, 1000)
        }
    }
    
    return <div className="event-vote-zone">
        {/* <PageTitle title="投票专区"/> */}
        <div className="event-vote-zone-content">
            {
              player && player.superVoteOrNot && (
                <div className="event-vote-zone-content-title">
                  <img src={require('../../../assets/imgs/vote-zone-title.png')} alt=""/>
                  <div>
                      <p>超级投票</p>
                      <span>花 {player && player.votePrice} 元给你喜爱的选手投 {player && player.voteNum} 票</span>
                  </div>
              </div>
              )
            }
            <div className="event-vote-zone-content-info">
                <img src={player.playerHeaderPic} alt=""/>
                <div>
                    <p>{player.playerName}</p>
                    <span>票数：{player.ticketNum}</span>
                </div>
                <button onClick={sendVoteEvent(player.unionId)}>投票</button>
            </div>
            <div className="event-vote-zone-content-video">
                <video
                    // muted
                    // autoPlay
                    // controls
                    ref={playerR => {
                      console.log(playerR, 'playerR')
                      playerR && (payerRef = playerR);
                    }}
                    preload="auto"
                    playsInline
                    webkit-playsinline="true"
                    mtt-playsinline="true"
                    src={player.playerMatchVideo}
                    style={{ backgroundColor: '#000' }}
                />
                { !started &&  <img src={play} alt="" onClick={() => {
                  payerRef && payerRef.play();
                  setStarted(true)
                }} />}
            </div>
            <div className="event-vote-zone-content-people">
                <ContentTitle title="参赛选手" />
                <Carousel autoplay={false}>
                    {
                        peopleList.map((item, index) => {
                            return (<ul key={index}>
                                {
                                    item.map((sub, subIndex) => {
                                        return (<li
                                                key={subIndex}
                                                className={classnames('carousel-lite-item', {
                                                    'active': playerSub === `${index}${subIndex}`
                                                })}
                                                onClick={playerItemClick(`${index}${subIndex}`, sub)}>
                                            <img src={sub.playerHeaderPic} alt=""/>
                                            <p>{sub.playerName && sub.playerName.length > 4 ? sub.playerName.substr(0, 4) : sub.playerName}</p>
                                            <span style={{
                                                color: `${index==0 && (subIndex == 0 || subIndex == 1 || subIndex == 2 || subIndex == 3) ? '#FF7B00' : ''}`
                                            }}>
                                                {sub.ticketNum}票
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