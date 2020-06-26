import axios from 'axios';

const isDevelopment = process.env.NODE_ENV == 'development'

axios.defaults.headers.common['Authorization'] = "bearerey" + "JhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNjJkNjMyYy1kYmYyLTQyNWYtODVhNS05ZGQ1YmQzZWEwZWUiLCJ6b3dtMTIzIjoiRFlEUU9VIiwiZXhwIjoxNTk1NjQ5MzM0LCJpYXQiOjE1OTMwNTczMzR9.Mo9OqclnYRM2jCirrcpQdFWLghKxcWU1K4fpyuXFDRQk_p0IeJxgTXVl06XaMu09U01Agg5M1CAblUndtrxWLQ"

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
});

const httpInstance = axios.create({
    baseURL: isDevelopment ? '/api' : 'http://47.114.81.48:8086',
});

const createRequestInstanceFactory = (instance) => {
    return (params) => {
        return new Promise((response, reject) => {
            const config = {
                url: params.url, //接口请求地址
                header: {
                  'ContentType': params.method == "GET" ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8',
                },
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
                .then(res => response(res))
                .catch(err => reject(err))
        })
    }
}

export const httpApp = createRequestInstanceFactory(httpAppInstance)

export const http = createRequestInstanceFactory(httpInstance)
