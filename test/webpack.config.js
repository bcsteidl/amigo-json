const webpack = require('webpack')
const path = require('path')

const caminho = (pontoFinal = "") => path.resolve(__dirname, pontoFinal)

module.exports = {
    entry: caminho("json_2.js"),
    output: {
        path: caminho("."),
        filename: "json_2-bdl.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".css"],
        alias: {
            "jquery-ui": caminho("../node_modules/jquery-ui-dist/jquery-ui.js")
        }
    }
}
