'use strict';
const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
  cache: false,
  watch: false,

  context: path.join(__dirname, "src"),
  entry: {
    main: "./main",
    vendors: [
      'reflect-metadata',
      'zone.js/dist/zone',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/core',
      '@angular/common',
      '@angular/compiler',
      '@angular/forms',
      '@angular/http',
      '@angular/router',
      'rxjs/Rx',
      'lodash',
      'moment',
      'toastr'
    ]
  },
  output: {
    path: path.join(__dirname, "..", "build"),
    publicPath: path.join(__dirname, "..", "build"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: ['css'] })
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract({ fallbackLoader:'style', loader: ['css!sass'] })
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'url?name=assets/images/[name].[ext]&limit=100000'
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=assets/fonts/[name].[ext]',
        exclude: /\/src\/imgs\//
      },
      {
        test: /\.json$/,
        loader: 'json?name=assets/data/[name].[ext]'
      },
      {
        test: /index\.html$/,
        loader: 'html'
      },
      {
        test: /\.html$/,
        loader: 'raw',
        exclude: path.join(__dirname, "src", "index.html")
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js',
      minChunks: Infinity
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: false,
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false,
    //   mangle: false,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new HtmlWebpackPlugin({
      template: "index.ejs",
      inject: 'body',
      favicon: 'favicon.ico'
    }),
    new CopyWebpackPlugin([
      {from: path.join(__dirname, "node_modules", "semantic-ui", "dist", "semantic.min.css")},
      {from: path.join(__dirname, "node_modules", "semantic-ui", "dist", "themes", "default", "assets"),
        to: "assets"}
    ]),
    new TsConfigPathsPlugin(/* { tsconfig, compiler } */)
  ]
};