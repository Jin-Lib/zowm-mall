import React, { PureComponent, useState, useEffect } from 'react';
import { Toast } from 'antd-mobile';

import request from '../../utils/http'

import { getQueryString } from '../../utils/common'

import { formatHtml } from '../../utils'
import config from '../../utils/config'

import Carousel from '../../components/Carousel'
import GoodsBottom from '../../components/GoodsBottom'

import './index.scss';

class GoodsDetails extends PureComponent {
    constructor(props) {

        super(props);

        // const { location: { state: { prodId } } } = props;

        let prodId = getQueryString('id') || ((props.location || {}).state || {}).prodId

        this.state = {
            prodId: prodId, // 参数传入的商品信息
            shopId: 1,
            picDomain: config.picDomain,
            indicatorDots: true,
            indicatorColor: '#f2f2f2',
            indicatorActiveColor: '#eb2444',
            autoplay: true,
            interval: 3000,
            duration: 1000,
            prodNum: 1,
            totalCartNum: 0,
            pic: "",
            imgs: '',
            prodName: '',
            price: 0,
            content: '',
            brief: '',
            skuId: 0,
            popupShow: false,
            // 是否获取过用户领取过的优惠券id
            loadCouponIds: false,
            skuShow: false,
            commentShow: false,
            couponList: [],
            skuList: [],
            skuGroup: {},
            findSku: true,
            defaultSku: undefined,
            selectedProp: [],
            selectedPropObj: {},
            propKeys: [],
            allProperties: [],
            prodCommData: {},
            prodCommPage: {
                current: 0,
                pages: 0,
                records: []
            },
            littleCommPage: [],
            evaluate: -1,
            isCollection: false,
            transName: '', // 是否包邮
        }
    }

    componentDidMount() {
        // 请求商品信息
        this.getProdInfo();
    }

    /**
     * 获取商品信息
     * @date 2020-06-15
     * @returns {any}
     */
    getProdInfo = () => {
        const { prodId } = this.state;

        Toast.loading('正在努力加载中..', 0);
        const params = {
            url: `/prod/prodInfo`,
            method: "GET",
            data: {
                prodId: prodId,
            },
        };
        request(params)
            .then(res => {
                console.log('res', res)
                Toast.hide();
                const imgStrs = res.imgs;
                const imgs = imgStrs.split(",");
                const content = formatHtml(res.content);
                this.setState({
                    imgs: imgs,
                    content: content,
                    price: res.price,
                    prodName: res.prodName,
                    prodId: res.prodId,
                    brief: res.brief,
                    // skuId: res.skuId,
                    skuList: res.skuList,
                    pic: res.pic,
                    transName: (res.transport || {}).transName,
                    payType: res.payType
                });
                // 获取优惠券
                //this.getCouponList();
                // 组装sku
                this.groupSkuProp(res.skuList);
            })
            .catch(() => {
                Toast.hide();
            })
    }

    /**
     * 根据skuList进行数据组装
     * @date 2020-06-15
     * @param {any} skuList
     * @returns {any}
     */
    groupSkuProp = (skuList) => {

        const { defaultSku, selectedPropObj, price } = this.state;

        //当后台返回只有一个SKU时，且SKU属性值为空时，即该商品没有规格选项，该SKU直接作为默认选中SKU
        if (skuList.length == 1 && skuList[0].properties == "") {
            this.setState({
                defaultSku: skuList[0]
            })
            return;
        }

        const skuGroup = {}; //所有的规格名(包含规格名下的规格值集合）对象，如 {"颜色"：["金色","银色"],"内存"：["64G","256G"]}
        const allProperties = []; //所有SKU的属性值集合，如 ["颜色:金色;内存:64GB","颜色:银色;内存:64GB"]
        const propKeys = [];//所有的规格名集合，如 ["颜色","内存"]

        for (let i = 0; i < skuList.length; i++) {

            //找到和商品价格一样的那个SKU，作为默认选中的SKU
            let isDefault = false;
            if (!defaultSku && skuList[i].price == price) {
                isDefault = true;
                this.setState({
                    defaultSku: skuList[i]
                });
            }

            const properties = skuList[i].properties; //如：版本:公开版;颜色:金色;内存:64GB
            allProperties.push(properties);
            const propList = properties.split(";"); // 如：["版本:公开版","颜色:金色","内存:64GB"]

            for (var j = 0; j < propList.length; j++) {

                const propval = propList[j].split(":"); //如 ["版本","公开版"]
                let props = skuGroup[propval[0]]; //先取出 规格名 对应的规格值数组

                //如果当前是默认选中的sku，把对应的属性值 组装到selectedProp
                if (isDefault) {
                    propKeys.push(propval[0]);
                    selectedPropObj[propval[0]] = propval[1];
                }

                if (props == undefined) {
                    props = []; //假设还没有版本，新建个新的空数组
                    props.push(propval[1]); //把 "公开版" 放进空数组
                } else {
                    if (!this.array_contain(props, propval[1])) { //如果数组里面没有"公开版"
                        props.push(propval[1]); //把 "公开版" 放进数组
                    }
                }
                skuGroup[propval[0]] = props; //最后把数据 放回版本对应的值
            }
            console.log('在这里更新了一次')
            this.setState({
                selectedPropObj: selectedPropObj,
                propKeys: propKeys
            });
        }
        this.parseSelectedObjToVals();
            
        this.setState({
            skuGroup: skuGroup,
            allProperties: allProperties
        });
    }

