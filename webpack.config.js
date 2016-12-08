const path = require('path');

module.exports = {
	entry: ['./src/client/scripts/main.js', './src/client/scripts/demo.js'],
	output: {
		path: path.resolve(__dirname, './src/client/public/build'), // absolute path
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			// Webpack should run sources through Babel when it bundles them
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}

	//devtool: "cheap-eval-source-map",
}
