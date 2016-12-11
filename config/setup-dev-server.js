const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const MFS = require('memory-fs')
const clientConfig = require('../webpack.config.dev.js')
const serverConfig = require('../webpack.config.server.js')


module.exports = function(app, opts) {
    const clientCompiler = webpack(clientConfig)
    const devMiddleware = webpackDevMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true,
            chunks: false
        }
    })
    app.use(devMiddleware)
    clientCompiler.plugin('done', () => {
        const fs = devMiddleware.fileSystem
        const filePath = path.join(clientConfig.output.path, 'index.html')
        if (fs.existsSync(filePath)) {
            const index = fs.readFileSync(filePath, 'utf-8')
            opts.indexUpdated(index)
        }
    })
    app.use(webpackHotMiddleware(clientCompiler))

    // watch and update server renderer
    const serverCompiler = webpack(serverConfig)
    const mfs = new MFS()
    const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename)
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        // stats.warnings.forEach(err => console.warn(err))
        opts.bundleUpdated(mfs.readFileSync(outputPath, 'utf-8'))
    })

}