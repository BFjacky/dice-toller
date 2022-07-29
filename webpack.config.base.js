const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  target: 'web',
  entry: {
    index: path.resolve(__dirname, './src/index.ts'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index']
    }),
  ],
  devServer: {
    port: 3006,
    host: 'localhost',
    compress: true, // enable gzip compression
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    client: {
      overlay: false,
    },
  },
  output: {
    library: {
      type: 'umd',
      name: 'hardwareHelper',
    },
    path: path.join(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader',
      },
      {
        test: /\.(png|jpeg|jpg|gif|svga|obj)$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 1024 * 100 // 100M
        }
      },
    ],
  },
  stats: {},
}



