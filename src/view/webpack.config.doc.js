'use strict';
const path = require('path');
const webpack = require("webpack");
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = {
  watch: false,
  context: path.join(__dirname, "/src"),
  output: {
    path: path.join(__dirname, '/'),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['', '.ts']
  },
  plugins: [
    new TypedocWebpackPlugin({
      out: '/documentation',
      name: 'Trackmanic',
      mode: 'file',
      //theme: path.join(__dirname, 'node_modules/typedoc-markdown-theme/bin'),
      includeDeclarations: false,
      ignoreCompilerErrors: true,
    })
  ]
};