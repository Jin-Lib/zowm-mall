import React, { Component, Fragment } from 'react';
import './index.scss';

class Tabs extends Component {
  state = {
    active: 0
  }

  onClick = (active) => {
    this.setState({
      active
    });
  }

  render() {
    const { children } = this.props;
    const { active } = this.state;

    return (
      <div className="tabs-container">
        <div className="tabs-headers">
          {
            (children || []).map((item, index) => {
              return (
                <Fragment key={index}>
                  <div 
                    className={`tabs-headers-item ${active === index ? 'active' : ''}`} 
                    style={{ width: `${children && (100 / (children.length))}%` }}
                    onClick={() => { this.onClick(index) }}
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
        <div className="tabs-content">
          {
            (children || []).map((item, index) => {
              return (
                <div key={index} className="tabs-content-item" style={{ display: `${ active === index ? 'block': 'none'  }` }}>
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