const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');

// Baca sertifikat SSL
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// Proxy ke backend (ganti port sesuai backend-mu)
const proxy = httpProxy.createProxyServer({ target: 'http://localhost:3000' });

// Server HTTPS yang meneruskan request ke backend
https.createServer(options, (req, res) => {
  proxy.web(req, res);
}).listen(443, () => {
  console.log('HTTPS Proxy running on port 443');
}); 