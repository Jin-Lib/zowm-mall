import React, { Component } from 'react';
import { course1, course2 } from '../../assets/imgs';
import { Toast } from 'antd-mobile';
import request from '../../utils/http-app'
import './index.scss';

class CourseList extends Component {
  state = {}

  API = {
    'getLiveRoomList': '/liveRoom/getLiveRoomList'
  };

  getLiveRoomList = () => {
    let params = {
      url: this.API.getLiveRoomList,
      method: "POST",
      data: {}
    };

    Toast.loading('请求中', 0);
    request(params)
      .then((res) => {
        
        Toast.hide();
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg)
      })
  }

  render() {

    return(
      <div className="course-list-container">
        <div className="course-list-header">
          <img className="course-list-img1" src={course1} />
          <div>线上直播时间表</div>
          <img className="course-list-img2" src={course2} />
        </div>
        <div className="course-list-content">
          <div className="course-content-header">
            <div className="course-content-header-item flex1">头像/昵称</div>
            <div className="course-content-header-item flex1-5">头衔</div>
            <div className="course-content-header-item flex1-2">标题/舞种</div>
            <div className="course-content-header-item flex1">时间/费用</div>
          </div>
          <div className="course-content-header-title">
            6月3日（星期三）
          </div>
          <div className="course-content-body bc-f5f9f8">
            <div className="course-content-body-item flex1">
              <img src="" alt="" />
              <span className="fw-5 mt-10">文欢舞蹈</span>
              <span className="fw-5">孙伟凯老师</span>
            </div>
            <div className="course-content-body-item flex1-5">
              <span>文欢舞蹈孙伟凯老师</span>
            </div>
            <div className="course-content-body-item flex1-2">
              <span>拉丁舞（60分钟 课程）</span>
              <span className="fw-5 mt-18">拉丁舞</span>
            </div>
            <div className="course-content-body-item flex1">
              <span>06-03 17:30-18:30</span>
              <span className="fw-5 mt-18">免费公益课</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getLiveRoomList();
  }
}

export default CourseList;