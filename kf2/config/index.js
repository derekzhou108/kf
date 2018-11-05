// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

// let target = 'http://10.10.40.33:8431'  //lkx
// let target = 'http://10.10.40.33:8232'  //dqw
let target = 'http://115.159.189.146:8021'  //沙箱
// let target = 'http://rolebind.ksgame.com' 
// let sdkTaget = 'http://sdk.ksgame.com'

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../index.html'),
    assetsRoot: path.resolve(__dirname, '../../'),
    assetsSubDirectory: 'static/dist',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    host: '10.10.20.176', // can be overwritten by process.env.HOST
    port: 9090,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/kf': {
        target,
        changeOrigin: true,
      },
      '/evaluation': {
        target,
        changeOrigin: true,
      },
      '/wechat': {
        target,
        changeOrigin: true,
      },
      '/sdk-user': {
        target,
        changeOrigin: true,
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
