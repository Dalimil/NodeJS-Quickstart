module.exports = {
	entry: ['./src/client/public/js/main.js', './src/client/public/js/demo.js'],
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
