import axios from 'axios';
import { Toast } from 'antd-mobile';
import { navigate } from './bridge'

const isDevelopment = process.env.NODE_ENV == 'development'

// 请求拦截器
// axios.interceptors.request.use(    
//     config => config,    
//     error => Promise.error(error)
// )
  
// 响应拦截器
const successFunc = (response) => {
  console.log(response, 'success')
  const { code, message } = response && response.data || {};
  if(code) {
    if(code !== 200) {

      // 登录过期
      if(code === 700) {
        navigate && navigate({
          url: '/login'
        });
      }

      setTimeout(() => {
        Toast.info(message || '')
      }, 500)

      // return Promise.reject(response)
    }
  }

  return response
}

const failFunc = (error) => {
  console.log(error, error.response, 'error')

  //拦截响应，做统一处理 
  let { data, status } = error.response || {};
  let { code, message } = error && error.response && error.response.data || {};

  if (code) {
    Toast.info(message || '请求错误');

    // switch (code) {
    //   case 1000:
    //     Toast.info(message || '请求错误');
    //     break;
    //   default:
    //     Toast.info(message || '请求错误');
    // }
  } else {
    Toast.info(error.response.data || '请求错误')
  }
  return Promise.reject(error.response) // 返回接口返回的错误信息
}

let token = ''
if(/token=([0-9a-zA-Z._\-]+)/.test(window.location.href)) {
  token = RegExp.$1
}
token = decodeURIComponent(token);

if(token) {
  sessionStorage.setItem('token', token);
} else {
  token = sessionStorage.getItem('token');
}

// token = "bearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjg2NjY2MDAwNTkyMTcxMDEwIiwiem93bTEyMyI6IlFPNkVMWSIsImV4cCI6MTU5ODE5MjA1NCwiaWF0IjoxNTk1NjAwMDU0fQ.egVUuKdG3Oo3hZ7dYTkGouwjDuj7M5c6PxUOQKQ0VpgBvfg7G8stiMf45u6q1IG72XeLVGdypT514-xPcHql1A"


const httpAppInstance = axios.create({
    baseURL: isDevelopment ? '/h5Api' : 'http://testh5.weui.com/appapis',
    headers: {
        'Authorization': token//"bearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjgyMTI0NzY0NDU5OTg2OTQ2Iiwiem93bTEyMyI6IkFOOTc1QSIsImV4cCI6MTU5NzEwOTMzOSwiaWF0IjoxNTk0NTE3MzM5fQ.3V8S-66G29xIQEvpph0WuiJWSojm1vMkSQAX_ZQlI8fdKhshJHJC0Chb7r0o9Yq2CrabgttCO-HcQEm6tyXhCQ",
    },
});

const httpInstance = axios.create({
    baseURL: isDevelopment ? '/api' : 'http://testh5.weui.com/mallapis',
    headers: {
        'Authorization': token//"bearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjc4ODgzNjgxNzk4MTA3MTM3Iiwiem93bTEyMyI6IkFWNklWSiIsImV4cCI6MTU5NjMzNjYxMCwiaWF0IjoxNTkzNzQ0NjEwfQ.evwEuIh9Aley3Dk0xiJSLg1St3TMcb_5eEFkubV9ioDT3Ka4rzjr2QePaNOOV47Io0_BfvOsiKNYKBGuxYsYaQ",
    },
});

// 拦截器
httpAppInstance.interceptors.response.use(successFunc, failFunc);
httpInstance.interceptors.response.use(successFunc, failFunc);

const createRequestInstanceFactory = (instance) => {
    return (params) => {
        return new Promise((response, reject) => {
            let headerConfig = {
                'ContentType': params.method == "GET" ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8',
            };
            if (params.header) {
                headerConfig = Object.assign({}, headerConfig, params.header)
            }
            const config = {
                url: params.url, //接口请求地址
                header: headerConfig,
                method: params.method == undefined ? 'POST' : params.method,
                dataType: 'json',
                responseType: params.responseType == undefined ? 'text' : params.responseType,
            };
          
            if(params.method === 'GET') {
                config.params = params.data || {};
            } else {
                config.data = params.data || {};
            }
    
            instance(config)
                .then(res => response(res.data))
                .catch(err => {reject(err);})
        })
    }
}

export const httpApp = createRequestInstanceFactory(httpAppInstance)

export const http = createRequestInstanceFactory(httpInstance)
