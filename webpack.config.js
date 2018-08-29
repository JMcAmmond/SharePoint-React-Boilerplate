const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'client');

module.exports = (env, argv) => {
    let devMode = argv.mode !== 'production';
    let pathsToClean = [
        './public',
    ]
    let publicPath = '../SiteAssets/Scripts/Test/'

    // the clean options to use
    let cleanOptions = {
        exclude: ['config.js'],
        verbose: true,
        dry: false
    }

    let config = {
        entry: ["babel-polyfill", APP_DIR + '/index.js'],
        output: {
            path: BUILD_DIR,
            filename: 'bundle.js',
            publicPath: publicPath
        },
        optimization: {
            namedChunks: true,
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new UglifyJSPlugin({
                    sourceMap: true,
                    uglifyOptions: {
                        compress: {
                            inline: false
                        }
                    }
                })
            ],
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        devMode
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.js?/,
                    exclude: /node_modules/,
                    include: APP_DIR,
                    use: {
                        loader: 'babel-loader'
                    }
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(pathsToClean, cleanOptions),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new WebpackShellPlugin({
                dev: false,
                onBuildStart: !devMode ? ['npm test'] : [],
                onBuildEnd: ['node sp-deploy.js']
            }),
            new MiniCssExtractPlugin({
                filename: "bundle.css",
            }),
        ]
    };
    
    return config;
};
