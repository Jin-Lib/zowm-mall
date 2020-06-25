import React, { Component } from 'react';
import { InputItem, List, TextareaItem, Button, Picker, Toast } from 'antd-mobile';
import './index.scss';
import CButton from '../../components/CButton';
import request from '../../utils/http';
import areas from '../../utils/area';

// let result = [];
// Object.keys(areas.province_list).forEach(item => {
//   var proObj = {
//     value: item * 1000000 + '-' + areas.province_list[item],
//     label: areas.province_list[item],
//     children: []
//   }

//   Object.keys(areas.city_list).forEach(itemCity => {
//     var proItem = (item + '').slice(0,2);
//     var cityItem = (itemCity + '').slice(0, 2);
//     var cityObj = {
//       value: itemCity * 10000 + '-' +  areas.city_list[itemCity],
//       label: areas.city_list[itemCity],
//       children: []
//     };
//     console.log(proItem, cityItem)

//     if(proItem == cityItem) {
//       proObj.children.push(cityObj);
//     }

//     Object.keys(areas.county_list).forEach(itemQu => {
//       var citySubItem = (itemCity + '').slice(0,4);
//       var quSubItem = (itemQu + '').slice(0, 4);

//       if(citySubItem == quSubItem) {
//         // proObj.children.push(cityObj);
//         cityObj.children.push({
//           value: itemQu * 10000 + '-' + areas.county_list[itemQu],
//           label: areas.county_list[itemQu],
//           children: []
//         });
//       }
//     })
//   });

//   result.push(proObj);
  
// })
// console.log(JSON.stringify(result));

class AddressEdit extends Component {
  state = {
    phone: '',
    name: '',
    detail: '',
    address: [],
    areas: areas
  };

  API = {
    'areaList': '/p/area/listByPid',
    'addAddr': '/p/address/addAddr'
  }

  // getAreaList = () => {
  //   let params = {
  //     url: this.API.areaList + '?pid=0',
  //     method: "GET",
  //     data: {
  //       pid: '0'
  //     }
  //   };

  //   Toast.loading('', 0);
  //   request(params)
  //     .then((res) => {
  //       console.log(res);
  //       Toast.hideLoading();
  //     })
  //     .catch((error) => {
  //       const { data } = error;
  //       const { error: errMsg } = data || {};
  //       Toast.info(errMsg)
  //     })
  // }

  addAddress = () => {
    let { name, phone, detail, address } = this.state;
    let address0 = address[0].split('-');
    let address1 = address[1].split('-');
    let address2 = address[2].split('-');

    let params = {
      url: this.API.addAddr,
      method: "POST",
      data: {
        "addr": detail,
        // "addrId": 0,
        "area": address2[1],
        "areaId": parseInt(address2[0]),
        "city": address1[1],
        "cityId": parseInt(address1[0]),
        "mobile": phone.replace(/\s/g, ''),
        "postCode": "",
        "province": address0[1],
        "provinceId": parseInt(address0[0]),
        "receiver": name
      }
    };

    Toast.loading('请求中', 0);
    request(params)
      .then((res) => {
        Toast.hide();
        const { history } = this.props;

        history.go(-1);
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg)
      })
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value
    });
  }

  onAddressChange = (value) => {
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
              data={areas}
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
              value={this.state.detail}
              onChange={(value) => {this.onChange(value, 'detail')}}
              placeholder="街道门牌、楼层房间号等信息"
            />
          </div>
        </List>

        <CButton type="primary" className="address-btn" onClick={this.addAddress}>保存</CButton>
      </div>
    );
  }

  componentDidMount() {
    // this.getAreaList();
  }
}

export default AddressEdit;