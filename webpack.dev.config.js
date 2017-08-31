const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    // vendor: ["moment"],
    main: ["babel-polyfill", "./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 9000
    // headers: {
    //   "Access-Control-Allow-Origin": "*"
    // }
    // stats: "errors-only",
    // open: true
  },
  //devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            { loader: "postcss-loader" },
            {
              loader: "sass-loader"
            }
          ]
        })
      },

      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react", "stage-0"]
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new webpack.SourceMapDevToolPlugin(),
    new HtmlWebpackPlugin({
      title: "My App",
      template: "src/index.html",
      hash: true,
      showErrors: true
    }),
    new webpack.HotModuleReplacementPlugin(), //disable when use chunkhash
    new ExtractTextPlugin({
      filename: getPath => {
        return getPath("css/[name].css");
      }
      // allChunks: true
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor"

    //   // filename: "vendors.js",
    //   // (Give the chunk a different name)

    //   // minChunks: Infinity
    //   // (with more entries, this ensures that no other module
    //   //  goes into the vendor chunk)
    // }),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "runtime"

    //   // filename: "vendors.js",
    //   // (Give the chunk a different name)

    //   // minChunks: Infinity
    //   // (with more entries, this ensures that no other module
    //   //  goes into the vendor chunk)
    // }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000 // Minimum number of characters
    })
    // prod
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true
    // })
  ]
};
