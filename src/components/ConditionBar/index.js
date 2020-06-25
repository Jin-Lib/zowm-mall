import React, { Component, Fragment } from 'react';
import { Icon } from 'antd-mobile';

import './index.scss';

class ConditionBar extends Component {
  state = {
    conditionData: {
      'all': '综合',
      'number': '销量',
      'price': '价格'
    }
  };
  
  toggerType = () => {
    const { type, toggerType } = this.props;

    if(type == 'row') {
      toggerType && toggerType('col')
    } else {
      toggerType && toggerType('row');
    }
  }

  onClick = (active) => {
    const { onClick } = this.props;

    onClick && onClick(active);
  }

  render() {
    const { onClick, type, active } = this.props;
    let { conditionData  } = this.state;

    return (
      <div className="condition-bar-container">
        {
          Object.keys(conditionData).map((item, index) => {
            return (
              <Fragment key={index}>
                <div onClick={() => { this.onClick(item) }} className={`condition-bar-item ${ active === item ? 'active' : '' }`}>{ conditionData[item] }</div>
                <div className="condition-bar-line"></div>
              </Fragment>
            );
          })
        }
        <div className="condition-bar-icon" onClick={this.toggerType}>
          <Icon type='ellipsis' size="sm" color="#999" />
        </div>
      </div>
    );
  }
}

export default ConditionBar;