    //将已选的 {key:val,key2:val2}转换成 [val,val2]
    parseSelectedObjToVals = () => {
        let selectedPropObj = this.state.selectedPropObj;
        let selectedProperties = "";
        let selectedProp = [];
        for (let key in selectedPropObj) {
            selectedProp.push(selectedPropObj[key]);
            selectedProperties += key + ":" + selectedPropObj[key] + ";";
        }
        selectedProperties = selectedProperties.substring(0, selectedProperties.length - 1);
        this.setState({
            selectedProp: selectedProp
        });

        let findSku = false;
        for (var i = 0; i < this.state.skuList.length; i++) {
            if (this.state.skuList[i].properties == selectedProperties) {
                findSku = true;
                this.setState({
                    defaultSku: this.state.skuList[i],
                });
                break;
            }
        }
        this.setState({
            findSku: findSku
        });
    }

    //判断数组是否包含某对象
    array_contain = (array, obj) => {
        for (var i = 0; i < array.length; i++) {
        if (array[i] == obj) //如果要求数据类型也一致，这里可使用恒等号===
            return true;
        }
        return false;
    }

    showSku = () => {
        this.setState((state) => {
            return {
                skuShow: !state.skuShow
            }
        })
    }

    //点击选择规格
    toChooseItem = e => {
        let val = e.currentTarget.dataset.val;
        let key = e.currentTarget.dataset.key;
        let selectedPropObj = this.state.selectedPropObj;
        selectedPropObj[key] = val;
        this.setState({
            selectedPropObj: selectedPropObj
        });
        this.parseSelectedObjToVals();
    }

    /**
     * 当前规格值是否可以选择
     *
     * 参数说明：
     * @param allProperties  ['颜色:金色;内存:64GB','颜色:金色;内存:256GB']
     * @param selectedPropObj {'颜色':'金色','内存':'64GB'}
     * @param propKeys ['颜色','内存']
     * @param key 颜色
     * @param item 金色
     *
     * @return 0 可选但跟其他值不匹配  1 可选
     */
    props_contain = (allProperties, selectedPropObj, key, item, propKeys) => {
        var properties = ''
        let copySelectedPropObj = {...selectedPropObj}
        copySelectedPropObj[key] = item
        for (var j = 0; j < propKeys.length; j++) {
          properties += propKeys[j] + ':' + copySelectedPropObj[propKeys[j]] + ';'
        }
        properties = properties.substring(0, properties.length - 1)
        for (var i = 0; i < allProperties.length; i++) {
            if (properties.includes(allProperties[i])) {
                return 1
            }
        }
        return 0
    }

    /**
     * 减数量
     */
    onCountMinus = () => {
        let prodNum = this.state.prodNum;
        if (prodNum > 1) {
            this.setState({
                prodNum: prodNum - 1
            });
        }
    }

    /**
     * 加数量
     */
    onCountPlus = () => {
        let prodNum = this.state.prodNum;
        if (prodNum < 1000) {
            this.setState({
                prodNum: prodNum + 1
            });
        }
    }

    /**
     * 加入购物车
     */
    addToCart = (event) => {
        if (!this.state.findSku) {
            return;
        }
        let ths = this;
        Toast.loading('', 0);
        var params = {
            url: "/p/shopCart/changeItem",
            method: "POST",
            data: {
                basketId: 0,
                count: this.state.prodNum,
                prodId: this.state.prodId,
                shopId: this.state.shopId,
                skuId: this.state.defaultSku.skuId
            }
        };
        request(params)
            .then(() => {
                ths.setState({
                    totalCartNum: ths.state.totalCartNum + ths.state.prodNum
                });
                Toast.hideLoading();
                Toast.info("加入购物车成功")
            })
            .catch((error) => {
                const { data } = error;
                const { error: errMsg } = data || {};
                Toast.info("加入购物车失败 :" + errMsg)
            })
    }

