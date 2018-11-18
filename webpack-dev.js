const path = require("path");
const webpack = require("webpack");

var devFlagPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV':'"dev"'
});

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/only-dev-server',
        './src/templates/entry/default.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        devFlagPlugin
    ],
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                include: __dirname,
                use: {
                    loader: "babel-loader"
                }
            }
        ]

    },
    mode: 'development'
}
