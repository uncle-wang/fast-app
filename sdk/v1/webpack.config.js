module.exports = {
	mode: "production",
	entry:  __dirname + "/src/index.js",
	output: {
		path: __dirname + "/build",
		filename: "sdk.min.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'stage-3'],
					}
				}
			},
		]
	},
};
