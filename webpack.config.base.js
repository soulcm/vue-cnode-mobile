var path = require('path');
var webpack = require('webpack');
var entryPath = path.join(__dirname, 'src');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProd = process.env.NODE_ENV === 'production';


module.exports = {
    entry: {
        app: path.join(entryPath, 'client-entry.js')
    },

    module: {
        rules: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            use: [{loader: 'vue-loader'}]
        }, {
            test: /\.js$/,
            exclude: /node_modules|vue\/dist/,
            loader: 'babel-loader'
        }, {
            test: /\.(less|css)?$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
        }, {
            test: /\.(png|jpg)$/,
			loader: 'url-loader',
            options: {limit: 25000}
        }, {
            test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/,
            loader: "file-loader"
        }]
    },

    resolve: {
        extensions: ['.js', '.vue', '.css', '.less']
    },

    plugins: [
        new webpack.NoErrorsPlugin()
    ]
}