    /**
     * 立即购买
     */
    buyNow = () => {
        const { history } = this.props;
        const {
            findSku, prodId, defaultSku, prodNum, shopId,
            payType,
        } = this.state;
        if (!findSku) {
            return;
        }
        window.localStorage.setItem("orderItem", JSON.stringify({
            prodId: prodId,
            skuId: defaultSku.skuId,
            prodCount: prodNum,
            shopId: shopId
        }));

        history.push(`/submitOrders?payType=${payType}`)

        // browserHistory.push('')
        // 跳转至购物页面，
        // wx.navigateTo({
        // url: '/pages/submit-order/submit-order?orderEntry=1',
        // })
    }

    render() {
        const {
            imgs, prodName, price, brief, selectedProp, prodNum,
            content, skuShow, defaultSku, pic, findSku, skuGroup,
            allProperties, selectedPropObj, propKeys, transName,
            prodId,
        } = this.state;

        const handleClassName = (listItem, item) => {
            let result = '';
            result += ' ' + (this.array_contain(selectedProp,item) ? 'active' : '')
            result += ' ' + (['dashed',''][this.props_contain(allProperties,selectedPropObj,listItem,item,propKeys)])
            return result
        }

        return (<div className="goods-details">
            <Carousel data={imgs}/>
            <div className="goods-details-info">
                <h6 className="goods-details-info-price"><span>¥ </span>{price}</h6>
                <p className="goods-details-info-name">{prodName}</p>
                <p className="goods-details-info-desc">{brief}</p>
            </div>
            <div
                className="goods-details-send goods-detail-item"
                onClick={this.showSku}>
                <span className="goods-details-send-label">已选</span>
                <span className="goods-details-send-address">{selectedProp.length>0?selectedProp+'，':selectedProp}{prodNum}件  {transName}</span>
            </div>
            <div className="goods-details-goodsDetail-desc">
                <p className="goods-details-goodsDetail-desc-title">宝贝详情</p>
                <div className="goods-details-goodsDetail-desc-container" dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            <GoodsBottom buyNow={this.showSku} prodId={prodId} />
            {
                skuShow ?
                    (<div id="sku">
                        <div className="sku-mask" onClick={this.showSku}/>
                        <div className="sku-content-box">
                            <div className="sku-goods-info">
                                <img src={(defaultSku && defaultSku.pic)?defaultSku.pic:pic} alt=""/>
                                {
                                    findSku
                                        ?  (
                                            <div className="sku-goods-info-box">
                                                <div className="sku-goods-info-box-price"><span>¥</span> {defaultSku.price}</div>
                                                <div className="sku-goods-info-box-stocks">{selectedProp.length>0?selectedProp+'，':selectedProp}{prodNum}件</div>
                                                {/* {stocks !== 0 ? <div className="sku-goods-info-box-stocks">库存{}件</div> : null} */}
                                                {/* {selectDefaultValue ? (<p className="sku-goods-info-box-select">请选择: {selectDefaultValue}</p>) : null} */}
                                            </div>
                                        )
                                        : (<div className="sku-goods-info-box">
                                            <div className="sku-goods-info-box-price">无货</div>
                                        </div>)
                                }
                                
                            </div>
                            <div className="sku-list">
                                {
                                    Object.keys(skuGroup).map((listItem, listIndex) => {
                                        return (<div className="sku-list-item-box" key={listIndex}>
                                            <h6>{listItem}</h6>
                                            <ul>
                                                {
                                                    skuGroup[listItem].map((item, index) => {
                                                        return (
                                                        <li
                                                            className={handleClassName(listItem, item)}
                                                            onClick={this.toChooseItem}
                                                            data-key={listItem}
                                                            data-val={item}
                                                            key={index}>
                                                            {item}
                                                        </li>)
                                                    })
                                                }
                                            </ul>
                                        </div>)
                                    })
                                }
                            </div>
                            <div className="sku-count">
                                <h6>数量</h6>
                                <div className="sku-count-op">
                                    <div className="sku-count-op-item sku-count-op-minus" onClick={this.onCountMinus}>-</div>
                                    <div className="sku-count-op-item sku-count-op-count">{prodNum}</div>
                                    <div className="sku-count-op-item sku-count-op-plus" onClick={this.onCountPlus}>+</div>
                                </div>
                            </div>
                            <div className={findSku ? "sku-footer-buttonGroup" : "sku-footer-buttonGroup-disabled"}>
                                {/* <button onClick={this.addToCart}>加入购物车</button> */}
                                <button onClick={this.buyNow}>立即购买</button>
                            </div>
                        </div>
                    </div>)
                    : null
            }
        </div>)
    }
}

export default GoodsDetails