import axios from 'axios';

const isDevelopment = process.env.NODE_ENV == 'development'

// 请求拦截器
axios.interceptors.request.use(    
    config => config,    
    error => Promise.error(error)
)
  
// 响应拦截器
axios.interceptors.response.use(    
    response => {   
      if (response.status === 200) {            
        return Promise.resolve(response);        
      } else {            
        return Promise.reject(response);        
      }  
    },
    // 服务器状态码不是200的情况    
    error => {   

      if (error && error.response && error.response.status) {            
        return Promise.reject(error.response);        
      }       
    }
);

let token = ''
if(/token=([0-9a-zA-Z._\-]+)/.test(window.location.href)) {
  token = RegExp.$1
}
token = decodeURIComponent(token);

token = "bearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjg2NjY2MDAwNTkyMTcxMDEwIiwiem93bTEyMyI6IlFPNkVMWSIsImV4cCI6MTU5ODE5MjA1NCwiaWF0IjoxNTk1NjAwMDU0fQ.egVUuKdG3Oo3hZ7dYTkGouwjDuj7M5c6PxUOQKQ0VpgBvfg7G8stiMf45u6q1IG72XeLVGdypT514-xPcHql1A"


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
                .catch(err => {reject(err); console.log(err)})
        })
    }
}

export const httpApp = createRequestInstanceFactory(httpAppInstance)

export const http = createRequestInstanceFactory(httpInstance)
