const webpack = require("webpack");

module.exports = {
    entry: {
        first: "./src/scripts/index.js",
        second: "./src/scripts/index2.js"
    },
    output: {
        // path: __dirname+"/dist/scripts",
        filename: "[name].bundle.js"
    }
}