const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const options = {
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './src'),
  varFile: path.join(__dirname, './src/styles/variables.less'),
  themeVariables: ['@primary-color'],
  indexFileName: 'index.html',
  generateOnce: false,
  lessUrl: "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js",
  publicPath: "",
  customColorRegexArray: [], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
}

module.exports = {
  entry: './src/main.js',
  output:{
    path: path.resolve(__dirname,'public'),
    filename: 'main.js'
  },
  module:{
    rules:[
      {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.(sa|sc|c)ss$/, 
      use:[
        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
      ]
    },
    {
      test: /\.css$/i, 
      use:[
            'style-loader', 'css-loader' 
          ]
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'file-loader',
      options:{
        name: '[path][name].[ext]'
      }
    }
  ]
  },
  plugins:[ 
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new AntDesignThemePlugin(options)
  ],
  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: './public',
    port: 3000
  }
  //devtool: 'cheap-module-eval-source-map'
}