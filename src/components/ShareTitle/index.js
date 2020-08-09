import React from 'react';
import CButton from '../CButton';
import './index.scss';
import { logo } from '../../assets/imgs';

const ShareTitle = ({ url }) => {
    return (<div className="share-title">
        <div className="share-title-left">
            <img src={logo} alt=""/>
            <h6>中欧舞盟APP</h6>
        </div>
        <CButton className="share-title-button" href={url}>下载APP</CButton>
    </div>)
}

export default ShareTitle;