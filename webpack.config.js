module.exports = {
	entry: ['./src/client/scripts/main.js', './src/client/scripts/demo.js'],
	output: {
		filename: 'bundle.js',
		path: './src/client/public/build'
	},
	module: {
		loaders: [
			// Webpack should run sources through Babel when it bundles them
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
}
