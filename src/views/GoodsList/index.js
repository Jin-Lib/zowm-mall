import React, { Component } from 'react';
import ConditionBar from '../../components/ConditionBar';
import ListPageData from '../../components/ListPageData';
import './index.scss';

const conditios = {
  'all': 0,   // 默认 综合
  'number': 1,  // 销量
  'price': 2    // 价格
};

class GoodsList extends Component {
  state = {
    type: 'row',
    active: 'all',
    orderBy: 0
  }

  API = {
    'searchProdPage': '/search/searchProdPage'
  }

  onToggerType = (type) => {
    this.setState({
      type
    });
  }

  onClickCondition = (newActive) => {
    const { active } = this.state;
    console.log(active, newActive);
    let orderBy = active === newActive ? ( this.state.orderBy === 0 ? 1 : 0 ) : 0;
    console.log(this.state.orderBy, orderBy);

    this.setState({
      active: newActive,
      orderBy
    });
  }

  renderGoodItem = (data, key) => {

    return (
      <div className="good-item-container" key={key}>
        <img className="good-item-img" src={data.pic} alt="" />
        <div className="good-item-content">
          <div className="good-item-name">
            { data.prodName || '-' }
          </div>
          <div className="good-item-info">
            <span className="good-item-price">¥ { data.price }</span>
            {/* <span className="good-item-num">105人购买</span> */}
          </div>
        </div>
      </div>
    )
  }

  render() {

    return (
      <div className="goods-list-container">
        <ConditionBar
          toggerType={this.onToggerType}
          onClick={this.onClickCondition}
          type={this.state.type}
          active={this.state.active}
        />

        <div className="good-list-box">
          <ListPageData
            className={ this.state.type === 'row' ? 'good-list-row' : 'good-list-col'}
            url={this.API.searchProdPage}
            params={{
              prodName: '',
              sort: conditios[this.state.active],
              orderBy: this.state.orderBy
            }}
            renderItem={this.renderGoodItem}
            active={this.state.active}
          />
        </div>
      </div>
    );
  }
}

export default GoodsList;