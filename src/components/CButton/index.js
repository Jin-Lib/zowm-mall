import React from 'react';
import { Button } from 'antd-mobile';
import './index.scss';

const CButton = (props) => {

  return (
    <Button {...props} className="cbutton"></Button>
  );
}

export default CButton;