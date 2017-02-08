var webpack = require('webpack');
var path = require('path');

module.exports = {
    cache: true,
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[hash].[chunkhash].chunk.js',
        path: __dirname + '/dist/script',
        publicPath: '/script/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},

            {
                test: /\.coffee$/,
                loader: 'coffee-loader'
            }
        ]
    }
};