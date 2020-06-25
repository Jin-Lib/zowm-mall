import React, { Component } from 'react';
import ConditionBar from '../../components/ConditionBar';
import ListPageData from '../../components/ListPageData';
import './index.scss';

class GoodsList extends Component {
  state = {
    active: 'row'
  }


  renderGoodItem = (data, key) => {

    return (
      <div className="good-item-container" key={key}>
        <img className="good-item-img" alt="" />
        <div className="good-item-content">
          <div className="good-item-name">
            【佳成专业国际舞标】672/条纹撞色拼接流苏前开衩第卅浪费的开始第三方大沙发大发大沙发奥迪发的的大发啊
          </div>
          <div className="good-item-info">
            <span className="good-item-price">¥ 278.00</span>
            <span className="good-item-num">105人购买</span>
          </div>
        </div>
      </div>
    )
  }

  render() {

    return (
      <div className="goods-list-container">
        <ConditionBar />

        <div className="good-list-box">
          <ListPageData
            className={ this.state.active === 'row' ? 'good-list-row' : 'good-list-col'}
            url="/search/searchProdPage"
            params={{
              prodName: '',
            }}
            renderItem={this.renderGoodItem}
          />
        </div>
      </div>
    );
  }
}

export default GoodsList;