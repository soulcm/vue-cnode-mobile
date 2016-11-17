var path = require('path');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.config.base.js');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

baseWebpackConfig.plugins = baseWebpackConfig.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {comments: false},
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[chunkhash:8].js'),
    new ExtractTextPlugin('[name].[contenthash:8].css', {allChunks: true}),
    new HtmlWebpackPlugin({
        title: 'vue-cnode',
        template: 'template/index.html',
        inject: true,
        filename: 'index.html',
        chunks: ['vendor', 'app']
    })
]);

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.join(__dirname, 'lib'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[id].build.[chunkhash:8].js',
        publicPath: '/vue-cnode-mobile/lib/'
    }
})
