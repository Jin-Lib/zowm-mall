import React from 'react';
import { tip } from '../../assets/imgs';
import './index.scss'

const Notification = (props) => {
  const { text, onClick } = props;

  return (
    <div className="notification-container">
      <img src={tip} alt />
      <div className="notification-text">
        {text}
      </div>
      <span onClick={onClick}>详情</span>
    </div>
  );
}

export default Notification;