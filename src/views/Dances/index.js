import React, { Component, Fragment } from 'react';
import './index.scss';
import { PageTitle } from '../../components';
import { Toast, Button } from 'antd-mobile';
import request from '../../utils/http-app';


class Dances extends Component{

  state = {
    danceList: [],
    selected: []
  }

  API = {
    'getDanceCategory': '/app/course/getDanceCategory'
  };

  init = (props) => {
    const { value = [] } = props;

    this.setState({
      selected: value || []
    });
  }

  // 获取所有舞种
  getDanceCategory = () => {
    let params = {
      url: this.API.getDanceCategory,
      method: "GET",
      data: {}
    };

    Toast.loading('请求中', 0);
    request(params)
      .then((res) => {
        this.setState({
          danceList: res || []
        });
        Toast.hide();
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg)
      })
  }

  onChangeKey = (itemData) => {
    let { selected } = this.state;
    let data = selected.concat([]);

    let index = this.inArray(itemData.unionId, data);
    if(index > -1) {
      data.splice(index, 1);
    } else {
      data.push(itemData);
    }

    this.setState({
      selected: data
    });
  }

  // 清空选项
  onClearClick = () => {
    console.log(this.state.selected)
    this.setState({
      selected: []
    });
  }

  // 确认选择
  onSelectClick = () => {
    const { selected } = this.state;
    const { onChange, onClose } = this.props;
    let newData = selected.concat([]);

    onChange && onChange(newData);
    onClose && onClose();

  }

  /**
   * 查看值是否在数组中
   * @param {any} value 查找的值
   * @param {array} arr 查找的数组
   * @return {number} 值所在的位置索引，没有返回-1
   */
  inArray = (value, arr) => {
    if(!arr) return -1;

    for(let i = 0; i < arr.length; i++) {
      if(value == arr[i].unionId) {
        return i;
      }
    }

    return -1;
  }

  render() {
    const { danceList, selected } = this.state;
    const { onClose } = this.props

    return (
      <div className="dances-container">
        <PageTitle title="擅长舞种" shadow onBack={() => { onClose && onClose() }} />
        <div className="h-44"></div>
        {
          (danceList || []).map((item, index) => {
            return(
              <Fragment key={index}>
                <Title text={item.categoryName} />
                <div className="dances-content">
                  {
                    (item.seconds || []).map((itemData, indexData) => {
                      return (
                        <Tag 
                          className={`${ this.inArray(itemData.unionId, selected) > -1 ? 'active' : '' }`} 
                          key={indexData} 
                          text={itemData.categoryName} 
                          onClick={() => { this.onChangeKey(itemData) }}
                        />
                      )
                    })
                  }
                </div>
              </Fragment>
            );
          })
        }
  
        <div className="dances-footer">
          <SButton type="line" text="清空选择" onClick={this.onClearClick} />
          <SButton className="ml-15" text="确认选择" onClick={this.onSelectClick} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getDanceCategory();
    this.init(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps);
  }

}

const Title = (props) => {
  const { text } = props;

  return (
    <div className="title-container">{ text }</div>
  );
}

const Tag = (props) => {
  const { text, className, onClick } = props;

  return (
    <div onClick={onClick} className={`tag-box-container ${className ? className : ""}`}>{ text }</div>
  );
}

const SButton = (props) => {
  const { type, text, className, onClick } = props;

  if(type === 'line') {
    return (
      <Button className={`s-button-container line ${className ? className : ''}`} onClick={onClick}>
        <div className="s-button-box">{ text }</div>
      </Button>
    )
  }

  return <Button className={`s-button-container ${className ? className : ''}`} onClick={onClick}>{ text }</Button>
}

export default Dances;