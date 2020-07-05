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

const httpAppInstance = axios.create({
    baseURL: isDevelopment ? '/h5Api' : 'http://app.zhongouwumeng.com',
    headers: {
        'Authorization': "bearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjc4ODgzNjgxNzk4MTA3MTM3Iiwiem93bTEyMyI6IktXT1JaRSIsImV4cCI6MTU5NjUyOTM4NSwiaWF0IjoxNTkzOTM3Mzg1fQ.owmcnSWXqoxdaA1m8HftjnHvGv9b69ChVeFMOaA2qxanux4VCDKVCnzPcj1DrM0gMP6_gFge_pW8844lX_zuLg",
    },
});

const httpInstance = axios.create({
    baseURL: isDevelopment ? '/api' : 'http://47.114.81.48:8086',
    headers: {
        'Authorization': "bearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjc4ODgzNjgxNzk4MTA3MTM3Iiwiem93bTEyMyI6IkFWNklWSiIsImV4cCI6MTU5NjMzNjYxMCwiaWF0IjoxNTkzNzQ0NjEwfQ.evwEuIh9Aley3Dk0xiJSLg1St3TMcb_5eEFkubV9ioDT3Ka4rzjr2QePaNOOV47Io0_BfvOsiKNYKBGuxYsYaQ",
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
                .catch(err => reject(err))
        })
    }
}

export const httpApp = createRequestInstanceFactory(httpAppInstance)

export const http = createRequestInstanceFactory(httpInstance)
