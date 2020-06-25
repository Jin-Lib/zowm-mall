import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import './index.scss';

const Loading = (props) => {
  const { text } = props;

  return (
    <div className="loading-container">
      <ActivityIndicator style={{ justifyContent: 'center' }} text={text || '正在加载...'} />
    </div>
  );
}

export default Loading;