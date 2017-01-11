var path = require('path');
var webpack = require('webpack');
var assetsWebpackPlugin = require('assets-webpack-plugin');
var isProd = (process.env.NODE_ENV === 'production');

const plugin = [
    new webpack.DllPlugin({
        /**
         * path
         * 定义 manifest 文件生成的位置
         * [name]的部分由entry的名字替换
         */
        path: path.join(__dirname, 'dll', 'manifest.json'),
        /**
         * name
         * dll bundle 输出到那个全局变量上
         * 和 output.library 一样即可。
         */
        name: '[name]',
        context: __dirname
    }),
    new assetsWebpackPlugin({
        filename: 'assets.json',
        path: path.join(__dirname, 'dll'),
        fullPath: true
    })
];

if (isProd) {
    plugin.push(
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
            sourceMap: true
        })
    )
}

module.exports = {
    entry: {
        lib: ['vue', 'vuex', 'vue-router', 'es6-promise', 'isomorphic-fetch', 'fastclick']
    },

    output: {
        path: path.join(__dirname, 'dll'),
        filename: isProd ? '[name].[chunkhash:8].js' : '[name].js',
        /**
         * output.library
         * 将会定义为 window.${output.library}
         * 在这次的例子中，将会定义为`window.vendor_library`
         */
        library: '[name]'
    },

    devtool: isProd ? 'source-map' : 'inline-source-map',

    plugins: plugin
}