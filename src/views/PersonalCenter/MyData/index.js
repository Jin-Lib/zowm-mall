import React, { PureComponent, createRef } from 'react'

import { findDOMNode } from 'react-dom'

import { PickerView, Modal, InputItem, Toast, ImagePicker } from 'antd-mobile';

import { PageTitle, CButton, Upload } from '../../../components'

import { ItemDetail } from './components'

import { httpApp as request } from '../../../utils'

import Dances from '../../Dances';

import './index.scss'

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
}

const season = [
    {
      label: '男',
      value: '1',
    },
    {
      label: '女',
      value: '2',
    },
];

const alert = Modal.alert;

class MyData extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            nick: '',
            userHeadPic: '',
            sex: '',
            sexModelFlag: false,
            sexSelectValue: [],
            phone: null,
            danceTypes: [],
            dancesDialogShow: false,
            selectDances: [],
        }

        this.danceTypeWrapRef = createRef();
        this.danceTypeBoxRef = createRef();
        this.imgUpload = createRef();
    }

    componentDidMount() {
        const { current: danceTypeWrapRef } = this.danceTypeWrapRef;
        const { current: danceTypeBoxRef } = this.danceTypeBoxRef;
        const { width: danceTypeWrapWidth } = danceTypeWrapRef.getBoundingClientRect()
        danceTypeBoxRef.scrollTo(danceTypeWrapWidth, 0)

        this.getAppUserDto()
    }

    /**
     * 获取用户信息
     * @date 2020-07-04
     * @returns {any}
     */
    getAppUserDto = () => {
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/userCenter/getAppUserDto',
            method: "GET",
        }
        request(params)
            .then(response => {
                Toast.hide()
                const { userNickName, userHeadPic, phone, categoryDtoList, gender } = response
                this.setState({
                    nick: userNickName,
                    userHeadPic,
                    phone,
                    danceTypes: categoryDtoList,
                    sexSelectValue: [gender],
                    sex: [gender],
                    selectDances: categoryDtoList,
                })
            })
            .catch(error => {
                const { data } = error;
                const { error: errMsg } = data || {};
                Toast.info(errMsg || "当前网络异常, 请稍后重试!")
            })
    }
    
    /**
     * 设置电话
     * @date 2020-06-25
     * @returns {any}
     */
    setPhone = (phone) => {
        this.setState({
            phone
        })
    }

    /**
     * 输入昵称
     * @date 2020-06-25
     * @param {any} e
     * @returns {any}
     */
    nickName = (name) => {
        this.setState({
            nick: name
        })
    }

    selectSex = () => {
        // 打开性别弹窗
        this.setState({
            sexModelFlag: true
        })
    }

    /**
     * 关闭性别选择弹窗
     * @date 2020-06-25
     * @returns {any}
     */
    CloseSexModel = () => {
        console.log('close')
        this.setState({
            sexModelFlag: false
        })
    }

    /**
     * 选择性别
     * @date 2020-06-25
     * @returns {any}
     */
    sexSelectPicker = (val) => {
        this.setState({
            sexSelectValue: val
        })
    }

    /**
     * 确认性别的选择
     * @date 2020-06-25
     * @returns {any}
     */
    sexSelectCheck = () => {
        this.setState((state) => {
            return {
                sex: state.sexSelectValue,
                sexModelFlag: false,
            }
        })
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
          return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
          e.preventDefault();
        }
    }

    getSex = () => {
        const { sex } = this.state;
        let result = ''
        if (season.filter(item => item.value == sex[0]).length > 0) {
            result = season.filter(item => item.value == sex[0])[0].label
        }
        return result;
    }

    /**
     * 修改个人信息
     * @date 2020-07-04
     * @returns {any}
     */
    updateAppUser = () => {
        const { nick, phone, sex, selectDances, userHeadPic } = this.state;
        console.log('nick, phone, sex', nick, phone, sex, selectDances)
        const requestParams = {
            userNickName: nick,
            phone,
            gender: sex[0],
            "userHeadPic": userHeadPic,
            "categoryDtoList": selectDances,
        }
        Toast.loading('请求中', 0);
        const params = {
            url: '/app/userCenter/updateAppUser',
            method: "POST",
            data: requestParams,
        }
        request(params)
            .then(response => {
                Toast.hide()
            })
            .catch(error => {
                const { data } = error;
                const { error: errMsg } = data || {};
                Toast.info(errMsg || "当前网络异常, 请稍后重试!")
            })
    }

    /**
     * 添加舞种
     * @date 2020-07-08
     * @returns {any}
     */
    addDancesClick = () => {
        this.setState({
            dancesDialogShow: true
        })
    }

    /**
     * 关闭添加舞种model
     * @date 2020-07-08
     * @returns {any}
     */
    closeDancesSelect = () => {
        this.setState({
            dancesDialogShow: false
        })
    }

    /**
     * 选择舞种
     * @date 2020-07-08
     * @returns {any}
     */
    selectDancesValues = value => {
        console.log('value', value)
        this.setState({
            selectDances: value,
            danceTypes: value,
        })
    }
    
    render() {
        const {
            nick, sex, sexModelFlag, sexSelectValue,
            phone, danceTypes, userHeadPic, dancesDialogShow,
            selectDances,
        } = this.state;

        return (<div className="my-data-page">
            <PageTitle
                title="我的资料" shadow />
            <div className="my-data-page-body">
                <ItemDetail title="头像">
                    <ImagePicker
                        style={{ display: 'none' }}
                        ref={this.imgUpload} />
                    <Upload
                        style={{ width: '1.173333rem', height: '1.173333rem' }}
                        onChange={(data) => {
                            this.setState({
                                userHeadPic: data.url
                            })
                        }}
                    >
                        <img className="my-data-page-body-av" src={userHeadPic} alt=""/>
                    </Upload>
                    
                </ItemDetail>
                <ItemDetail title="昵称">
                    <InputItem
                        className="my-data-page-body-name"
                        type="text"
                        value={nick}
                        onChange={this.nickName} />
                </ItemDetail>
                <ItemDetail title="性别">
                    <div
                        className="my-data-page-body-sex-box"
                        onClick={this.selectSex}>
                        <span>{this.getSex()}</span>
                        <svg t="1593074083827" className="my-data-page-body-icon-right" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2111"><path d="M517.437 662.92l374.767-374.767c12.496-12.497 32.758-12.497 45.255 0 12.496 12.497 12.496 32.758 0 45.255l-403.051 403.05c-12.497 12.497-32.758 12.497-45.255 0L86.102 333.409c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.497 45.255 0l374.766 374.766a8 8 0 0 0 11.314 0z" p-id="2112" fill="#515151"></path></svg>
                    </div>
                </ItemDetail>
                <ItemDetail title="联系方式">
                    <InputItem
                        className="my-data-page-body-phone"
                        value={phone}
                        onChange={this.setPhone}
                        placeholder="请填写您的联系方式～" />
                </ItemDetail>
                <ItemDetail title="感兴趣舞种">
                    <div
                        className="my-data-page-body-dance-box"
                        ref={this.danceTypeBoxRef} >
                        <ul
                            className="my-data-page-body-dance"
                            ref={this.danceTypeWrapRef} >
                            {
                                danceTypes && Array.isArray(danceTypes) && danceTypes.length > 0
                                    ? danceTypes.map((danceItem, danceKey) => {
                                        return <li key={danceKey}>{danceItem.categoryName}</li>
                                    })
                                    : null
                            }
                            <li
                                className="my-data-page-body-dance-add"
                                onClick={this.addDancesClick}>
                                添加舞种
                            </li>
                        </ul>
                    </div>
                </ItemDetail>
                <CButton
                    className="my-data-page-confirm-button"
                    onClick={this.updateAppUser}>
                    确认
                </CButton>
                {
                    dancesDialogShow
                        ? (<div className="dances-dialog">
                            <Dances 
                                value={selectDances}
                                onClose={this.closeDancesSelect}
                                onChange={this.selectDancesValues}
                            />
                        </div>)
                        : null
                }
                <Modal
                    visible={sexModelFlag}
                    transparent
                    onClose={this.CloseSexModel}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    wrapClassName="sex-modal"
                    >
                    <div className="sex-modal-title">
                        <h6>性别选择</h6>
                        <img onClick={this.CloseSexModel} src={require('../../../assets/imgs/close.png')} alt=""/>
                    </div>
                    <PickerView
                        cols="1"
                        prefixCls="sex-piacker"
                        pickerPrefixCls="sex-piacker-col"
                        itemStyle={{ height: '1.333333rem', lineHeight: '1.333333rem', }}
                        data={season}
                        value={sexSelectValue}
                        onChange={this.sexSelectPicker}
                    />
                    <div
                        className="sex-modal-ok"
                        onClick={this.sexSelectCheck}
                    >
                        确认
                    </div>
                </Modal>
            </div>
        </div>)
    }
}

export default MyData