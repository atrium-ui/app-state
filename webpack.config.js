const webpack = require('webpack');
const path = require('path');
const package = require('./package.json');

const banner = package.name + ' - ' + package.version;

module.exports = {
  target: 'web',
  mode: process.env.NODE_ENV || 'development',
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: 'app-state.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
};
