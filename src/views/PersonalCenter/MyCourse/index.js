import React from 'react';
import { PageTitle } from '../../../components'
import { CourseItem } from './components'
import './index.scss'

const coursetItem = {
    title: '欧阳老师',
    titleImg: '',
    courseName: '华尔兹系列课程',
    courseDesc: '华尔兹课程（01）',
    courseImg: '',
}

function MyCourse() {
    return (<div className="my-course-page">
        <PageTitle title="我的课程" />
        <div className="my-course-content">
            <CourseItem {...coursetItem} />
        </div>
    </div>)
}

export default MyCourse