'use strict';
const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

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
      'jquery/dist/jquery.js',
      'lodash',
      'moment',
      'toastr',
      'semantic-ui/dist/semantic.js',
      'ng-semantic',
      'password-generator'
    ]
  },
  output: {
    path: path.join(__dirname, "..", "build"),
    publicPath: path.join(__dirname, "..", "build"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.ts', '.js', '.html']
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
        loader: 'url?name=/assets/images/[name].[ext]&limit=100000'
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=/assets/fonts/[name].[ext]',
        exclude: /\/src\/imgs\//
      },
      {
        test: /\.json$/,
        loader: 'json?name=/assets/data/[name].[ext]'
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
    new webpack.NoErrorsPlugin(),
    //new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.join(__dirname, 'src'),
      {}
    ),
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js",
      "moment": "moment"
    }),
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

    ]),
    new TsConfigPathsPlugin(/* { tsconfig, compiler } */)
  ],
  target: 'electron-renderer'
};