const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    // 示列
    createProxyMiddleware('/ts/test', {
      target: 'http://test.cn',
      pathRewrite: { '^/ts': '/ts' },
      changeOrigin: true,
    }),
    createProxyMiddleware('/ts', {
      target: 'http://test.cn',
      pathRewrite: { '^/ts': '/ts' },
      changeOrigin: true,
    })
  );
};
