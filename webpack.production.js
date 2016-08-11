const webpack = require('webpack');
const path    = require('path');

module.exports = function (PATH, PORT) {
    return {
        entry:   [
            // Set up an ES6-ish environment
            'babel-polyfill',
            // Add our application's script below
            './src/styles/main.less',
            './src/styles/materialize.less',
            './src/js/index.jsx'
        ],
        module:  {
            loaders: [{
                test:    /\.jsx?$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            }, {
                test:    /\.json/,
                loaders: ['json']
            }, {
                test:   /\.less/,
                loader: 'style!css!autoprefixer!less'
            }, {
                test:   /\.(eot|woff|woff2|ttf|png|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            }]
        },
        output:  {
            path:       path.join(__dirname, PATH, 'js'),
            publicPath: 'dist/js/',
            filename:   'bundle.js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compress: {
                    warnings: false
                }
            })
        ]
    }
};
