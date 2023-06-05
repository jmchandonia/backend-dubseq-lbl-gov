const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:80',
      changeOrigin: true,
    })
  );
  app.use(
    '/v2',
    createProxyMiddleware({
      target: 'http://localhost:80',
      changeOrigin: true,
    })
  );
  app.use(
    '/login',
    createProxyMiddleware({
      target: "http://localhost:80",
      changeOrigin: true,
    })
  );
};