const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const app = express();
const routes = require('../routes/index.js');
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'development';
app.set('env', env);


app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));


//proxy
const proxyObj = require('../config/proxy.js');
const proxyMiddleware = require('http-proxy-middleware');
Object.keys(proxyObj).forEach(function(context) {
    const options = proxyObj[context];
    app.use(proxyMiddleware(context, options));
})

if (env === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackDevConfig = require('../webpack.config.dev.js');

    const compiler = webpack(webpackDevConfig);

    const devMiddleware = webpackDevMiddleware(compiler, {
        contentBase: path.join(__dirname),
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true,
            chunks: false
        }
    });

    app.use(require('connect-history-api-fallback')());

    // serve webpack bundle output
    app.use(devMiddleware);

    //proxy
    /*Object.keys(proxyObj).forEach(function(context) {
        const options = proxyObj[context];
        app.use(proxyMiddleware(context, options));
    })*/

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.use(express.static(path.join(__dirname, '../public')));

    app.use(routes);

    app.use((req, res, next) => {
        res.sendFile(path.join(__dirname, '../dist', 'index.html'));
    })
}


app.listen(port, (err) => {
    console.log(`server started at localhost:${port}`)
})