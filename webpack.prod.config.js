let webpack = require('webpack');
let WebpackShellPlugin = require('webpack-shell-plugin');
let path = require('path');

let BUILD_DIR = path.resolve(__dirname, 'public');
let APP_DIR = path.resolve(__dirname, 'client');

let config = {
	entry: ["babel-polyfill", APP_DIR + '/index.js'],
 	output: {
		path: BUILD_DIR,
		filename: 'bundle.js',
		publicPath: './public/'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
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
	plugins:[
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		/* new WebpackShellPlugin({
			dev: false,
	        onBuildEnd: ['node sp-deploy.js']
	    }) */
	]
};

module.exports = config;
