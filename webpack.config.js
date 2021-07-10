const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: path.resolve(__dirname, 'modules/vue-loader/index.js')
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ],
                    // plugins: [ // 删除 babel 编译过后的 use strict
                    //     [
                    //         require("@babel/plugin-transform-modules-commonjs"),
                    //         {
                    //             strictMode: false
                    //         }
                    //     ],
                    // ]
                },
            }
        ]
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            minify: false
        })
    ]
}