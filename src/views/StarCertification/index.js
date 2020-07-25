import React, { Component } from 'react';
import { UploadImg, Notification, Tabs, Upload } from '../../components';
import { InputItem, Toast, List, Radio, Modal } from 'antd-mobile';
import './index.scss';
import { upload1 } from '../../assets/imgs';
import request from '../../utils/http-app'
import Dances from '../Dances';
import { generateUUID } from '../../utils/common';

const RadioItem =  Radio.RadioItem;

class StartCertification extends Component {

  state = {
    detail: '',
    // 机构
    institutions: {
      "identityType": 1,    // 认证类型 1:机构  2:导师
      "address": "",        // 地址
      "categoryDtoList": [],  // 擅长舞种
      "intro": "",          // 简介
      "objectLogo": "",     // 机构Logo或者导师头像
      "objectName": "",     // 机构名称或者导师名称
      "qualificationsUrl": "",
      "replayPhone": "",    // 申请人电话号
      "replayRealName": "", // 申请人真实名称
      "replayWechat": "",   // 申请人微信号
      "tutorOrganId": '',   // 所属机构
      "replayEMail": "",     // 申请人邮箱
      "rganTutorList": [], // 申请机构列表
      "selectRganTutorModalFlag": false, // 申请机构列表modal
      "currentRganTutorName": '', // 当前申请机构的名称
    },

    // 资料1
    photo1: '',

    showDances: false
  }

  API = {
    'getOrganTutorDetail': '/app/organTutor/getApplyOrganTutor',
    // 上传认证
    'applyOrganTutor': '/app/organTutor/applyOrganTutor',
    // 取消资质申请
    'cancelApplyOrganTutor': '/app/organTutor/cancelApplyOrganTutor',
    // 获取所属机构
    'getOrganTutorList': '/app/organTutor/getOrganTutorList',
  };

