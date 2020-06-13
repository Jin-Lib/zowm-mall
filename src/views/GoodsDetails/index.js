import React, { useState, useEffect } from 'react';
import './index.scss';

import Carousel from '../../components/Carousel'
import GoodsBottom from '../../components/GoodsBottom'
import Sku from '../../components/Sku'

const skuListData = [
    {
      "skuId": 384,
      "price": 6999,
      "stocks": 100,
      "skuName": "心水金 3.6 寸 ",
      "pic": "data:image/jpeg;base64,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",
      "properties": "颜色:心水金;尺寸:3.6 寸"
    },
    {
      "skuId": 385,
      "price": 6998, // 价格
      "stocks": 79, // 库存
      "skuName": "真爱粉 3.6 寸 ", // 名字
      "pic": "2019/04/17ba70d217644839a381df0dc3682b11.jpg", // 图片
      "properties": "颜色:真爱粉;尺寸:3.6 寸"
    },
    {
        "skuId": 385,
        "price": 6998, // 价格
        "stocks": 79, // 库存
        "skuName": "真爱粉 3.4 寸 ", // 名字
        "pic": "2019/04/17ba70d217644839a381df0dc3682b11.jpg", // 图片
        "properties": "颜色:真爱粉;尺寸:4.3 寸"
    },
    {
        "skuId": 385,
        "price": 6998, // 价格
        "stocks": 80, // 库存
        "skuName": "真爱粉 3.4 寸 ", // 名字
        "pic": "2019/04/17ba70d217644839a381df0dc3682b11.jpg", // 图片
        "properties": "颜色:真爱粉;尺寸:4.3 寸;带下: 均码"
    }
]

export default function GoodsDetails() {

    const [price, setPrice] = useState(0); //商品价格
    const [goodsName, setGoodsName] = useState(''); //商品名称
    const [sendAddress, setSendAddress] = useState('广东广州'); // 发货地
    const [skuList, setSkuList] = useState(skuListData); // sku数据
    const [skuIsShow, setSkuState] = useState(false); // sku是否展示

    useEffect(() => {
        setPrice(280);
        setGoodsName('这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称');
        // setSkuList(handleSkuData(skuList))
    }, [])

    const clickSku = () => {
        setSkuState(state => !state);
    }

    return (<div className="goods-details">
        <Carousel />
        <div className="goods-details-info">
            <h6 className="goods-details-info-price"><span>¥ </span>{price}</h6>
            <p className="goods-details-info-name">{goodsName}</p>
        </div>
        <div className="goods-details-send goods-detail-item">
            <span className="goods-details-send-label">发货</span>
            <svg t="1592030094421" className="goods-details-send-label-address" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4508"><path d="M305.6 761.376c3.024-3.248 8.4-7.008 15.92-10.8 14.528-7.312 35.2-13.904 60.192-19.04 4.496-0.944 14.176-2.96 11.264-17.936l-2.8-16.032c-3.744-17.6-12.8-14.16-17.632-13.184C300.96 698.88 256 724 256 762.624c0 58.048 111.904 90.8 252.16 90.8 140.288 0 252.192-32.752 252.192-90.784 0-38.496-44.64-63.568-115.808-78.112-5.088-1.04-15.68-2.944-18.4 12.64-1.12 6.304-2 11.472-2.704 15.472-4.336 18.288 8.48 18.288 13.84 19.44 23.792 5.056 43.52 11.424 57.52 18.496 7.52 3.792 12.928 7.536 15.952 10.8 1.44 1.552 1.6 1.856 1.6 1.264 0 3.04-16.656 14.56-49.584 24.192-40.16 11.744-95.408 18.592-154.592 18.592-59.2 0-114.448-6.848-154.608-18.592-32.032-9.376-48.656-20.544-49.536-23.936 0.096 0.128 0.448-0.32 1.552-1.52z m73.36-122.512c53.712 79.2 106.72 141.664 129.216 141.664 22.496 0 75.488-62.464 129.216-141.664 61.952-91.36 100.688-173.376 100.688-230.8C738.08 279.952 635.2 176 508.16 176c-127.024 0-229.904 103.952-229.904 232.064 0 57.424 38.752 139.456 100.704 230.8z m150.288 63.84a445.936 445.936 0 0 1-21.072 23.376c-5.824-5.92-13.04-13.904-21.072-23.36-21.248-25.056-45.792-57.44-68.432-90.8-56.72-83.648-92.416-159.216-92.416-203.856 0-101.712 81.504-184.064 181.92-184.064 100.416 0 181.92 82.352 181.92 184.064 0 44.64-35.696 120.208-92.432 203.84-22.624 33.376-47.168 65.76-68.416 90.8z m-21.072-200.448a101.92 101.92 0 1 0 0-203.824 101.92 101.92 0 0 0 0 203.84z m0-48a53.92 53.92 0 1 1 0-107.824 53.92 53.92 0 0 1 0 107.84z" p-id="4509" fill="#666666"></path></svg>
            <span className="goods-details-send-address">{sendAddress}</span>
        </div>
        <div
            className="goods-detail-item goods-details-select"
            onClick={clickSku}>
            <span className="goods-details-select-label">
                选择
            </span>
            <Sku
                visible={skuIsShow}
                data={skuList}/>
        </div>
        <div className="goods-details-goodsDetail-desc">
            <p className="goods-details-goodsDetail-desc-title">宝贝详情</p>
            <div className="goods-details-goodsDetail-desc-container"></div>
        </div>
        <GoodsBottom />
  </div>)
}