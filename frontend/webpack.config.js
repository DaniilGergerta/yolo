const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    bundle: path.resolve(__dirname, "src/index.tsx")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]"
  },
  cache: {
    type: "memory"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        type: "asset/resource",
        test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot)$/
      },
      {
        test: /\.svg$/i,
        loader: "@svgr/webpack"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new MiniCssExtractPlugin(),
    new HtmlPlugin({
      title: `Main`,
      filename: `index.html`,
      template: "public/index.html"
    })
  ],
  resolve: {
    extensions: [".tsx", ".js", ".ts"],
    alias: {
      images: path.resolve(__dirname, "public/images"),
      svgs: path.resolve(__dirname, "public/svgs")
    }
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -10,
          reuseExistingChunk: true
        }
      }
    }
  }
};
