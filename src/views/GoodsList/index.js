import React, { Component } from 'react';
import ConditionBar from '../../components/ConditionBar';
import ListPageData from '../../components/ListPageData';
import { Icon, InputItem, Toast } from 'antd-mobile'
import { getQueryString } from '../../utils/common'
import { PageTitle } from '../../components';
import request from '../../utils/http'
import classnames from 'classnames';
import './index.scss';

const conditios = {
  'all': 0,   // 默认 综合
  'number': 1,  // 销量
  'price': 2    // 价格
};

class GoodsList extends Component {
  constructor(props) {
    super(props);

    let tagId = ''
    if(/tagId=([0-9]+)/.test(window.location.href)) {
      tagId = RegExp.$1
    }

    this.state = {
      type: 'row',
      active: 'all',
      orderBy: 0,
      keyword: '',
  
      tagId,  // 分类id
      brandId: getQueryString('brandId'),  // 品牌id

      brandDetail: '',
      tagDetail: ''
    }
  }
  
  API = {
    'searchProdPage': '/search/searchProdPage',
    // 品牌
    'prodListByBrandId': '/prod/prodListByBrandId',
    // 分类
    'prodListByTagId': '/prod/prodListByTagId',
    // 根据分类id获取分类
    'getTagByTagId': '/prod/tag/getTagByTagId',
    // 根据品牌获取品牌信息
    'getBrandByBrandId': '/prod/getBrandByBrandId'
  }

  componentDidMount() {
    if(this.state.brandId) {
      this.getBrandByBrandId();
    }
    if(this.state.tagId) {
      this.getTagByTagId();
    }
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

    history && history.push(`/goodsDetails?prodId=${data.prodId}`, {
      prodId: data.prodId
    })
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

  // 获取分类信息
  getTagByTagId = () => {
    Toast.loading('请求中', 0);
    const params = {
      url: this.API.getTagByTagId,
      method: "GET",
      data: {
        tagId: this.state.tagId
      },
    }
    request(params)
      .then((res) => {
        this.setState({
          tagDetail: res || {}
        });
        Toast.hide();
      })
      .catch((error) => {
        const { data } = error;
        // const { error } = data || {};
        // Toast.info(error || "当前网络异常, 请稍后重试!")
      })
  }

  // 获取品牌信息
  getBrandByBrandId = () => {
    Toast.loading('请求中', 0);
    const params = {
      url: this.API.getBrandByBrandId,
      method: "GET",
      data: {
        brandId: this.state.brandId
      },
    }
    request(params)
      .then((res) => {
        Toast.hide();
        this.setState({
          brandDetail: res || {}
        });
      })
      .catch((error) => {
        const { data } = error;
        // const { error } = data || {};
        // Toast.info(error || "当前网络异常, 请稍后重试!")
      })
  }

  render() {
    const { brandDetail, tagDetail } = this.state;
    let classNames = classnames(
      'good-list-box',
      {
        'mt-100': !this.state.brandId && !this.state.tagId,
        // 'mt-44': this.state.brandId || this.state.tagId
      }
    );

    return (
      <div className="goods-list-container">
        <PageTitle title="商品列表" />
        {
          !this.state.brandId && !this.state.tagId ? (
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
          ) : null
        }
        {
          this.state.brandId && (
            <>
              <div className="h-55"></div>
              <div className="brand-box">
                <img src={brandDetail && brandDetail.brandPic} alt="品牌" />
                <div className="brand-name">
                  <div className="brand-text">{brandDetail && brandDetail.brandName}</div>
                  <div className="brand-num">{brandDetail && brandDetail.personLook}</div>
                </div>
              </div>
            </>
          )
        }
        {
          this.state.tagId && (
            <>
              <div className="h-55"></div>
              <div className="brand-box">
                <img src={tagDetail && tagDetail.tagPic} alt="品牌" />
                <div className="brand-name">
                  <div className="brand-text">{tagDetail && tagDetail.title}</div>
                </div>
              </div>
            </>
          )
        }
        
        <div className={classNames}>
          {/* 品牌 */}
          {
            this.state.brandId ? (
              <ListPageData
                className='good-list-row'
                url={this.API.prodListByBrandId}
                params={{
                  brandId: this.state.brandId
                }}
                renderItem={this.renderGoodItem}
                active={this.state.active}
              />
            ) : null
          }
          {/* 分类 */}
          {
            this.state.tagId ? (
              <ListPageData
                className='good-list-row'
                url={this.API.prodListByTagId}
                params={{
                  tagId: this.state.tagId
                }}
                renderItem={this.renderGoodItem}
                active={this.state.active}
              />
            ) : null
          }
          {/* 搜索 */}
          {
            (!this.state.tagId && !this.state.brandId) ? (
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
            ) : null
          }
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