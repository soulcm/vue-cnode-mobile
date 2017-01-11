var path = require('path');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.config.base.js');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var assetsConfig = require('./dll/assets.json');

baseWebpackConfig.plugins = baseWebpackConfig.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
            VUE_ENV: JSON.stringify('client')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {comments: false},
        sourceMap: true
    }),
    new ExtractTextPlugin({filename: '[name].[contenthash:8].css', allChunks: true}),
    new HtmlWebpackPlugin({
        title: 'vue-cnode',
        template: 'template/index.html',
        inject: true,
        filename: '../index.html',
        chunks: ['app']
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/manifest.json'),
    }),
    new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, 'dll', assetsConfig.lib.js),
        includeSourcemap: true
    })
]);

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.join(__dirname, 'dist', 'lib'),
        filename: '[name].[chunkhash:8].js',
        publicPath: '/lib/',
        chunkFilename: '[id].build.[chunkhash:8].js'
    },
    devtool: 'source-map'
})
