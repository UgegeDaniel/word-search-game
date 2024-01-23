const path = require("path");
module.exports = {
  mode: "none",
  entry: ["./src/script.js"],
  experiments: {
    topLevelAwait: true,
  },
  output: {
    path: __dirname + "/docs",
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "docs"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
