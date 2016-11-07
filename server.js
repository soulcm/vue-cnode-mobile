var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev.js');
var port = 3000;

//启动服务
var server = new WebpackDevServer(webpack(config), {
    publicPath: '/',
    // contentBase: path.resolve(__dirname),
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