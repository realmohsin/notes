const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

// should remove extensions from import statements because webpack will add it (look into any other reason why we should do this)

module.exports = {
  mode: "production",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // tells webpack which files to look for to bundle as it encounters import statments
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
