const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { DllReferencePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  context: __dirname,
  entry: {
    app: './src/index.jsx',
  },
  output: {
    path: `${__dirname}/build`,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          //将第三方库拆分出来
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          minSize: 0, //最小大小设置成0，把所有的依赖都给提取出来变成独立的bundle
          minChunks: 1, // （默认值：1）在拆分之前共享模块的最小块数
          priority: 10, //值越大优先级越高
          chunks: 'initial', // 共有3个值"initial"，"async"和"all"。initial就是同步加载的模块，async是异步加载的模块，这里的同步和异步就是静态或动态引入模块的方式，all就包含了前面两种。
        },
        common: {
          //提取业务代码中公共的部分
          name: 'common',
          test: /[\\/]src[\\/]/,
          chunks: 'all',
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    noParse: /lodash/,
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: /src/,
        exclude: /node_modules/,
        query: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /(\.css$)/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify(''),
    }),
    new HtmlWebpackPlugin({
      template: 'template.html',
    }),
    new CopyPlugin({
      patterns: [{ from: './img/*' }],
    }),
    // new DllReferencePlugin({
    //     manifest:require(`${__dirname}/dll/react.manifest.json`)
    // })
  ],
}
