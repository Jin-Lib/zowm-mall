import React, { Component } from 'react';
import './index.scss';

class Dances extends Component {

  render() {

    return (
      <div className="dances-container">
        <Title text="拉丁舞" />
        <div className="dances-content">
          <Tag text="全部拉丁舞" />
          <Tag className="active" text="全部拉丁舞" />
        </div>
      </div>
    );
  }
}

const Title = (props) => {
  const { text } = props;

  return (
    <div className="title-container">{ text }</div>
  );
}

const Tag = (props) => {
  const { text, className } = props;

  return (
    <div className={`tag-container ${className ? className : ""}`}>{ text }</div>
  );
}

export default Dances;