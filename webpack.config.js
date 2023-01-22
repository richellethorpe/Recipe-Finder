// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
// const Dotenv = require('dotenv-webpack');

// let pages = ['about', 'favorites', 'blog', 'contact'];
// let multiPage = pages.map(page => {
//   return new HtmlWebpackPlugin({
//     filename: `${page}.html`,
//     template: `./src/${page}.html`,
//   })
// })
// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   devtool: 'eval-source-map',
//   devServer: {               
//     contentBase: './dist'    
//   },
//   plugins: [
//     new Dotenv(),
//     new ESLintPlugin(),
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       title: 'Shape Tracker',
//       template: './src/index.html',
//       inject: 'body'
//     }),
//     // new HtmlWebpackPlugin({
//     //   template: './src/about.html',
//     //   filename: 'about.html'
//     // }),
//     // new HtmlWebpackPlugin({
//     //   template: './src/blog.html',
//     //   filename: 'blog.html'
//     // }),
//     // new HtmlWebpackPlugin({
//     //   template: './src/contact.html',
//     //   filename: 'contact.html'
//     // })
//   ].concat(multiPage),
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           'style-loader',
//           'css-loader'
//         ]
//       }
//     ]
//   }
// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

let pages = ['favorites'];
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
    })
  ].concat(multiPage),
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