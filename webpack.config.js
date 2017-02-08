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
        new webpack.optimize.CommonsChunkPlugin('common.js'), //有多个入口文件的话提取公共部分，利用浏览器缓存
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    devtool: 'eval-source-map',
    module: {
        loaders: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'babel',
            //     query: {
            //         presets: [
            //             "es2015-loose"
            //         ],
            //         plugins: [
            //             "transform-es3-member-expression-literals",
            //             "transform-es3-property-literals"
            //         ]
            //     }
            // },

            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},

            {
                test: /\.coffee$/,
                loader: 'coffee-loader'
            },
            {
                test: /\.pug$/,
                loader: 'pug'
            }

        ]
    }
};