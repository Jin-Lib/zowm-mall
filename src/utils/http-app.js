import axios from 'axios';

let instance = axios.create();

// 环境的切换
if (process.env.NODE_ENV == 'development') {    
  instance.defaults.baseURL = '/app';
} else if (process.env.NODE_ENV == 'debug') {    
  instance.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {    
  instance.defaults.baseURL = 'http://app.zhongouwumeng.com';
}


instance.defaults.headers.common['Authorization'] = "bearerey" + "JhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNjJkNjMyYy1kYmYyLTQyNWYtODVhNS05ZGQ1YmQzZWEwZWUiLCJ6b3dtMTIzIjoiRFlEUU9VIiwiZXhwIjoxNTk1NjQ5MzM0LCJpYXQiOjE1OTMwNTczMzR9.Mo9OqclnYRM2jCirrcpQdFWLghKxcWU1K4fpyuXFDRQk_p0IeJxgTXVl06XaMu09U01Agg5M1CAblUndtrxWLQ"

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token;        
    // token && (config.headers.Authorization = token);        
    return config;    
  },    
  error => {
    return Promise.error(error);    
  })

// 响应拦截器
instance.interceptors.response.use(    
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
      switch (error.response.status) {                
        // 401: 未登录                
        // 未登录则跳转登录页面，并携带当前页面的路径                
        // 在登录成功后返回当前页面，这一步需要在登录页操作。                
        case 401:                    
          // router.replace({                        
          //     path: '/login',                        
          //     query: { redirect: router.currentRoute.fullPath } 
          // });
          break;
        // 403 token过期                
        // 登录过期对用户进行提示                
        // 清除本地token和清空vuex中token对象                
        // 跳转登录页面                
        case 403:                     
          // Toast({                        
          //     message: '登录过期，请重新登录',                        
          //     duration: 1000,                        
          //     forbidClick: true                    
          // });                    
          // // 清除token                    
          // localStorage.removeItem('token');                    
          // store.commit('loginSuccess', null);                    
          // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          // setTimeout(() => {                        
          //     router.replace({                            
          //         path: '/login',                            
          //         query: { 
          //             redirect: router.currentRoute.fullPath 
          //         }                        
          //     });                    
          // }, 1000);                    
          break; 
        // 404请求不存在                
        case 404:                    
          // Toast({                        
          //     message: '网络请求不存在',                        
          //     duration: 1500,                        
          //     forbidClick: true                    
          // });                    
        break;                
        // 其他错误，直接抛出错误提示                
        default:                    
          // Toast({                        
          //     message: error.response.data.message,                        
          //     duration: 1500,                        
          //     forbidClick: true                    
          // });            
      }            
      return Promise.reject(error.response);        
    }       
  }
);


export function request(params){    
  return new Promise((resolve, reject) =>{ 
    let config = {
      url: params.url, //接口请求地址
      header: {
        'ContentType': params.method == "GET" ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8',
        // Authorization: params.login ? undefined : Taro.getStorageSync('token')
        // 'Authorization': "bearer" + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNjJkNjMyYy1kYmYyLTQyNWYtODVhNS05ZGQ1YmQzZWEwZWUiLCJ6b3dtMTIzIjoiSEZORElJIiwiZXhwIjoxNTkyODI4OTQyLCJpYXQiOjE1OTIyMjQxNDJ9.qL3PllQ-CZOnezPuYnNHBH26L_DGqxtW4Mt_N2ZtuL4rfbUR_MpRzmk5HksgJs_t9_zll0PLILCItsIJwZXUsA"
      },
      method: params.method == undefined ? 'POST' : params.method,
      dataType: 'json',
      responseType:
        params.responseType == undefined ? 'text' : params.responseType,
    };

    if(params.method === 'GET') {
      config.params = params.data || {};
    } else {
      config.data = params.data || {};
    }
    
    instance(config).then(res => {            
      resolve(res.data);
    })        
    .catch(err => {            
      reject(err)        
    })    
  });
}

export default request
