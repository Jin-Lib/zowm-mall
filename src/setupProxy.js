const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://47.114.81.48:8086',
            changeOrigin: true,
            pathRewrite: { "^/api": "" },
        })
    );
    app.use(
        '/h5Api',
        createProxyMiddleware({
            target: 'http://app.zhongouwumeng.com',
            // target: 'http://192.168.0.106:8081',
            changeOrigin: true,
            pathRewrite: { "^/h5Api": "" },
        })
    );
};