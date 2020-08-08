import React, { useEffect, useState } from 'react';
import { Carousel, Toast } from 'antd-mobile'
import { PageTitle, ContentTitle } from '../../../components'
import { httpApp as request } from '../../../utils'
import classnames from 'classnames'
import { isEmpty } from 'loadsh'
import './index.scss'

function EventVoteZone(props) {
    const { history } = props;
    const { location } = history;

    // 所有参赛选手
    const [peopleList, setPeopleList] = useState([[]]);
    // 当前选手
    const [player, setPlayer] = useState({});
    // 当前被选中的选手下标
    const [playerSub, setPlayerSub] = useState('00');

    const getVoteInfo = (data) => {
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/event/getEventPlayers',
            method: "GET",
            data: data,
        }
        return new Promise(() => {
            request(params)
                .then((res) => {
                    let len = res.length;
                    let n = 4; //假设每行显示4个
                    let lineNum = len % 4 === 0 ? len / 4 : Math.floor( (len / 4) + 1 );
                    let result = [];
                    for (let i = 0; i < lineNum; i++) {
                        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
                        let temp = res.slice(i*n, i*n+n);
                        result.push(temp);
                    }
                    setPeopleList(result)
                    isEmpty(player) && setPlayer(res[0] || {})
                    Toast.hide();
                })
        })
    }

    useEffect(() => {
        getVoteInfo(location.state)
    }, [])

    const sendVoteTicket = (data) => {
        const params = {
            url: '/app/event/voteTicket',
            method: "GET",
            data: data,
        }
        return new Promise(() => {
            request(params)
                .then((res) => {
                    Toast.hide();
                    getVoteInfo(location.state)
                })
        })
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
        }
    }

    console.log('player', player)

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
                <img src={player.playerHeaderPic} alt=""/>
                <div>
                    <p>{player.playerName}</p>
                    <span>票数：{player.ticketNum}</span>
                </div>
                <button onClick={sendVoteEvent(player.unionId)}>投票</button>
            </div>
            <div className="event-vote-zone-content-video">
                <video
                    src={player.playerMatchVideo}
                    controls />
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
                                            <p>{sub.playerName}</p>
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