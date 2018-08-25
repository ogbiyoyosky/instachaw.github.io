/* constants */
const isDev = process.env.NODE_ENV !== "production";
const isHttps = false;
const outputFolder = "../dist";
const isDeploy = process.env.DEPLOY && process.env.NODE_ENV === "production";

/* imports */
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

let web = {
    name: "web",
    target: "web",
    devtool: isDev ? "eval" : "hidden-source-map",
    context: path.resolve(__dirname, "../src"),
    externals: [{
        xmlhttprequest: "{XMLHttpRequest:XMLHttpRequest}"
    }],
    entry: {
        "vendor": [
            "react",
            "react-dom",
            "react-redux",
            "immutable",
            "react-router-dom",
            "react-transition-group",
            "react-helmet",
            "redux-immutable",
            "redux-thunk",
            "moment"
        ],

        "main.js": [
            "./js/index.jsx"
        ],
        "client.js": [
            "react-hot-loader/patch",
            "webpack-dev-server/client?http://localhost:3001",
            "webpack/hot/only-dev-server",
            "./client/index.js",
        ]
        
    },
    output: {
        path: path.join(__dirname, `./${outputFolder}`),
        filename: "[name].[hash].js",
        publicPath: '/dist/'
    },
    devServer: {
        host: 'localhost',
        port: 3001,
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new WriteFilePlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../templates/index.ejs'),
            path: '../',
            chunks: ['vendor', isDev ? 'client.js' : 'main.js'],
            filename: '../index.html',
            inject: 'body',
            chunksSortMode: 'manual',
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../templates/index.ejs'),
            path: '../',
            chunks: ['vendor', isDev ? 'client.js' : 'main.js'],
            filename: '../404.html',
            inject: 'body',
            chunksSortMode: 'manual',
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            children: 2,
            filename: "vendor.[hash].js",
            minChunks: 2
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.BASE_URL": isDev ?
                JSON.stringify("http://localhost:3333/") : JSON.stringify("https://api.instachaw.com/")
        }),
        new ExtractTextPlugin({
            filename: `[name]`,
            allChunks: true
        }),
        new CopyWebpackPlugin([{
                from: "./img/",
                to: "img/"
            },
            {
                from: "./favicon.ico",
                to: "./"
            },
            {
                from: "./manifest.json",
                to: "./"
            }
        ]),
        new StyleLintPlugin(),
        new SWPrecacheWebpackPlugin({
            cacheId: "instachaw",
            filename: "../sw.js",
            minify: true,
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            staticFileGlobs: [
                `/index.html`,
                // `dist/**.{js.gz}`,
                `dist/img/**`
            ],
            stripPrefix: `/${outputFolder}`
        })
    ].concat(isDev ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
              screw_ie8: true,
              conditionals: true,
              unused: true,
              comparisons: true,
              sequences: true,
              dead_code: true,
              evaluate: true,
              if_return: true,
              join_vars: true
            },
            output: {
              comments: false
            }
          }),
        new webpack.HashedModuleIdsPlugin(),
        new CompressionWebpackPlugin({
              asset: '[path].gz[query]',
              algorithm: 'gzip',
              test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
              threshold: 10240,
              minRatio: 0.8
          }),        
  
    ]).
    concat(isDeploy ? [] : [/*new BundleAnalyzerPlugin()*/]),
    module: {
        rules: [{
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
                    presets: ["env", "react"],
                    plugins: [
                        "transform-class-properties",
                        "transform-object-rest-spread"
                    ]
                }
            },            
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};

module.exports = web;
