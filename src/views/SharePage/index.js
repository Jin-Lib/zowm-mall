import React, { useEffect, PureComponent } from 'react';
import { Modal } from 'antd-mobile'
import { PageTitle, CButton, ShareTitle } from '../../components'
import './index.scss';

class SharePage extends PureComponent {

    componentDidMount() {
        if (this.wx()) {
            Modal.alert('请点击右上角,通过浏览器下载')
        }
    }

    wx = () => navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1

    render() {
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
}

export default SharePage