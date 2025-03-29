const path = require("path");

module.exports = {
  entry: {
    bundle: "./src/main.tsx",
  },
  devtool: "inline-source-map",
  mode: "development",
  watchOptions: {
    ignored: ["**/node_modules"],
    poll: 1000,
    aggregateTimeout: 600,
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "docs"),
  },
};
