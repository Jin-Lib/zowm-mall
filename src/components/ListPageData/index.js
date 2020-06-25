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
// import Loading from '../Loading';
import request from '../../utils/http';

class ListPageData extends Component {
  state = {
    
    pagination: {
      page: 1,
      pageSize: 20
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
      let { resultData, total } = data || {};
      let dataResult = dataSourceCopy.concat(resultData || []);

      this.setState({
        hasMore: dataResult.length < total,
        dataSource: [{}, {}, {}, {}],
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
        page: ++pagination.page
      }
    }, () => {
      this.loadTask();
    });
  }

  renderList = (data) => {
    const { renderItem } = this.props;
    return (
      <Fragment>
        {
          data && data.length === 0 && !this.state.isLoading ? <div className="task-empty">暂无数据</div> : null
        }
        {
          data.map((item, index) => { return renderItem(item, index) })
        }
        {/* <TaskItem key={index} data={item} onClick={this.onTaskItemClick} onFinishClick={this.onFinishClick} /> */}
      </Fragment>
    );
  }

  render() {
    console.log(this.state.dataSource);

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

}



const TaskItem = (props) => {
  const { data, onClick, onFinishClick } = props;

  return (
    <div className="task-item-container">
      test
    </div>
  );
}

export default ListPageData;