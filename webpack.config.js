const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // {
            //     loader: path.resolve(__dirname, './loader/self-loader.js')
            // },
            {
                test: /\.xyin$/,
                loader: path.resolve(__dirname, 'loader/self-loader.js')
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        },
                        ident: "babel-loader-options"
                    }
                ],

            }
        ]
    },
    optimization: {
        minimize: false
    }
}