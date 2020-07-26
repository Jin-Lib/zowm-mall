import React, { Component, Fragment } from 'react';
import './index.scss';

class Tabs extends Component {
  state = {
    active: 0
  }

  onClick = (active) => {
    this.props.onClick && this.props.onClick(active);
  }

  render() {
    const { children, tip, className, active } = this.props;

    return (
      <div className={`tabs-container ${className ? className : ''}`}>
        <div className="tabs-headers">
          {
            (children || []).map((item, index) => {
              return (
                <Fragment key={item.key}>
                  <div 
                    className={`tabs-headers-item ${active == item.key ? 'active' : ''}`} 
                    style={{ width: `${children && (100 / (children.length))}%` }}
                    onClick={() => { this.onClick(item.key) }}
                  >
                    { item.props.title }
                  </div>
                  {
                    index !== (children.length - 1) ? <div className="tabs-headers-line"></div> : null
                  }
                </Fragment>
              )
            })
          }
        </div>
        { tip }
        <div className="tabs-content">
          {
            (children || []).map((item, index) => {
              return (
                <div key={item.key} className="tabs-content-item" style={{ display: `${ active == item.key ? 'block': 'none'  }` }}>
                  { item }
                </div>
              )
            })
          }
          
        </div>
      </div>
    );
  }
}

const Item = (props) => {

  return (
    <Fragment>
      { props.children }
    </Fragment>
  );
}

Tabs.Item = Item;

export default Tabs;