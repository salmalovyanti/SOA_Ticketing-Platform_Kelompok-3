const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (target) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    selfHandleResponse: false,
    pathRewrite: (path, req) => path.replace(/^\/[^/]+/, ''),
    onProxyReq: (proxyReq, req, res) => {
      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    }
  });
};
