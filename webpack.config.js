const webpack = require('webpack')
const path = require('path')

const caminho = (pontoFinal = "") => path.resolve(__dirname, pontoFinal)

const eProducao = process.env.NODE_PRD === 'TRUE' || process.env.NODE_PRD === 'true'

module.exports = {
    entry: caminho("json.js"),
    output: {
        path: caminho("dist"),
        filename: (eProducao ? "amigo-json-min.js" : "amigo-json.js")
    },
    devtool: (eProducao ? "" : "source-map"),
    module: {
        loaders: [{
            test: /\.css$/,
            include: [caminho("css")],
            loader: "style-loader!css-loader"
        }, {
            test: /\.png$/,
            include: [caminho("img")],
            loader: "url-loader?limit=200000"
        }, {
            test: /\.jpg$/,
            include: [caminho("img")],
            loader: "url-loader?limit=100000"
        }, {
            test: /\.gif$/,
            include: [caminho("img")],
            loader: "url-loader?limit=100000"
        }]
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".css"],
        alias: {
            lib: caminho("lib"),
            css: caminho("css"),
            src: caminho("src")
        }
    },
    plugins: eProducao ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ] : []
}
