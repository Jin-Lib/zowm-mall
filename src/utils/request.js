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
        'Authorization': "bearerey" + "JhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNjJkNjMyYy1kYmYyLTQyNWYtODVhNS05ZGQ1YmQzZWEwZWUiLCJ6b3dtMTIzIjoiRFlEUU9VIiwiZXhwIjoxNTk1NjQ5MzM0LCJpYXQiOjE1OTMwNTczMzR9.Mo9OqclnYRM2jCirrcpQdFWLghKxcWU1K4fpyuXFDRQk_p0IeJxgTXVl06XaMu09U01Agg5M1CAblUndtrxWLQ",
    },
});

const httpInstance = axios.create({
    baseURL: isDevelopment ? '/api' : 'http://47.114.81.48:8086',
    headers: {
        'Authorization': "bearerey" + "JhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNjJkNjMyYy1kYmYyLTQyNWYtODVhNS05ZGQ1YmQzZWEwZWUiLCJ6b3dtMTIzIjoiRUVDRzdWIiwiZXhwIjoxNTk2MDk0MDk2LCJpYXQiOjE1OTM1MDIwOTZ9.RsGmZcy0K1JGFZn4n85J92CQ4wwc7U4twuBB0veg9bOOLFD6DJvfZjDp0Ro2UKImhtB8933K4Y3Yk32Yvkhw_Q"
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
