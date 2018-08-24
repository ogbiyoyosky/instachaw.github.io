"use strict";
const webpack = require("webpack");
const path = require('path');
const StartServerPlugin = require('start-server-webpack-plugin');
const NodeExternals = require("webpack-node-externals");

/* constants */
const isDev = process.env.NODE_ENV !== "production";
const isHttps = false;
const outputFolder = "dist";
const isDeploy = process.env.DEPLOY;
const appEntry = './app.babel.js'

let node = {
    name: "node",
    devtool: isDev ? "eval" : "hidden-source-map",
    target: "node",
    watch: true,
    node: {
        __dirname: true
    },
    externals: [NodeExternals({
        whitelist: [
            'webpack/hot/poll?1000',
            appEntry
        ]
    })],
    entry: [
        appEntry
    ],
    output: {
        path: path.resolve(__dirname, '../'),
        filename: "app.js"
    },
    plugins: [
        new StartServerPlugin('app.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            "process.env.isDev": JSON.stringify(isDev),
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.isHttps": JSON.stringify(isHttps),
            "process.env.outputFolder": JSON.stringify(outputFolder),
            "process.env.BASE_URL": isDev ?
                JSON.stringify("http://eliiss-api.localhost:8081/") : JSON.stringify("https://eliiss-api.azurewebsites.net/")
        })
    ].concat(
        isDev ? [] : [
            new webpack.optimize.UglifyJsPlugin({
                mangle: false,
                sourceMap: false
            })
        ]
    ),
    module: {
        loaders: [{
                enforce: "pre",
                test: /\.jsx?$/,
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {
                    fix: true,
                    emitWarning: true
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"],
                    plugins: ["transform-object-rest-spread"]
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};

module.exports = node;
