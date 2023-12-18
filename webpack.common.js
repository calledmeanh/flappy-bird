const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "docs"),
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, include: path.join(__dirname, "src"), use: ["babel-loader"] },
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      { test: /\.(png|gif|ogg)$/i, type: "asset/resource" },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "docs", "index.html"),
    }),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
