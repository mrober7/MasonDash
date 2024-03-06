const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

let mode = "development";
let target = "web"; //targets on modern browser in DEV mode

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist"; //target browsers with polyfills
}

module.exports = {
    mode: mode,
    target: target,
    entry: {
        index: "./src/index.js",
    },
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
            components: path.resolve(__dirname, "src/components"),
            images: path.resolve(__dirname, "src/images"),
            services: path.resolve(__dirname, "src/services"),
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
                    helperDirs: path.join(__dirname, '/src/hbs/helpers'),
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
            filename: "index.html",
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: "./src/login.html",
            filename: "login.html",
            chunks: ['index']
        }),
        new MiniCSSExtractPlugin({
            filename: "./[name].css?[contenthash]",
        }),
        new CopyPlugin({
            patterns: [
                // {
                //     from: './src/data',
                //     to: './data'
                // }, 
                {
                    from: './src/images',
                    to: './images'
                }
            ],
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
                target: 'https://mdapi.sreenaina.com',
                secure: false,
                changeOrigin: true,
            },
        },
    },
};
