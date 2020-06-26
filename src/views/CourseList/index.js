import React, { Component, Fragment } from 'react';
import { course1, course2 } from '../../assets/imgs';
import { Toast } from 'antd-mobile';
import request from '../../utils/http-app'
import './index.scss';

class CourseList extends Component {
  state = {
    liveList: {}
  }

  API = {
    'getLiveRoomTimeList': '/liveRoom/getLiveRoomTimeList'
  };

  getLiveRoomTimeList = () => {
    let params = {
      url: this.API.getLiveRoomTimeList,
      method: "GET",
      data: {
        organTutorId: ''
      }
    };

    Toast.loading('请求中', 0);
    request(params)
      .then((res) => {
        this.setState({
          liveList: res || {}
        });
        Toast.hide();
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg)
      })
  }

  render() {
    const { liveList } = this.state;

    return(
      <div className="course-list-container">
        {/* 标题用 直播内容 */}
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
          {
            Object.keys(liveList || {}).map((key, index) => {
              let item = liveList[key];

              return (
                <Fragment>
                  <div className="course-content-header-title">
                    { key }
                  </div>
                  <div className="course-content-body bc-f5f9f8">
                    <div className="course-content-body-item flex1">
                      <img src={item.organTutorLogo} alt="" />
                      <span className="fw-5 mt-10">{item.organTutorName}</span>
                      {/* <span className="fw-5">孙伟凯老师</span> */}
                    </div>
                    <div className="course-content-body-item flex1-5">
                      <span>文欢舞蹈孙伟凯老师</span>
                    </div>
                    <div className="course-content-body-item flex1-2">
                      <span>{ item.liveRoomContent }</span>
                      <span className="fw-5 mt-18">拉丁舞</span>
                    </div>
                    <div className="course-content-body-item flex1">
                      <span>{ item.liveStartEndDate }</span>
                      <span className="fw-5 mt-18">{ item.fee }</span>
                    </div>
                  </div>
                </Fragment>
              )
            })
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getLiveRoomTimeList();
  }
}

export default CourseList;