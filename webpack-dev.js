const path = require("path");
const webpack = require("webpack");

var devFlagPlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"dev"'
});

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/only-dev-server',
        './src/templates/entry/default.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            ImmutableMixin: 'react-immutable-render-mixin',
            reactMixin: 'react-mixin',
            React: "react",
            _: 'lodash'
        }),
        devFlagPlugin
    ],
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            include: __dirname,
            use: {
                loader: "babel-loader"
            }
        }]

    },
    mode: 'development'
}