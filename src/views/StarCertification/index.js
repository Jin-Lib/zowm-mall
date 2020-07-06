import React, { Component } from 'react';
import Tabs from '../../components/Tabs'
import { InputItem, Toast } from 'antd-mobile';
import './index.scss';
import { upload1 } from '../../assets/imgs';
import request from '../../utils/http-app'
import Dances from '../Dances';

class StartCertification extends Component {

  state = {
    detail: '',
    // 机构
    institutions: {
      "identityType": 1,    // 认证类型 1:机构  2:导师
      "address": "",        // 地址
      "goodAtDancing": [],  // 擅长舞种
      "intro": "",          // 简介
      "objectLogo": "",     // 机构Logo或者导师头像
      "objectName": "",     // 机构名称或者导师名称
      "qualificationsUrl": "",
      "replayPhone": "",    // 申请人电话号
      "replayRealName": "", // 申请人真实名称
      "replayWechat": "",   // 申请人微信号
      "tutorOrganId": '',   // 所属机构
      "replayEMail": ""     // 申请人邮箱
    },

    showDances: false
  }

  API = {
    'getOrganTutorDetail': '/app/organTutor/getOrganTutorDetail'
  };

  getOrganTutorDetail = () => {
    let params = {
      url: this.API.getOrganTutorDetail,
      method: "GET",
      data: {
        unionId: ''
      }
    };

    Toast.loading('请求中', 0);
    request(params)
      .then((res) => {
        this.setState({
          detail: res || {}
        });
        Toast.hide();
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg)
      })
  }

  onChangeInput = (value, name) => {
    const { institutions } = this.state;

    this.setState({
      institutions: {
        ...institutions,
        [name]: value
      }
    });
  }

  onAddDance = () => {
    this.setState({
      showDances: true
    });
  }

  onClose = () => {
    this.setState({
      showDances: false
    });
  }

  render() {
    const { institutions } = this.state;
    const { objectName, replayRealName, replayPhone, replayWechat, intro, address, goodAtDancing } = institutions;

    return (
      <div className="start-certification-container">
        <Tabs>
          <Tabs.Item title="学校/机构">
            <CInputItem label="机构名称" value={objectName} onChange={(val) => { this.onChangeInput(val, 'objectName') }} required placeholder="请输入您的机构名称～" />
            <CInputItem label="姓名" value={replayRealName} onChange={(val) => { this.onChangeInput(val, 'replayRealName') }} required placeholder="请输入您的姓名～" />
            <CInputItem label="联系电话" value={replayPhone} onChange={(val) => { this.onChangeInput(val, 'replayPhone') }} required placeholder="请输入您的联系方式～" />
            <CInputItem label="微信号" value={replayWechat} onChange={(val) => { this.onChangeInput(val, 'replayWechat') }} required placeholder="请输入您的微信号～" />
            <CInputItem label="简介" value={intro} onChange={(val) => { this.onChangeInput(val, 'intro') }} required placeholder="请输入机构的简介～" />
            <CInputItem label="地址" value={address} onChange={(val) => { this.onChangeInput(val, 'address') }} required placeholder="请输入机构地址～" />
            <CInputItem label="上传资料" required>
              <div className="upload-flex">
                <UploadBox className="m-10" />
                <UploadBox className="m-10 ml-10" />
              </div>
            </CInputItem>
            <SButton>
              保存
            </SButton>
          </Tabs.Item>
          <Tabs.Item title="KOL/个人领袖">
            <CInputItem label="姓名" value={objectName} onChange={(val) => { this.onChangeInput(val, 'objectName') }} required placeholder="请输入您的姓名～" />
            <CInputItem label="联系电话" value={replayPhone} onChange={(val) => { this.onChangeInput(val, 'replayPhone') }} required placeholder="请输入您的联系方式～" />
            <CInputItem label="微信号" value={replayWechat} onChange={(val) => { this.onChangeInput(val, 'replayWechat') }} required placeholder="请输入您的微信号～" />
            <CInputItem label="所属机构" required placeholder="请选择所属机构～" />
            <CInputItem label="擅长舞种" required>
              {
                goodAtDancing.map(item => {
                  return <Tag key={item.unionId} className="m-10 mr-10" text={item.categoryName} />
                })
              }
              <Tag className="tag-default m-10" text="添加舞种" onClick={this.onAddDance} />
            </CInputItem>
            <CInputItem label="简介" value={intro} onChange={(val) => { this.onChangeInput(val, 'intro') }} required placeholder="请输入您的的简介～" />
            <CInputItem label="地址" value={address} onChange={(val) => { this.onChangeInput(val, 'address') }} required placeholder="请输入您的地址～" />
            <CInputItem label="上传资料" required>
              <div className="upload-flex">
                <UploadBox className="m-10" />
                <UploadBox className="m-10 ml-10" />
              </div>
            </CInputItem>
            <SButton>
              保存
            </SButton>
          </Tabs.Item>
        </Tabs>
      
        {
          this.state.showDances ? (
            <div className="dances-dialog">
              <Dances 
                value={goodAtDancing} 
                onClose={this.onClose}
                onChange={(value) => { this.onChangeInput(value, 'goodAtDancing') }} />
            </div>
          ) : null
        }
      </div>
    );
  }
}

const CInputItem = (props) => {
  const { label, children, required, placeholder, value, onChange } = props;

  return (
    <div className="input-item-container">
      <label>
        { label }
        {
          required ? <span> *</span> : null
        }
      </label>
      {
        children ? children : <InputItem value={value} onChange={onChange} placeholder={placeholder} />
      }
    </div>
  );
}

const Tag = (props) => {
  const { text, className, onClick } = props;

  return (
    <div onClick={onClick} className={`tag-container ${className}`}>{ text }</div>
  );
}

const UploadBox = (props) => {
  const { className } = props;

  return (
    <div className={`upload-box-container ${className}`}>
      <img className="upload-box-img" src={upload1} />
    </div>
  );
}

const SButton = (props) => {
  const { children } = props;

  return (
    <div className="s-button-container">{ children }</div>
  );
}

export default StartCertification;