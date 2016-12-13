var path = require('path');
var webpack = require('webpack');
var entryPath = path.join(__dirname, 'src');


module.exports = {
    target: 'node',
    devtool: false,
    entry: path.join(entryPath, 'server-entry.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server-bundle.js',
        publicPath: '/lib/',
        libraryTarget: 'commonjs2'
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            use: [{ loader: 'vue-loader' }]
        }, {
            test: /\.js$/,
            exclude: /node_modules|vue\/dist/,
            loader: 'babel-loader'
        }, {
            test: /\.(less|css)?$/,
            use: ['css-loader', 'less-loader']
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader',
            options: { limit: 25000 }
        }, {
            test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/,
            loader: "file-loader"
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },

    resolve: {
        extensions: ['.js', '.vue', '.css', '.less']
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                VUE_ENV: JSON.stringify('server')
            }
        })
    ]
}