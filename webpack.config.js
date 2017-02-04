const path = require('path');

module.exports = {
	entry: ['./src/client/scripts/main.js'],
	output: {
		path: path.resolve(__dirname, './src/client/public/build'), // absolute path
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			// Webpack should run sources through Babel when it bundles them
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["latest"]
				}
			}
		]
	},
	resolve: {
		// want to be able to 'import' these filenames in code without explicit extensions
		extensions: ['', '.js', '.jsx']
	}
}
