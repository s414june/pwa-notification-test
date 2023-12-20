const { defineConfig } = require('@vue/cli-service')
const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express();

const options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem')
};

https.createServer(options, app).listen(3001, () => {
  console.log('HTTPS server running on https://localhost:3001');
});

module.exports = defineConfig({
  devServer: {
    port: 3002,
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    }
  },
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
      },
    },
  },
})