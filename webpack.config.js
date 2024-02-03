const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
let target = "web"; //targets on modern browser in DEV mode

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist"; //target browsers with polyfills
}

module.exports = {
    mode: mode,
    target: target,
    entry: "./src/index.js",
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
                framework: {
                    test: /[\\/]framework[\\/]/,
                    name: "framework",
                    chunks: "all",
                    // test(module) {
                    //     return module.context.includes("framework");
                    // },
                },
            },
        },
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./[name].js?[contenthash]",
        assetModuleFilename: "images/[name][ext]",
        clean: true,
    },
    resolve: {
        alias: {
            layout: path.resolve(__dirname, "src/components/layout/layout"),
            images: path.resolve(__dirname, "src/images"),
        },
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /(index).html/,
                loader: "html-loader",
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset", //inline resource or empty
                parser: {
                    dataUrlCondition: {
                        maxSize: 30 * 30,
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(s[ac]|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            publicPath: "",
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                options: {
                    helperDirs: path.join(__dirname, '/src/common/helpers'),
                    precompileOptions: {
                        knownHelpersOnly: false,
                    }
                },
            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new MiniCSSExtractPlugin({
            filename: "./[name].css?[contenthash]",
        }),
    ],
    devtool: mode === "production" ? false : "source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 5001,
        hot: true,
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: 'http://localhost:6001',
                //to user modifier to proxy
                // pathRewrite: {
                //     "^/api": "",
                // },
                secure: false,
                changeOrigin: true,
            },
        },
    },
};
