const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://47.114.81.48:8086',
            // target: 'http://zowm.free.idcfengye.com',
            changeOrigin: true,
            pathRewrite: { "^/api": "" },
        })
    );
    app.use(
        '/h5Api',
        createProxyMiddleware({
            target: 'http://testh5.weui.com/appapis',
            // target: 'http://zowm.free.idcfengye.com',
            changeOrigin: true,
            pathRewrite: { "^/h5Api": "" },
        })
    );
};