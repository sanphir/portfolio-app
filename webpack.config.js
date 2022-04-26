const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd", //both required and import
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      }
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    compress: true,
    port: 9000,
  },
  plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html"),
    favicon: "./public/favicon.ico",
    filename: "index.html",
    manifest: "./public/manifest.json",
  })]
};
