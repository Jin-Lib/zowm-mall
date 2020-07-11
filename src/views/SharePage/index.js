import React from 'react';
import { PageTitle, CButton, ShareTitle } from '../../components'
import './index.scss';

const SharePage = () => {
    return (<div className="share-page">
        <PageTitle title="下载分享" leftIcon="close"/>
        <div className="share-page-content">
            <ShareTitle />
            <h4>中欧舞盟</h4>
            <img className="share-page-content-img" src={require('../../assets/imgs/app-share.png')} alt=""/>
            <CButton className="share-page-button-share-button">下载APP</CButton>
        </div>
    </div>)
}

export default SharePage