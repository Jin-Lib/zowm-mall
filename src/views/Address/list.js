import React, { Component } from 'react';
import CButton from '../../components/CButton';
import './index.scss';

class AddressList extends Component {

  render() {

    return (
      <div className="address-list-container">
        <div className="address-list-item">
          <div className="address-info">
            <div className="address-info-name">杨雯雯 17816866512</div>
            <div className="address-info-addr">浙江省杭州市西湖区</div>
          </div>
          <div className="address-edit-btn">
          </div>
        </div>

        <div className="address-list-footer-btn">
          <CButton type="primary">新增地址</CButton>
        </div>
      </div>
    )
  }
}


export default AddressList;