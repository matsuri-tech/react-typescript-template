const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

const minimizers = {
    css: new CssMinimizerPlugin(),
}
const optimization = {
    minimize: true,
    minimizer: [minimizers.css],
}

const rules = {
    typescript: {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
            transpileOnly: true,
        },
        exclude: /node_modules/,
    },
    css: {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
    },
}

/**@type {import("webpack").Configuration} */
module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [rules.typescript, rules.css],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    optimization: optimization,
}
