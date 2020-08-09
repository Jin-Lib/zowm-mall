import React, { useEffect, PureComponent } from 'react';
import { Modal } from 'antd-mobile'
import { PageTitle, CButton, ShareTitle } from '../../components'
import { httpApp as request } from '../../utils'
import './index.scss';
import { getQueryString } from '../../utils/common'

class SharePage extends PureComponent {
    state = {
      downUrl: '',

      data: ''
    };

    componentDidMount() {
        // if (this.wx()) {
        //     Modal.alert('请点击右上角,通过浏览器下载')
        // }
        document.title = '下载分享';
        this.getAccountNum();

        let userHeadPic = getQueryString('userHeadPic'),
          userNickName = getQueryString('userNickName'),
          inviteUserNickName = getQueryString('inviteUserNickName'),
          inviteUserHeadPic = getQueryString('inviteUserHeadPic'),
          relationShip = getQueryString('relationShip');

          if(userHeadPic) {
            this.setState({
              data: {
                userHeadPic: decodeURIComponent(userHeadPic),
                userNickName: decodeURIComponent(userNickName),
                inviteUserNickName: decodeURIComponent(inviteUserNickName),
                inviteUserHeadPic: decodeURIComponent(inviteUserHeadPic),
                relationShip: decodeURIComponent(relationShip)
              }
            });
          }
    }

    wx = () => navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1


    // app下载地址
    getAccountNum = (key) => {
      let params = {
        url: '/app/common/getSysConfigParam',
        method: 'GET',
        data: {
          key: 'ZOWM_APP_DOWNLOAD_URL'
        }
      };
      request(params)
        .then(response => {
          this.setState({
            downUrl: response
          });
        })
        .catch(error => {
        })
    }

    render() {
        const { data } = this.state;
        return (<div className="share-page">
            {/* <PageTitle title="下载分享" leftIcon="close"/> */}
            <div className="share-page-content">
                <ShareTitle url={this.state.downUrl} />

                {
                  data && (
                    <div style={{ display: 'flex', flexDirection: 'column', margin: '15px 0'}}>
                      <div style={{ fontSize: '14px', color: '#888', textAlign: 'center' }}>{data.relationShip}</div>
                      <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
                        <div style={{ textAlign: 'center', position: 'relative' }}>
                          <img style={{ width: '40px', height: '40px', borderRadius: '10px' }} src={data.userHeadPic} alt="" />
                          <div style={{ position: 'absolute', bottom: '-25px', left: '50%', marginLeft: '-75px', width: '150px' }}>{data.userNickName}</div>
                        </div>
                        <div style={{ margin: '6px 20px' }}>
                          {
                            [0,1,2].map(item => (<span key={item} style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '3px', backgroundColor: '#f3f3f3', margin: '0 5px' }}></span>))
                          }
                        </div>
                        <div style={{ textAlign: 'center', position: 'relative' }}>
                          <img style={{ width: '40px', height: '40px', borderRadius: '10px' }} src={data.inviteUserHeadPic} alt="" />
                          <div style={{ position: 'absolute', bottom: '-25px', left: '50%', marginLeft: '-75px', width: '150px' }}>{data.inviteUserNickName}</div>
                        </div>
                      </div>
                    </div>
                  )
                }

                <h4>中欧舞盟</h4>
                <img className="share-page-content-img" src={require('../../assets/imgs/app-share.png')} alt=""/>
                <CButton className="share-page-button-share-button" href={this.state.downUrl}>下载APP</CButton>
            </div>
        </div>)
    }
}

export default SharePage