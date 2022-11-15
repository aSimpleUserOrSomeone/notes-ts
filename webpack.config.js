const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: {
		bundle: path.resolve(__dirname, 'src/scripts/index.ts'),
	},
	output: {
		path: path.resolve(__dirname, 'dist/build'),
		filename: '[name].js',
		clean: true,
		assetModuleFilename: '[name][ext]',
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		port: 3000,
		open: true,
		hot: true,
		compress: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [new MiniCssExtractPlugin()],
	resolve: {
		extensions: ['.ts', '.js'],
	},
}
