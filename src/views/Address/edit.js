import React, { Component } from 'react';
import { InputItem, List, TextareaItem, Button, Picker } from 'antd-mobile';
import './index.scss';
import { district } from 'antd-mobile-demo-data';
import CButton from '../../components/CButton';

class AddressEdit extends Component {
  state = {
    phone: '',
    name: '',
    address: []
  };

  onChange = (value, name) => {
    this.setState({
      [name]: value
    });
  }

  onAddressChange = (value) => {
    console.log(value);
    this.setState({
      address: value
    });
  }

  render() {

    return (
      <div className="address-edit-container">
        <List className="address-edit-box">
          <div className="address-item">
            <InputItem
              type="name"
              placeholder="收货人姓名"
              onChange={(value) => { this.onChange(value, 'name') }}
              value={this.state.name}
            >姓名</InputItem>
          </div>
          <div className="address-item">
            <InputItem
              type="phone"
              placeholder="收货人手机号"
              onChange={(value) => { this.onChange(value, 'phone') }}
              value={this.state.phone}
            >电话</InputItem>
          </div>
          <div className="address-item">
          <Picker
            extra="选择省／市／区"
            data={district}
            indicatorStyle={{ textAlign: 'right' }}
            title="选择省／市／区"
            onChange={this.onAddressChange}
            value={this.state.address}
            onOk={e => console.log('ok', e)}
            onDismiss={e => console.log('dismiss', e)}
          >
            <List.Item arrow="horizontal">地区</List.Item>
          </Picker>
          </div>
          <div className="address-item">
            <TextareaItem
              title="详细地址"
              rows={3}
              placeholder="街道门牌、楼层房间号等信息"
            />
          </div>
        </List>

        <CButton type="primary" className="address-btn">保存</CButton>
      </div>
    );
  }
}

export default AddressEdit;