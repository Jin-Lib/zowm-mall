import React, { Component } from 'react';
import Tabs from '../../components/Tabs'
import { InputItem } from 'antd-mobile';
import './index.scss';
import { upload1 } from '../../assets/imgs';

class StartCertification extends Component {

  render() {

    return (
      <div className="start-certification-container">
        <Tabs>
          <Tabs.Item title="学校/机构">
            <CInputItem label="机构名称" required placeholder="请输入您的机构名称～" />
            <CInputItem label="姓名" required placeholder="请输入您的姓名～" />
            <CInputItem label="联系电话" required placeholder="请输入您的联系方式～" />
            <CInputItem label="微信号" required placeholder="请输入您的微信号～" />
            <CInputItem label="擅长舞种" required>
              <Tag className="m-10 mr-10" text="维也纳华尔兹" />
              <Tag className="tag-default m-10" text="添加舞种" />
            </CInputItem>
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
            <CInputItem label="姓名" required placeholder="请输入您的姓名～" />
            <CInputItem label="联系电话" required placeholder="请输入您的联系方式～" />
            <CInputItem label="微信号" required placeholder="请输入您的微信号～" />
            <CInputItem label="所属机构" required placeholder="请选择所属机构～" />
            <CInputItem label="擅长舞种" required>
              <Tag className="m-10 mr-10" text="维也纳华尔兹" />
              <Tag className="tag-default m-10" text="添加舞种" />
            </CInputItem>
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
      </div>
    );
  }
}

const CInputItem = (props) => {
  const { label, children, required, placeholder } = props;

  return (
    <div className="input-item-container">
      <label>
        { label }
        {
          required ? <span> *</span> : null
        }
      </label>
      {
        children ? children : <InputItem placeholder={placeholder} />
      }
    </div>
  );
}

const Tag = (props) => {
  const { text, className } = props;

  return (
    <div className={`tag-container ${className}`}>{ text }</div>
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