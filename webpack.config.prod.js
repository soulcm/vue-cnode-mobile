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
    new webpack.optimize.CommonsChunkPlugin('vendor', 'lib/vendor.[chunkhash].js'),
    new ExtractTextPlugin('lib/[name].[contenthash].css', {allChunks: true}),
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
        path: path.join(__dirname, 'dist'),
        filename: 'lib/[name].[chunkhash].js',
        chunkFilename: 'lib/[id].build.[chunkhash].js'
    }
})
