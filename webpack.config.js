const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, 'public'),
    mode:'development',
    entry: './js/main.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: true,
    plugins:[
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CleanWebpackPlugin()
        ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader,
                    options:{
                    }},
                    'css-loader'
                ]
            }
        ]
    }
}