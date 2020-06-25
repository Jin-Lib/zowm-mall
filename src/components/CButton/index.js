import React from 'react';
import { Button } from 'antd-mobile';
import './index.scss';

const CButton = (props) => {
  const { className } = props;

  return (
    <Button {...props} className={`cbutton ${className}`}></Button>
  );
}

export default CButton;