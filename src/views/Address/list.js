import React, { Component } from 'react';
import CButton from '../../components/CButton';
import { Toast } from 'antd-mobile';
import './index.scss';
import request from '../../utils/http'

class AddressList extends Component {
  state = {
    addressList: []
  };

  API = {
    addressList: '/p/address/list'
  }

  getAddressList = () => {
    let params = {
      url: this.API.addressList,
      method: "GET",
      data: {}
    };

    Toast.loading('请求中', 0);
    request(params)
      .then((res) => {
        this.setState({
          addressList: res || []
        });
        Toast.hide();
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg)
      })
  }

  naginativeTo = () => {
    const { history } = this.props;

    history.push('/addressAdd');
  }

  nagivateToOrder = (data) => {
    const { history } = this.props;
    history.goBack()
    window.localStorage.setItem("addressInfo", JSON.stringify(data));
    // history && history.push('/submitOrders', { ...(data || {}) })
  }

  editAddress = (e, data) => {
    const { history } = this.props;
    e.stopPropagation();

    history.push('/addressAdd', { ...(data || {}) });
  }

  render() {
    const { addressList } = this.state;

    return (
      <div className="address-list-container">
        {
          (addressList || []).map((item, index) => {
            return (
              <div key={index} className="address-list-item" onClick={() => { this.nagivateToOrder(item) }}>
                <div className="address-info">
                  <div className="address-info-name">{ item.receiver } { item.mobile }</div>
                  <div className="address-info-addr">{ item.province + item.city + item.area + item.addr }</div>
                </div>
                <div className="address-edit-btn" onClick={e => { this.editAddress(e, item) }}>
                  编辑
                </div>
              </div>
            )
          })
        }

        <div className="address-list-footer-btn">
          <CButton onClick={this.naginativeTo} type="primary">新增地址</CButton>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.getAddressList();
  }
}


export default AddressList;