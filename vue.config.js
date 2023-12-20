const { defineConfig } = require('@vue/cli-service')
const fs = require('fs');

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