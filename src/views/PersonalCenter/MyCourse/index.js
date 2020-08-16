import React, { useState, useEffect, createRef } from 'react';
import { PageTitle, ListView, CourseItem } from '../../../components'
import { Toast } from 'antd-mobile';
import { httpApp as request } from '../../../utils'
import './index.scss'
import { navigate } from '../../../utils/bridge';

function MyCourse() {
    // 课程列表
    const [ coursetList, setCoursetList ] = useState([]);

    // 课程 分页
    const [ pageNum, setPageNum ] = useState(1);
    const [ pageSize, setPageSize ] = useState(10);

    /**
     * 获取课程列表
     * @date 2020-06-28
     * @param {any} data
     * @returns {any}
     */
    const getCourseOrderPage = (data) => {
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/course/getCourseOrderPage',
            method: "GET",
            data: data,
        }
        return new Promise(() => {
            request(params)
                .then((res) => {
                  try {
                    const { pageResult } = res;
                    let coursetListData = coursetList.concat(pageResult || []);
                    setCoursetList(coursetListData)
                  } catch(err) {
                    console.log(err)
                  }
                    
                    Toast.hide();
                })
                .catch((error) => {
                    Toast.hide();
                    const { data } = error;
                    const { error: errMsg } = data || {};
                    Toast.info(errMsg || "当前网络异常, 请稍后重试!")
                })
        })
    }

    useEffect(() => {
        getCourseOrderPage({
            pageNum,
            pageSize,
        })
    }, [pageNum, pageSize])

    useEffect(() => {
        // 计算listView的高度
        const listViewTarget = document.getElementsByClassName('my-course-page-content-list-view')[0];
        const titleTarget = document.getElementsByClassName('page-title')[0];
        const containerH = document.body.getBoundingClientRect().height;
        const titleH = titleTarget.getBoundingClientRect().height;
        listViewTarget.style.height = `${containerH-titleH}px`
    }, [])

    const onEndReached = () => {
        setPageNum(state => state+=1)
    }

    return (<div className="my-course-page">
        <PageTitle
          title="我的课程"
          rightCon={
            <div onClick={() => {
              navigate && navigate({
                url: ''
              });
            }}>我的作业</div>
          }
        />
        <ListView
            className="my-course-page-content-list-view"
            onEndReached={onEndReached}>
            <div className="my-course-content">
                {
                    coursetList && Array.isArray(coursetList) && coursetList.length > 0
                        ? (<React.Fragment>
                            {
                                coursetList.map((item, key) => {
                                    return <CourseItem key={key} {...item} />
                                })
                            }
                        </React.Fragment>)
                        : <img className="no-order-bg" src={require('../../../assets/imgs/no-class.png')} alt=""/>
                }
            </div>
        </ListView>
    </div>)
}

export default MyCourse