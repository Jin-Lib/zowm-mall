import React, { useState, useEffect } from 'react';
import './index.scss';

const handleSkuList = (skuList) => {
    const skyData = {};
    skuList.forEach(item => {
        let skuProps = item.properties.split(';');
        // 取类型
        skuProps.forEach(skuPropItem => {
            let skuPropItemSplit = skuPropItem.split(':')
            let skuPropItemName = skuPropItemSplit[0];
            let skuPropItemValue = skuPropItemSplit[1];
            if (!skyData[skuPropItemName]) {
                skyData[skuPropItemName] = [skuPropItemValue];
            } else {
                if (!skyData[skuPropItemName].includes(skuPropItemValue)) {
                    skyData[skuPropItemName].push(skuPropItemValue);
                }
            }
        })
    })
    return skyData;
}

const handleSkuData = (skuList) => {
    const skyData = {};
    skuList.forEach(item => {
        let skuProps = item.properties.split(';');
        // 取类型
        skuProps.forEach(skuPropItem => {
            let skuPropItemSplit = skuPropItem.split(':')
            let skuPropItemName = skuPropItemSplit[0];
            if (!skyData[skuPropItemName]) {
                skyData[skuPropItemName] = {};
            }
        })
        // 取第一层值
        skuProps.forEach((skuPropItem, skuPropIndex) => {
            let skuPropItemSplit = skuPropItem.split(':')
            let skuPropItemName = skuPropItemSplit[0];
            let skuPropItemValue = skuPropItemSplit[1];
            if (!skyData[skuPropItemName][skuPropItemValue]) {
                skyData[skuPropItemName][skuPropItemValue] = [];
            }
            let target = skyData[skuPropItemName][skuPropItemValue];
            // 取第二层值
            skuProps.forEach((skuPropSubItem, skuPropSubIndex) => {
                let skuPropSubItemSplit = skuPropSubItem.split(':')
                let skuPropItemSubName = skuPropSubItem[0];
                let skuPropItemSubValue = skuPropSubItemSplit[1];
                if (skuPropItemValue !== skuPropItemSubValue) {
                    !target.includes(skuPropItemSubValue) && target.push(skuPropItemSubValue)
                }
            })
        })
    })
    return skyData;
}

function Sku({ visible, data }) {

    const [isShow, setIsShow] = useState(visible);

    const [skuResult, setSkuResult] = useState(handleSkuData(data));

    const [skuListData, setSkuListData] = useState(handleSkuList(data));

    const [defaultImg, setCurrentImg] = useState(data[0].pic)

    const [currentIndex, setCurrentIndex] = useState({});

    const [selectDefaultValue, SetSelectDefauleValue] = useState(Object.keys(skuListData).join(','));

    const [currenSkuValue, setCurrenSkuValue] = useState({});

    const [stocks, setStocks] = useState(0); // 库存

    const [skuValue, setSkuValue] = useState(); // 最后选中的sku结果

    const [skuItemClickFlag, setSkuItemClickFlag] = useState(false);

    const [listIndex, setListIndex] = useState(-1);
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        setIsShow(visible)
    }, [visible])

    useEffect(() => {
        setStocks(0); // 重置库存

        setCurrenSkuValue('');

        SetSelectDefauleValue('');

        setSkuValue('');

        let skuDataKey = Object.keys(skuListData);
        let focusKey = skuDataKey[listIndex];
        let skyListDataKeys = Object.keys(skuListData);
        setCurrenSkuValue((state) => {
            let value = {}
            for (let i in currentIndex) {
                value[skuDataKey[i]] = skuListData[skuDataKey[i]][index]
            }
            // 处理库存
            const valueKey = Object.keys(value);
            let str = "";
            Object.keys(skuListData).forEach(item => {
                if (!valueKey.includes(item)) {
                    str += item + ',';
                }
            })
            SetSelectDefauleValue(str)
            // 处理价格
            let skuValue = [];
            for (let i in value) {
                skuValue[skyListDataKeys.findIndex(item => item === i)] = `${i}:${value[i]};`
            }
            let skuValueFormaterr = skuValue.join('').slice(0, -1);
            setSkuValue(skuValueFormaterr)
            data.forEach(dataItem => {
                if (dataItem.properties === skuValueFormaterr) {
                    setStocks(dataItem.stocks);
                }
            })
            return value;
        })
    }, [skuItemClickFlag])

    const skuItemCick = (item, listIndex, index) => {
        let skyListDataKeys = Object.keys(skuListData);
        let skuDataKey = Object.keys(skuListData);
        let currentSelectSkuValue = skuListData[skyListDataKeys[listIndex]][index]
        
        for (let i in currentIndex) {
            for (let j in skuResult) {
                if (skuResult[j][currenSkuValue[skuDataKey[i]]]) {
                    if (!skuResult[j][currenSkuValue[skuDataKey[i]]].includes(currentSelectSkuValue)) {
                        // console.log(j)
                        // if (!Object.keys(skuResult[j]).includes(currentSelectSkuValue)) {
                        //     console.log('?')
                        //     return;
                        // }
                        return;
                    }
                }
            }
        }

        setListIndex(listIndex)

        setIndex(index)

        setSkuItemClickFlag(flag => !flag)

        // 控制是否选中
        let _currentIndex = currentIndex;
        console.log(currentIndex)
        if (_currentIndex[listIndex] === index) {
            delete _currentIndex[listIndex]
        } else {
            _currentIndex[listIndex] = index
        }
        setCurrentIndex(_currentIndex)
    }

    // if (isShow) {
    if (true) {
        return (<div id="sku">
            <div className="sku-mask" onClick={() => setIsShow(false)} />
            <div className="sku-content-box">
                <div className="sku-goods-info">
                    <img src={defaultImg} alt=""/>
                    <div className="sku-goods-info-box">
                        <div className="sku-goods-info-box-price"><span>¥</span>233</div>
                        {stocks !== 0 ? <div className="sku-goods-info-box-stocks">库存{stocks}件</div> : null}
                        {/* {selectDefaultValue ? (<p className="sku-goods-info-box-select">请选择: {selectDefaultValue}</p>) : null} */}
                    </div>
                </div>
                <div className="sku-list">
                    {
                        Object.keys(skuListData).map((listItem, listIndex) => {
                            return (<div className="sku-list-item-box" key={listIndex}>
                                <h6>{listItem}</h6>
                                <ul>
                                    {
                                        skuListData[listItem].map((item, index) => {
                                            return (
                                            <li
                                                className={index == currentIndex[listIndex] ? 'active' : ''}
                                                key={index}
                                                onClick={() => skuItemCick(item, listIndex, index)}>
                                                {item}
                                            </li>)
                                        })
                                    }
                                </ul>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>)
    } else {
        return null
    }
}

export default Sku;