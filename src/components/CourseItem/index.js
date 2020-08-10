import React from 'react'
import { navigate } from '../../utils/bridge'
import './index.scss'

function CourseItem (params) {
    const {
        organTutorName, organTutorPic, courseName, chapterName,
        firstFrameUrl, organTutorStudentUnionId, courseUnionId
    } = params;

    return (<div className="course-item">
        <div className="course-item-header">
            <img src={organTutorPic} alt=""/>
            <h6>{organTutorName}</h6>
        </div>
        <div className="course-item-body">
            <div className="course-item-body-left" onClick={() => {
              navigate && navigate({
                url: `/lesson-detail?courseUnionId=${courseUnionId}`,
              });
            }}>
                <img className="course-item-body-left-img" src={firstFrameUrl} alt=""/>
                <div className="course-item-body-left-desc">
                    <p>{courseName}</p>
                    <p>{chapterName}</p>
                </div>
            </div>
            <div className="course-item-body-right"
              onClick={() => {
                navigate && navigate({
                  url: `/upload-home-work?studentOrganTutorId=${organTutorStudentUnionId}`,
                });
              }}
            >
                <img src={require("../../assets/imgs/upload.png")} alt=""/>
                <p>上传作业</p>
            </div>
        </div>
    </div>)
}

export default CourseItem