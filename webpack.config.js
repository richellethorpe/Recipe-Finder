const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

let pages = ['about', 'blog', 'contact'];
let multiPage = pages.map(page => {
  return new HtmlWebpackPlugin({
    filename: `${page}.html`,
    template: `./src/${page}.html`,
  })
})

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  devServer: {               
    contentBase: './dist'    
  },
  plugins: [
    new Dotenv(),
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Shape Tracker',
      template: './src/index.html',
      inject: 'body'
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/pages/about.html',
    //   filename: 'about.html'
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/pages/blog.html',
    //   filename: 'blog.html'
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/pages/contact.html',
    //   filename: 'contact.html'
    // })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};