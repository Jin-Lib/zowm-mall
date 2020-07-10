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
            target: 'http://testh5.zhongouwumeng.com/',
            changeOrigin: true,
            pathRewrite: { "^/h5Api": "/apis" },
        })
    );
};