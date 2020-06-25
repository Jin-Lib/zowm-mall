import React from 'react'
import './index.scss'

function CourseItem (params) {
    const {
        title, titleImg, courseName, courseDesc,
        courseImg
    } = params;
    console.log('params', params)
    return (<div className="course-item">
        <div className="course-item-header">
            <img src={titleImg} alt=""/>
            <h6>{title}</h6>
        </div>
        <div className="course-item-body">
            <div className="course-item-body-left">
                <img className="course-item-body-left-img" src={courseImg} alt=""/>
                <div className="course-item-body-left-desc">
                    <p>{courseName}</p>
                    <p>{courseDesc}</p>
                </div>
            </div>
            <div className="course-item-body-right"></div>
        </div>
    </div>)
}

export default CourseItem