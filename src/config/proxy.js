module.exports = {
  '/api': {
    target: 'http://47.114.81.48:8086',  // 服务端地址
    pathRewrite: { "^/api": "" },
    changeOrigin: true, // target是域名的话，需要这个参数，
    secure: false // 设置支持https协议的代理
  },
  '/app': {
    target: 'http://app.zhongouwumeng.com',
    changeOrigin: true, // target是域名的话，需要这个参数，
    secure: false // 设置支持https协议的代理
  }
};
    