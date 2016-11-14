var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev.js');
var port = 8091;
var favicon = require('serve-favicon');

//启动服务
var server = new WebpackDevServer(webpack(config), {
    publicPath: 'http://127.0.0.1:8091/dist/',
    hot: true,
    noInfo: true,
    stats: {
        colors: true
    },
    proxy: {
        '/api/*': {
            target: 'https://cnodejs.org/',
            secure: false
        }
    },
    historyApiFallback: true
});

server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//将其他路由，全部返回index.html
/*server.use('*', function (req,res) {
    res.sendFile(__dirname + '/index.html')
});*/

server.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Listening at http://127.0.0.1:' + port);
    }
})