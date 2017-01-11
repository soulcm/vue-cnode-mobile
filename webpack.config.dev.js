var path = require('path');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.config.base.js');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var assetsConfig = require('./dll/assets.json');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client'].concat(baseWebpackConfig.entry[name]);
})

baseWebpackConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development'),
            VUE_ENV: JSON.stringify('client')
        }
    }),
    new ExtractTextPlugin({filename: '[name].css',allChunks: true}),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        title: 'vue-cnode',
        template: 'template/index.html',
        inject: true,
        filename: 'index.html',
        chunks: ['app']
    }),
    new webpack.LoaderOptionsPlugin({
        debug: true
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/manifest.json'),
    }),
    new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, 'dll', assetsConfig.lib.js),
        includeSourcemap: false
    })
);

module.exports = merge(baseWebpackConfig, {
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/lib/',
        chunkFilename: '[id].build.js'
    }
})