import React, { PureComponent } from 'react'

import { PickerView, Modal, InputItem } from 'antd-mobile';

import { PageTitle } from '../../../components'

import { ItemDetail } from './components'

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
      value: '男',
    },
    {
      label: '女',
      value: '女',
    },
];

class MyData extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            nick: '时间管理',
            sex: '男',
            sexModelFlag: false,
            sexSelectValue: ['男'],
            phone: null,
            danceTypes: ['维也纳华尔兹', '维也纳华尔兹', '维也纳华尔兹'],
        }
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
    
    render() {
        const {
            nick, sex, sexModelFlag, sexSelectValue,
            phone, danceTypes
        } = this.state;

        return (<div className="my-data-page">
            <PageTitle title="我的资料" shadow />
            <div className="my-data-page-body">
                <ItemDetail title="头像">
                    <img className="my-data-page-body-av" src="" alt=""/>
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
                        <span>{sex}</span>
                        <svg t="1593074083827" className="my-data-page-body-icon-right" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2111"><path d="M517.437 662.92l374.767-374.767c12.496-12.497 32.758-12.497 45.255 0 12.496 12.497 12.496 32.758 0 45.255l-403.051 403.05c-12.497 12.497-32.758 12.497-45.255 0L86.102 333.409c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.497 45.255 0l374.766 374.766a8 8 0 0 0 11.314 0z" p-id="2112" fill="#515151"></path></svg>
                    </div>
                </ItemDetail>
                <ItemDetail title="联系方式">
                    <InputItem
                        className="my-data-page-body-phone"
                        type="phone"
                        value={phone}
                        onChange={this.setPhone}
                        placeholder="请填写您的联系方式～" />
                </ItemDetail>
                <ItemDetail title="擅长舞种">
                    <div className="my-data-page-body-dance-box">
                        <ul className="my-data-page-body-dance">
                            {
                                danceTypes && Array.isArray(danceTypes) && danceTypes.length > 0
                                    ? danceTypes.map(danceItem => {
                                        return <li>{danceItem}</li>
                                    })
                                    : null
                            }
                            <li className="my-data-page-body-dance-add">添加舞种</li>
                        </ul>
                    </div>
                </ItemDetail>
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