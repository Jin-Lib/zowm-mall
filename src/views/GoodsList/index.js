import React, { Component } from 'react';
import ConditionBar from '../../components/ConditionBar';
import ListPageData from '../../components/ListPageData';
import { Icon, InputItem } from 'antd-mobile'
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
    orderBy: 0,
    keyword: ''
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
    let orderBy = active === newActive ? ( this.state.orderBy === 0 ? 1 : 0 ) : 0;

    this.setState({
      active: newActive,
      orderBy
    });
  }

  onKeywordChange = (value) => {
    console.log(value);
    this.setState({
      keyword: value
    });
  }

  toDetail = (data) => {
    const { history } = this.props;

    history && history.push(`/goodsDetails/${data.prodId}`)
  }

  renderGoodItem = (data, key) => {

    return (
      <div className="good-item-container" key={key} onClick={() => { this.toDetail(data) }}>
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
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%' }}>
          <SearchInput
            value={this.state.keyword}
            onChange={this.onKeywordChange}
          />
          <ConditionBar
            toggerType={this.onToggerType}
            onClick={this.onClickCondition}
            type={this.state.type}
            active={this.state.active}
          />

        </div>
        
        <div className="good-list-box">
          <ListPageData
            className={ this.state.type === 'row' ? 'good-list-row' : 'good-list-col'}
            url={this.API.searchProdPage}
            params={{
              prodName: this.state.keyword,
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

const SearchInput = (props) => {
  const { value, onChange } = props;

  const onChangeValue = (value) => {
    onChange && onChange(value);
  }

  return (
    <div className="search-input-container">
      <div className="search-input-box">
        <Icon type="search" size="xs" color="#474747" /> 
        <InputItem
          value={value}
          onChange={onChangeValue}
          placeholder="请输入关键字"
        />
      </div>
    </div>
  );
}

export default GoodsList;