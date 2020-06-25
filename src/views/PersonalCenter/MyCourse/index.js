import React from 'react';
import { PageTitle } from '../../../components'
import { CourseItem } from './components'
import './index.scss'

const coursetItem = [
    {
        title: '欧阳老师',
        titleImg: '',
        courseName: '华尔兹系列课程',
        courseDesc: '华尔兹课程（01）',
        courseImg: '',
    },
    {
        title: '欧阳老师',
        titleImg: '',
        courseName: '华尔兹系列课程',
        courseDesc: '华尔兹课程（01）',
        courseImg: '',
    },
    {
        title: '欧阳老师',
        titleImg: '',
        courseName: '华尔兹系列课程',
        courseDesc: '华尔兹课程（01）',
        courseImg: '',
    },
    {
        title: '欧阳老师',
        titleImg: '',
        courseName: '华尔兹系列课程',
        courseDesc: '华尔兹课程（01）',
        courseImg: '',
    },
    {
        title: '欧阳老师',
        titleImg: '',
        courseName: '华尔兹系列课程',
        courseDesc: '华尔兹课程（01）',
        courseImg: '',
    },
    {
        title: '欧阳老师',
        titleImg: '',
        courseName: '华尔兹系列课程',
        courseDesc: '华尔兹课程（01）',
        courseImg: '',
    },
]

function MyCourse() {
    return (<div className="my-course-page">
        <PageTitle title="我的课程" />
        <div className="my-course-content">
            {
                coursetItem && Array.isArray(coursetItem) && coursetItem.length > 0
                    ? (<React.Fragment>
                        {
                            coursetItem.map((item, key) => {
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