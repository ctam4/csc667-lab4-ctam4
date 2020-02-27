const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const port = process.env.PORT || 3000;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

app.all("/api/*", (req, res) => {
  // service1
  console.log(req.path)
  apiProxy.web(req, res, {
    target: 'http://0.0.0.0:5000',
  });
});

app.all("*", (req, res) => {
  // front end server / react
  apiProxy.web(req, res, {
    target: 'http://0.0.0.0:4000',
  });
});

app.listen(port, () => console.log(`Gateway on port ${port}!`))
