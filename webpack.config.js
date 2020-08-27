const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: ['./src/ts/index.ts','./src/scss/style.scss'],
    },
    watch: false,
    mode: "development",
    target: "web",
    resolve: {
        extensions: ['.ts', '.js', '.json','.scss', '.css']
    },
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.ts?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                      '@babel/preset-env',
                      {
                        plugins: [
                          '@babel/plugin-proposal-class-properties'
                        ]
                      }
                    ]
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.bundle.css',
          }),
        new HtmlWebpackPlugin({
            title: 'My App',
            template: path.resolve(__dirname, './src/index.html'),
        })
    ]
};
