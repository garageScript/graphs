const path = require("path");

module.exports = {
  entry: "./public/client/index.js", // The first file to look into. Move your JavaScript here!
  mode: "production",
  output: {
    path: path.resolve(__dirname, "public/dist"), // We will put the compiled file into public/dist
  },
  module: {
    rules: [
      {
        // This section tells Webpack to use Babel to translate your React into JavaScript
        test: /\.js$/, // Regex for all JavaScript file
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
