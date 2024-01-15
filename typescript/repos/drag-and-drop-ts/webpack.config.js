const path = require("path");

// should remove extensions from import statements because webpack will add it (look into any other reason why we should do this)

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  devtool: "inline-source-map", // tells webpack that there will be generated source maps that it should use (the source maps are coming from tsconfig.json config setting)
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
};
