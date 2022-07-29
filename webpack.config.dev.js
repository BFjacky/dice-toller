const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    minimize: false,
  },
}

const webpackConfig = merge(baseConfig, devConfig)

module.exports = webpackConfig
