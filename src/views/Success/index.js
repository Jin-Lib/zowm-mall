import React from 'react';
import { Icon, Button } from 'antd-mobile';
import { PageTitle, CButton } from '../../components';
import { back } from '../../utils/bridge'

import './index.scss';

const Success = (props) => {

  return (
    <div className="success-page" style={{ padding: '80px 0', display: 'flex', flexDirection: "column", alignItems: 'center' }}>
      <PageTitle title="下单成功" shadow onBack={() => {
        back && back()
      }} />
      <Icon type="check-circle" color="#FF5E6B" size="lg"/>
      <div style={{ fontSize: '20px', color: '#888', marginTop: '20px' }}>购买成功</div>
      <CButton style={{ width: '200px', color: '#fff', marginTop: '30px', borderRadius: '30px' }} onClick={() => {
        back && back()
      }}>返回</CButton>

    </div>
  )
}

export default Success;