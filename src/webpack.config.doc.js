'use strict';
const path = require('path');
const webpack = require("webpack");
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = {
  watch: false,
  context: path.join(__dirname, "core"),
  entry: {
  },
  output: {
    path: path.join(__dirname, "..", "..", "build"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['', '.ts']
  },
  plugins: [
    new TypedocWebpackPlugin({
      out: '/core-doc',
      name: 'Paranoia (core)',
      mode: 'file',
      //theme: path.join(__dirname, 'node_modules/typedoc-markdown-theme/bin'),
      includeDeclarations: false,
      ignoreCompilerErrors: true,
    })
  ]
};