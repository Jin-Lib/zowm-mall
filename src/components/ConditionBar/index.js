import React, { Component } from 'react';
import { Icon } from 'antd-mobile';

import './index.scss';

class ConditionBar extends Component {

  render() {

    return (
      <div className="condition-bar-container">
        <div className="condition-bar-item active">综合</div>
        <div className="condition-bar-line"></div>
        <div className="condition-bar-item">销量</div>
        <div className="condition-bar-line"></div>
        <div className="condition-bar-item">价格</div>
        <div className="condition-bar-line"></div>
        <div className="condition-bar-icon">
          <Icon type='ellipsis' size="sm" color="#999" />
        </div>
      </div>
    );
  }
}

export default ConditionBar;