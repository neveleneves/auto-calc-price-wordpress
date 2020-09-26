const path = require( 'path' );

// Configuration object
const config = {
	entry: ['./js/index.js'],
	output: {
		path: path.resolve(__dirname, 'assets'),
        filename: 'js/bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
}
module.exports = config;