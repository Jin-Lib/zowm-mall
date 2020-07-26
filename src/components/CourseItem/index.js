import React from 'react'
import './index.scss'

function CourseItem (params) {
    const {
        organTutorName, organTutorPic, courseName, chapterName,
        firstFrameUrl
    } = params;
    console.log('params', params)
    return (<div className="course-item">
        <div className="course-item-header">
            <img src={organTutorPic} alt=""/>
            <h6>{organTutorName}</h6>
        </div>
        <div className="course-item-body">
            <div className="course-item-body-left">
                <img className="course-item-body-left-img" src={firstFrameUrl} alt=""/>
                <div className="course-item-body-left-desc">
                    <p>{courseName}</p>
                    <p>{chapterName}</p>
                </div>
            </div>
            <div className="course-item-body-right">
                <img src={require("../../assets/imgs/upload.png")} alt=""/>
                <p>上传作业</p>
            </div>
        </div>
    </div>)
}

export default CourseItem