const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查
  devServer: {
    proxy: {
      '/SNS': {
        target: 'http://localhost:8081',
        // //正则匹配
        // pathRewrite: { '^/sns': '' },
        // ws: true, //用于支持websocket
        //跨域伪装
        changeOrigin: true //用于控制请求头中的host值
      },
    }
  }

})
