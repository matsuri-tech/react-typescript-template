const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const AggressiveMergingPlugin = require("webpack/lib/optimize/AggressiveMergingPlugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const dotenv = require("dotenv")
const pkg = require("./package.json")
const TerserPlugin = require("terser-webpack-plugin")
const StatsPlugin = require("stats-webpack-plugin")

/**
 * @param {DotenvParseOutput} env
 */
const makeEnvKeys = (env) => {
    return Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next])
        return prev
    }, {})
}

module.exports = (_, { mode = "development" }) => {
    const env = dotenv.config().parsed
    let envKeys = makeEnvKeys(env)

    if (mode === "production" || mode === "development") {
        const additionalEnvKeys = makeEnvKeys(
            dotenv.config({
                path: path.resolve(process.cwd(), `.env.${mode}`),
            }).parsed
        )
        envKeys = Object.assign(envKeys, additionalEnvKeys)
    }

    /**@type {webpack.Configuration} */
    const config = {
        mode,
        /** @see https://webpack.js.org/configuration/target */
        target: "web", // (default) web
        entry: {
            index: "./src/index.tsx",
            // another: "./src/another-module.tsx"
        },
        /** @see https://webpack.js.org/configuration/devtool/#devtool */
        devtool: "",
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,

                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            babelrc: true,
                        },
                    },
                },
                {
                    test: /\.md$/,
                    use: "raw-loader",
                },
                {
                    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name() {
                                if (process.env.NODE_ENV === "development") {
                                    return "[path][name].[ext]"
                                }

                                return "[hash].[ext]"
                            },
                            outputPath: "static/img",
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: "css-loader", options: { importLoaders: 1 } },
                    ],
                },
            ],
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[chunkhash:8].js",
            chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
            libraryTarget: "umd",
            //publicPath: "/dist/",
            umdNamedDefine: true,
        },
        /** @see https://webpack.js.org/configuration/optimization */
        optimization: {
            mangleWasmImports: true,
            mergeDuplicateChunks: true,
            minimize: true,
            nodeEnv: "production",
            splitChunks: {
                chunks: "all",
            },
            runtimeChunk: {
                name: "runtime",
            },
            minimizer: [
                new TerserPlugin({
                    extractComments: "all",
                }),
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.NODE_ENV":
                    `"${process.env.NODE_ENV}"` || '"production"',
                ...envKeys,
            }),
            /** @see https://github.com/webpack/webpack/tree/master/examples/aggressive-merging */
            new AggressiveMergingPlugin(),
            new MiniCssExtractPlugin({
                filename: "static/css/[name].[chunkhash:8].css",
                chunkFilename: "static/css/[id].[chunkhash:8].css",
            }),
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve(__dirname, "public"), to: "./" },
                ],
            }),
            new HtmlWebpackPlugin({
                title: pkg.title,
                homepage: pkg.homepage,
                description: pkg.description,
                template: path.resolve(__dirname, "public/index.html"),
            }),
        ],
    }

    /**
     * If in development mode adjust the config accordingly
     */
    if (mode === "development") {
        config.devtool = "source-map"
        config.output = {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
        }
        config.module.rules.push({
            loader: "source-map-loader",
            test: /\.js$/,
            exclude: /node_modules/,
            enforce: "pre",
        })
        config.plugins = [
            new MiniCssExtractPlugin({
                filename: "static/styles/[name].[chunkhash:8].css",
                chunkFilename: "static/styles/[id].[chunkhash:8].css",
            }),
            new HtmlWebpackPlugin({
                title: pkg.title,
                description: pkg.description,
                homepage: pkg.homepage,
                template: path.resolve(__dirname, "public/index.html"),
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV":
                    `"${process.env.NODE_ENV}"` || '"development"',
                ...envKeys,
            }),
            new webpack.HotModuleReplacementPlugin(),
            new StatsPlugin("stats.json", {
                chunkModules: true,
                exclude: [/node_modules[\\/]react/],
            }),
        ]
        config.devServer = {
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, "public"),
            host: "0.0.0.0",
            port: 3000,
            useLocalIp: true,
            stats: {
                colors: true,
                hash: false,
                version: false,
                timings: true,
                assets: true,
                chunks: false,
                modules: false,
                reasons: false,
                children: false,
                source: false,
                errors: true,
                errorDetails: true,
                warnings: false,
                publicPath: false,
            },
            // allowedHosts: []
        }
        config.optimization = {
            mangleWasmImports: true,
            mergeDuplicateChunks: true,
            minimize: false,
            nodeEnv: "development",
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /node_modules/,
                        name: "vendor",
                        enforce: true,
                        chunks: "all",
                    },
                },
            },
        }
    }
    return config
}
