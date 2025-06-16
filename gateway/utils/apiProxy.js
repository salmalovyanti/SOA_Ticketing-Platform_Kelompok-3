const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (target) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace(/^\/[^/]+/, ''), // hapus /auth, /ticket, dll
  });
};
