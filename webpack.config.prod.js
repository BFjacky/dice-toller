const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const prodConfig = {
  mode: 'production',
  optimization: {
    minimize: true,
  },
}

const webpackConfig = merge(baseConfig, prodConfig)

module.exports = webpackConfig
