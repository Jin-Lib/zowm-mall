import React, { Component } from 'react';
import { ImagePicker, Toast } from 'antd-mobile';
import { generateUUID } from '../../utils/common';
import request from '../../utils/http-app'

class Upload extends Component {
  state = {};

  API = {
    // 获取七牛上传凭证
    'createQiNiuUploadToken': '/app/common/createQiNiuUploadToken',
  };


  onChangeImg=(imgs)=>{

    let params = {
      url: this.API.createQiNiuUploadToken,
      method: "POST",
      data: {
        fileName: '',
        uploadType: 17
      }
    };

    request(params)
      .then((res) => {
        if(res) {
          this.key = res.keyPrefix + generateUUID() + '.' + 'png';

          let formData = new FormData();
          formData.append("file", imgs[0].file);
          formData.append("token", res.uptoken);
          formData.append("key", this.key);

          fetch(res.uploadUrl, {
            method: 'POST',
            headers: {
            },
            body: formData,
          }).then((response) => response.json())
              .then(() => {
                this.props.onChange && this.props.onChange(res.domain + this.key);
                console.log(res.domain + this.key)
          })
        }
      })
      .catch((error) => {
        const { data } = error;
        const { error: errMsg } = data || {};
        Toast.info(errMsg)
        })
  }


  render() {
    const { style } = this.props;

    return(
      <div style={{ position: 'relative' }}>
        {
          this.props.children
        }
        <ImagePicker
          style={{ opacity: 0, position: 'absolute', top: 0, left: 0, ...(style || {}) }}
          onChange={(e)=>this.onChangeImg(e)}
          length={1}
          onImageClick={(index, fs) => console.log(index, fs)}
          accept="image/gif,image/jpeg,image/jpg,image/png">
            <div>上传图片</div>
        </ImagePicker>
      </div>
    );
  }
}

export default Upload;