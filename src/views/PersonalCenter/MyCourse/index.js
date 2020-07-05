import React, { useState, useEffect } from 'react';
import { PageTitle, ListView } from '../../../components'
import { CourseItem } from './components'
import { Toast } from 'antd-mobile';
import { httpApp as request } from '../../../utils'
import './index.scss'

function MyCourse() {

    // 课程列表
    const [ coursetList, setCoursetList ] = useState();

    // 课程 分页
    const [ pageNum, setPageNum ] = useState(1);
    const [ pageSize, setPageSize ] = useState(5);

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
                    const { pageResult } = res;
                    console.log(pageResult)
                    setCoursetList(pageResult)
                    Toast.hide();
                })
                .catch((error) => {
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

    return (<div className="my-course-page">
        <PageTitle title="我的课程" />
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
                    : []
            }
        </div>
    </div>)
}

export default MyCourse