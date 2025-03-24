module.exports = {
  devServer: {
    port: 5176,
    proxy: {
      '/api': {
        target: 'http://192.168.31.131:8991',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        secure: false,
        ws: true,
        onProxyReq: function(proxyReq) {
          proxyReq.setHeader('Origin', 'http://192.168.31.131:8991');
        }
      }
    }
  },
  lintOnSave: false
}
