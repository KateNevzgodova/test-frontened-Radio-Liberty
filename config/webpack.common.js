const path = require('path');
const argv = require('yargs').argv;
const htmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');


const ENV = argv.mode
const isProduction = ENV === 'production' ? true : false
const shouldUseSourceMap = ENV === 'development' ? true : false

module.exports = {
    target: 'web',
    entry: './src/js/index.js',
    mode: ENV,
    devtool: isProduction ? 'eval' : 'source-map',
    stats: 'errors-only',

    devServer: {
        static: {
            directory: path.join(__dirname, './../src/public'),
        },
        compress: true,
        port: 5000,

        open:true,
        liveReload: true,
        hot: true,
    },
    optimization: {
        usedExports: true
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './../build'),
        clean: true,
    },
    module: {
        rules: [{
                test: /\.html$/i,
                loader: 'html-loader',
                options: {},
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                // CSS SASS SCSS
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: shouldUseSourceMap,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: shouldUseSourceMap,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: function() {
                                    return [autoprefixer]
                                },
                            },
                            sourceMap: shouldUseSourceMap,
                        }
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css",
        }),
        new htmlWebpackPlugin({
            template: `./src/public/index.html`,
            filename: "index.html",
            title: "index",
            favicon: "./src/public/favicon.ico"
        }),
        
    ]
};