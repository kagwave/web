import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const clientConfig = {
  entry: './client/src/index.tsx',
  output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'public/client.bundle.js'
  },
  module: {
    rules: [
      {/*test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader'*/},
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
      { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
    ]
  },  
  resolve: {
    extensions: ['.js', '.less', '.ts', '.tsx'], 
    /*fallback: {
      "fs": require.resolve("fs-browserify"),
      "path": require.resolve("path-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify")
    },*/
  },
  plugins: [
		new NodePolyfillPlugin()
	],
};

const serverConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './server/src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.bundle.js'
  },
  module: {
    rules: [
      {/*test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader'*/},
      {
        test: /\.(png|jpe?g|gif|jp2|webp|mp3|mp4)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
      { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
    ]
  },
  resolve: {
    extensions: ['.js', '.less', '.ts', '.tsx'], 
    /*fallback: {
      "fs": require.resolve("fs-browserify"),
      "path": require.resolve("path-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify")
    },*/
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new NodePolyfillPlugin()
  ],
};

module.exports = [clientConfig, serverConfig];
