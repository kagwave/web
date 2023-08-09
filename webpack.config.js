const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const clientConfig = {
  entry: './client/index.ts',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'public/client.bundle.js'
  },
  module: {
    rules: [
      {/*
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
    */},
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
      { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
    ]
  }
};

const serverConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './server/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.bundle.js'
  },
  module: {
    rules: [
      {/*
        exclude: /node_modules/,
        test: /\.js$/,
        use: 'babel-loader'
      */},
      {
        test: /\.mp3$/,
        loader: 'file-loader',
      },
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
      { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
    ]
  },
  resolve: {
    extensions: ['.js', '.less', '.ts', '.tsx'], // [C]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
  })
]
};


module.exports = [clientConfig, serverConfig];
