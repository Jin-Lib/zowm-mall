import React, { Component } from 'react';
import './index.scss';
import { play, add, plus } from '../../assets/imgs';
// import music from '../../assets/music.mp3';

class Player extends Component {
  constructor(props) {
    super(props);

    this.musicRef = null;
  }

  state = {
    time: "00:00",
    start: "00:00",
    currentRadio: 0,
    play: false,
    // 音量
    volume: 50
  }

  // 音乐总时长
  allSecond = 0

  getTime = (time) => {
    //分钟
    var minute = time / 60;
    var minutes = parseInt(minute);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    //秒
    var second = time % 60;
    var seconds = Math.round(second);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return  minutes + ':' + seconds
  }

  // 播放和暂停
  playAndStop = () => {
    const { play } = this.state;

    if(play) {
      this.musicRef && this.musicRef.pause();
      this.setState({
        play: false
      });
    } else {
      this.musicRef && this.musicRef.play();
      this.setState({
        play: true
      });
    }

  }

  // 音量调节
  setVolume = (increase) => {
    let step = 5;
    let volume = this.state.volume;

    if(increase) {
      volume = volume + step;

      if(volume > 100) {
        volume = 100;
      }
    } else {
      volume = volume - step;

      if(volume < 0) {
        volume = 0;
      }
    }

    this.musicRef && (this.musicRef.volume = volume / 100);
    this.setState({
      volume
    });
  }

  drawCircleLine = (percentage) => {
    let canvas = this.canvas || document.getElementById('canvas');

    this.drawCircle(canvas, percentage);
  }

  drawCircle = function (canvas, percentage) {
    var clientWidth = document.documentElement.clientWidth;
    var canvasWidth = Math.floor(clientWidth * 320 / 375);
    var innerR = canvasWidth * 0.8 * 0.5;//半径
    var ctx;
    canvas.setAttribute('width', canvasWidth + 'px');
    canvas.setAttribute('height', canvasWidth + 'px');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
    }
    ctx.translate(canvasWidth / 2, canvasWidth / 2);
    ctx.beginPath();
    ctx.arc(0, 0, innerR, 0, Math.PI * 2, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(255,167,128,.2)";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, innerR, Math.PI * 3 / 2, (Math.PI * 3 / 2 + Math.PI * 2 / 180 + percentage * Math.PI * 2), false);
    ctx.lineWidth = 3;

    var g = ctx.createLinearGradient(0,canvasWidth/2,0,-canvasWidth/2);  //创建渐变对象  渐变开始点和渐变结束点
    g.addColorStop(0, '#FF5E6B'); //添加颜色点
    g.addColorStop(1, '#FFA780'); //添加颜色点
    ctx.strokeStyle = g;     //使用渐变对象作为圆环的颜色
    // ctx.strokeStyle = "#FFA780";
    ctx.stroke();
  };

  render() {
    const { start, time, currentRadio, volume } = this.state;

    return (
      <div className="player-container">
        <div className="player-box">
          <audio src={''} id="music" ref={music => this.musicRef = music}></audio>
          <canvas id="canvas"></canvas>
          <img src="https://img2.51tietu.net/pic/2017-010823/20170108235247cl2kntbuigu20695.jpg" />
        </div>
        <div className="player-voice">
          <img src={plus} alt="" onClick={() => { this.setVolume(false) }} />
          <span>{ volume + '%' }</span>
          <img src={add} alt="" onClick={() => { this.setVolume(true) }} />
        </div>
        <div className="player-line-box">
          <div className="player-time player-start-time">{ start }</div>
          <div className="player-line">
            <div className="player-line-active" style={{ width: `${currentRadio * 100}%` }}></div>
          </div>
          <div className="player-time player-end-time">{ time }</div>
        </div>
        <div className="player-play-box">
          <img src={play} alt="" onClick={this.playAndStop} />
        </div>
      </div>
    );
  }

  componentDidMount() {

    this.musicRef.onloadedmetadata = () => {
      let time = this.musicRef.duration;
      // 音量
      console.log(this.musicRef.volume)
      this.musicRef.volume = this.state.volume / 100;
      // 播放
      // this.playAndStop();

      this.setState({
        time: this.getTime(time)
      });
      this.allSecond = time;

      
    }

    this.canvas = document.getElementById('canvas');

    // 监听歌曲进度
    let that = this;
    this.musicRef && this.musicRef.addEventListener("timeupdate",function(e){
      that.setState({
        start: that.getTime(this.currentTime),
        currentRadio: this.currentTime / that.allSecond
      });
      that.drawCircleLine(this.currentTime / that.allSecond);
    });

    this.musicRef && this.musicRef.addEventListener("ended", () =>{
      this.setState({
        start: '00:00',
        currentRadio: 0,
        play: false
      });

      this.drawCircleLine(0);
    });

    this.drawCircleLine(0);

  }
}

export default Player;