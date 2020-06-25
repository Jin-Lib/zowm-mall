/**
 * ListPageData
 * 赋予ListView分页加载数据的能力，将分页加载公用逻辑抽象
 * @param url [string] 请求地址
 * @param params [object] 请求参数
 * @param className [stirng] 类名
 * @param style [object] 自定义样式
 */
import React, { Component, Fragment } from 'react';
import ListView from '../ListView';
import Loading from '../Loading';
import request from '../../utils/http';
import './index.scss';

class ListPageData extends Component {
  state = {
    
    pagination: {
      current: 1,
      size: 8
    },

    dataSource: [],

    isLoading: false,
    hasMore: true,
  }

  // 请求任务列表
  loadList = () => {
    let { params, url } = this.props;
    let { pagination, dataSource } = this.state;
    let dataSourceCopy = dataSource.concat([]);
    this.setState({
      isLoading: true
    });

    request({
      url,
      data:{
        ...(params || {}),
        ...pagination
      },
      method: "GET",
    }).then(data => {
      let { records, total } = data || {};
      let dataResult = dataSourceCopy.concat(records || []);

      this.setState({
        hasMore: dataResult.length < total,
        dataSource: dataResult,
        isLoading: false
      });
    })
         
  }

  // 滚动到底部加载更多
  onEndReached = () => {
    const { hasMore, isLoading, pagination } = this.state;
    if(!hasMore || isLoading) return;
    this.setState({
      pagination: {
        ...pagination,
        current: ++pagination.current
      }
    }, () => {
      this.loadList();
    });
  }

  renderList = (data) => {
    const { renderItem } = this.props;
    return (
      <Fragment>
        {
          data && data.length === 0 && !this.state.isLoading ? <div className="list-empty">暂无数据</div> : null
        }
        {
          data.map((item, index) => { return renderItem(item, index) })
        }
        {
          this.state.isLoading ? <Loading /> : null
        }
        <div style={{ width: '100%' }}></div>
        {
          data && data.length > 0 && !this.state.isLoading && !this.state.hasMore ? <div className="list-empty">没有更多数据了</div> : null
        }
      </Fragment>
    );
  }

  render() {

    return(
      <Fragment>
        <ListView
          {...this.props}
          onEndReached={this.onEndReached}
        >
          {
            this.renderList(this.state.dataSource)
          }
          {/* <Loading isLoading={this.state.isLoading} text={this.state.hasMore ? "上拉加载更多" : "没有更多数据啦..."} /> */}
        </ListView>
        
      </Fragment>
    );
  }

  componentDidMount() {
    this.loadList();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.active !== nextProps.active || JSON.stringify(this.props.params) !== JSON.stringify(nextProps.params)) {
      this.setState({
        pagination: {
          current: 1,
          size: 8
        },
    
        dataSource: [],
    
        isLoading: false,
        hasMore: true,
      }, () => {
        this.loadList();
      });
    }
  }

}

export default ListPageData;