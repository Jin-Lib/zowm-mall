import React, { Component } from 'react';
import './index.scss';
import { play, add, plus } from '../../assets/imgs';

class Player extends Component {

  render() {

    return (
      <div className="player-container">
        <div className="player-box"></div>
        <div className="player-voice">
          <img src={plus} alt="" />
          <img src={add} alt="" />
        </div>
        <div className="player-line-box">
          <div className="player-time player-start-time">00:56</div>
          <div className="player-line">
            <div className="player-line-active"></div>
          </div>
          <div className="player-time player-end-time">03:44</div>
        </div>
        <div className="player-play-box">
          <img src={play} alt="" />
        </div>
      </div>
    );
  }
}

export default Player;