  getOrganTutorDetail = () => {
    let params = {
      url: this.API.getOrganTutorDetail,
      method: "GET",
      data: {}
    };

    Toast.loading('请求中', 0);
    request(params)
      .then((res) => {
        const {} = res || {};
        this.setState({
          detail: res || {},
          institutions: res,
          photo1: res.objectLogo,
          photo2: res.qualificationsUrl,
        });
        Toast.hide();
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg || "获取失败")
      })
  }

  // 获取七牛上传凭证
  createQiNiuUploadToken = () => {
    let params = {
      url: this.API.createQiNiuUploadToken,
      method: "POST",
      data: {
        fileName: '23243542djksje3332.png',
        uploadType: 10
      }
    };

    Toast.loading('请求中', 0);
    request(params)
      .then((res) => {
        
        Toast.hide();
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg)
      })
  }

  // 提交申请机构信息
  applyOrganTutor = () => {
    const { institutions } = this.state;
    let params = {
      url: this.API.applyOrganTutor,
      method: "POST",
      data: {
        // ...institutions,
        identityType: 1,
        intro: institutions.intro,
        objectName: institutions.replayRealName,   //机构名称
        replayPhone: institutions.replayPhone,  // 申请人号码
        replayRealName: institutions.replayRealName, //申请人姓名
        replayWechat: institutions.replayWechat,   // 机构微信号
        address: institutions.address,    // 地址
        objectLogo: this.state.photo1,
        qualificationsUrl: this.state.photo2

      }
    };
    console.log(institutions);

    Toast.loading('请求中', 0);
    request(params)
      .then((res) => {
        
        Toast.hide();
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg || '操作失败')
      })
  }

  // 提交导师信息
  applyTutor = () => {
    const { institutions } = this.state;
    let params = {
      url: this.API.applyOrganTutor,
      method: "POST",
      data: {
        identityType: 2,
        intro: institutions.intro,
        objectName: institutions.objectName,   //机构名称
        replayPhone: institutions.replayPhone,  // 申请人号码
        replayRealName: institutions.objectName, //申请人姓名
        replayWechat: institutions.replayWechat,   // 机构微信号
        address: institutions.address,    // 地址
        tutorOrganId: institutions.tutorOrganId,  // 机构
        categoryDtoList: institutions.categoryDtoList,
        objectLogo: this.state.photo3,
        qualificationsUrl: this.state.photo4
      }
    };
    console.log(institutions);

    Toast.loading('请求中', 0);
    request(params)
      .then((res) => {
        
        Toast.hide();
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg || '操作失败')
      })
  }

  getQNSign = (suffix,width,height, extraParam) => {
    console.log(suffix, width, height, extraParam);
    let params = {
      url: this.API.createQiNiuUploadToken,
      method: "POST",
      data: {
        fileName: '',
        uploadType: 17
      }
    };

    return new Promise((resolve, reject)=>{
      request(params)
        .then((res) => {
          if(res) {
            this.key = res.keyPrefix + generateUUID() + '.' + suffix;
            this.setState({
              qnUploadConfig: {
                type: 'qiniu',
                imageUploadServerHost: res.uploadUrl,
                imageShowServiceHost: res.domain,
                totalNum: 1,
                maxSize: res.fileMaxSize / 1024,
                accept: res.fileType || "image/*"
              }
            });

            resolve({
              token: res.uptoken,
              key: this.key
            })
          }
        })
        .catch((error) => {
          const { data } = error;
          const { error: errMsg } = data || {};
          Toast.info(errMsg)
        })
    })
};

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

  /**
   * 取消 学校机构 申请
   * @date 2020-07-14
   * @returns {any}
   */
  cancelOrganTutor = () => {
    const { detail } = this.state;
    let params = {
      url: this.API.cancelApplyOrganTutor,
      method: "POST",
      data: {
        unionId: detail.unionId
      }
    };
    Toast.loading('请求中', 0);
    request(params)
      .then((res) => {
        Toast.info('取消成功');
        this.getOrganTutorDetail();
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg || '取消失败')
      })
  }

  /**
   * 获取所属机构
   * @date 2020-07-15
   * @returns {any}
   */
  getOrganization = () => {
    let params = {
      url: this.API.getOrganTutorList,
      method: "GET",
      data: {}
    };
    Toast.loading('请求中', 0);
    request(params)
      .then((res) => {
        console.log('res', res)
        this.setState({
          rganTutorList: res,
          selectRganTutorModalFlag: true,
        })
        Toast.hide();
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg || '获取失败')
      })
  }

  /**
   * 修改申请机构值
   * @date 2020-07-15
   * @returns {any}
   */
  rganTutorChange = value => {
    this.setState({
      currentRganTutor: value.unionId,
      currentRganTutorName: value.objectName,
      selectRganTutorModalFlag: false,
      institutions: Object.assign(this.state.institutions, {
        tutorOrganId: value.unionId,
        tutorOrganName: value.objectName,
      }),
    })
  }

  /**
   * 关闭选择申请机构 modal
   * @date 2020-07-15
   * @returns {any}
   */
  closeSelectRganTutorModal = () => {
    this.setState({
      selectRganTutorModalFlag: false
    })
  }

  render() {
    const {
      institutions, qnUploadConfig, notifyText, detail, rganTutorList, currentRganTutor,
      selectRganTutorModalFlag, currentRganTutorName
    } = this.state;
    const { objectName, replayRealName, replayPhone, replayWechat, intro, address, categoryDtoList = [], remark } = institutions;
    console.log('detail.status', detail.status)

    let notifyTextTip = ''
    if (detail.status === 1) {
      notifyTextTip = '审核中'
    } else if (detail.status === 2) {
      notifyTextTip = '审核成功'
    } else if (detail.status === 3) {
      notifyTextTip = '审核失败'
    }
    const tabsTip = notifyTextTip ? (<Notification text={notifyTextTip} />) : null

    return (
      <div className="start-certification-container">
        <Tabs tip={tabsTip}>
          <Tabs.Item title="学校/机构">
            <CInputItem label="机构名称" value={objectName} onChange={(val) => { this.onChangeInput(val, 'objectName') }} required placeholder="请输入您的机构名称～" />
            <CInputItem label="姓名" value={replayRealName} onChange={(val) => { this.onChangeInput(val, 'replayRealName') }} required placeholder="请输入您的姓名～" />
            <CInputItem label="联系电话" value={replayPhone} onChange={(val) => { this.onChangeInput(val, 'replayPhone') }} required placeholder="请输入您的联系方式～" />
            <CInputItem label="机构微信号" value={replayWechat} onChange={(val) => { this.onChangeInput(val, 'replayWechat') }} required placeholder="请输入微信号～" />
            <CInputItem label="简介" value={intro} onChange={(val) => { this.onChangeInput(val, 'intro') }} required placeholder="请输入机构的简介～" />
            <CInputItem label="地址" value={address} onChange={(val) => { this.onChangeInput(val, 'address') }} required placeholder="请输入机构地址～" />
            <CInputItem label="上传资料" required>
              <div className="upload-flex">
                {/* <UploadImg style={{ backgroundColor: 'red' }} getSign={this.getQNSign} {...(qnUploadConfig || {})} onChange={(values) => {
                  this.setState({
                    photo1: qnUploadConfig && this.key && (qnUploadConfig.imageShowServiceHost + this.key)
                  });
                }}>
                  <UploadBox className="m-10" src={this.state.photo1} />
                </UploadImg> */}
                <Upload
                  style={{ width: '4.4rem', height: '3.1rem' }}
                  onChange={(data) => {
                    this.setState({
                      key1: data.key,
                      photo1: data.url
                    });
                  }}
                >
                  <UploadBox className="m-10" src={this.state.photo1} />
                </Upload>

                
                <Upload
                  style={{ width: '4.4rem', height: '3.1rem' }}
                  onChange={(data) => {
                    this.setState({
                      key2: data.key,
                      photo2: data.url
                    });
                  }}
                >
                  <UploadBox className="m-10 ml-10" src={this.state.photo2}/>
                </Upload>
              </div>
            </CInputItem>
            {
              (detail.status === 1 || detail.status === 3)
                ? (<div className="two-button-container">
                  <button onClick={this.cancelOrganTutor}>取消</button>
                  <button onClick={this.applyOrganTutor}>修改</button>
                </div>)
                : <SButton onClick={this.applyOrganTutor}>
                  保存
                </SButton>
            }
          </Tabs.Item>
          <Tabs.Item title="KOL/个人领袖">
            <CInputItem label="姓名" value={objectName} onChange={(val) => { this.onChangeInput(val, 'objectName') }} required placeholder="请输入您的姓名～" />
            <CInputItem label="联系电话" value={replayPhone} onChange={(val) => { this.onChangeInput(val, 'replayPhone') }} required placeholder="请输入您的联系方式～" />
            <CInputItem label="微信号" value={replayWechat} onChange={(val) => { this.onChangeInput(val, 'replayWechat') }} required placeholder="请输入您的微信号～" />
            <CSelectItem
              label="所属机构"
              required
              placeholder="请选择所属机构～"
              onClick={this.getOrganization}
              value={currentRganTutorName} />
              {
                rganTutorList && rganTutorList.length > 0
                  ? (
                    <Modal
                      transparent
                      visible={selectRganTutorModalFlag}
                      onClose={this.closeSelectRganTutorModal}>
                      <List>
                        {rganTutorList.map(i => (
                          <RadioItem key={i.unionId} checked={currentRganTutor === i.unionId} onChange={() => this.rganTutorChange(i)}>
                            {i.objectName}
                          </RadioItem>
                        ))}
                      </List>
                    </Modal>
                  )
                  : []
              }
            <CInputItem label="擅长舞种" required>
              {
                categoryDtoList && categoryDtoList.length > 0 && categoryDtoList.map(item => {
                  return <Tag key={item.unionId} className="m-10 mr-10" text={item.categoryName} />
                })
              }
              <Tag className="tag-default m-10" text="添加舞种" onClick={this.onAddDance} />
            </CInputItem>
            <CInputItem label="简介" value={intro} onChange={(val) => { this.onChangeInput(val, 'intro') }} required placeholder="请输入您的的简介～" />
            <CInputItem label="地址" value={address} onChange={(val) => { this.onChangeInput(val, 'address') }} required placeholder="请输入您的地址～" />
            <CInputItem label="上传资料" required>
              <div className="upload-flex">
                <Upload
                  style={{ width: '4.4rem', height: '3.1rem' }}
                  onChange={(data) => {
                    this.setState({
                      key3: data.key,
                      photo3: data.url
                    });
                  }}
                >
                  <UploadBox className="m-10" src={this.state.photo3} />
                </Upload>
                <Upload
                  style={{ width: '4.4rem', height: '3.1rem' }}
                  onChange={(data) => {
                    this.setState({
                      key4: data.key,
                      photo4: data.url
                    });
                  }}
                >
                  <UploadBox className="m-10 ml-10" src={this.state.photo4} />
                </Upload>
              </div>
            </CInputItem>
            {
              (detail.status === 1 || detail.status === 3)
                ? (<div className="two-button-container">
                  <button onClick={this.cancelOrganTutor}>取消</button>
                  <button onClick={this.applyTutor}>修改</button>
                </div>)
                : <SButton onClick={this.applyTutor}>
                  保存
                </SButton>
            }
          </Tabs.Item>
        </Tabs>
      
        {
          this.state.showDances ? (
            <div className="dances-dialog">
              <Dances 
                value={categoryDtoList} 
                onClose={this.onClose}
                onChange={(value) => { this.onChangeInput(value, 'categoryDtoList') }} />
            </div>
          ) : null
        }
      </div>
    );
  }

  componentDidMount() {
    this.getOrganTutorDetail();
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

const CSelectItem = (props) => {
  const { label, children, required, placeholder, value, onChange, onClick } = props;

  return (
    <div className="input-item-container">
      <label>
        { label }
        {
          required ? <span> *</span> : null
        }
      </label>
      {
        children ? children : <InputItem value={value} onClick={onClick} placeholder={placeholder} />
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
  const { className, src } = props;

  return (
    <div className={`upload-box-container ${className}`}>
      <img className="upload-box-img" src={src || upload1} />
    </div>
  );
}

const CButton = (props) => {
  const { children, onClick } = props;
  return (
    <div className="s-button-container" onClick={onClick}>{ children }</div>
  );
}

const SButton = (props) => {
  const { children, onClick } = props;

  return (
    <div className="s-button-container" onClick={onClick}>{ children }</div>
  );
}

export default StartCertification;