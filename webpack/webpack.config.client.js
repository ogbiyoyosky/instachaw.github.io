/* constants */
const isDev = process.env.NODE_ENV !== "production";
const isHttps = false;
const outputFolder = "../dist";
const isDeploy = process.env.DEPLOY && process.env.NODE_ENV === "production";
const isBundleAnalyzerActive = false;

/* imports */
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const {GenerateSW} = require('workbox-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

let web = {
    name: "web",
    target: "web",
    devtool: isDev ? "eval" : "hidden-source-map",
    context: path.resolve(__dirname, "../src"),
    externals: [],
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
            "redux-thunk"
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
            filename: "vendor.[hash].js",
            minChunks: Infinity
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
        new GenerateSW({
            swDest: '../sw.js',
            include: [/\.html$/, /\.js$/],
            exclude: [/\.gz$/],
            importWorkboxFrom: isDev ? 'local' : 'cdn',
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: /.*/,
                    handler: 'networkFirst'
                },
                {
                    urlPattern: new RegExp('^https://res.cloudinary.com/(.*)'),
                    handler: 'cacheFirst'
                },
                {
                // Match any same-origin request that contains 'api'.
                urlPattern: /api/,
                // Apply a network-first strategy.
                handler: 'networkFirst',
                options: {
                  // Fall back to the cache after 10 seconds.
                  networkTimeoutSeconds: 10,
                  // Use a custom cache name for this route.
                  cacheName: `instachaw-${process.env.NODE_ENV}-api-cache`,
                  // Configure custom cache expiration.
                  expiration: {
                    maxEntries: 5,
                    maxAgeSeconds: 60,
                  },
                  // Configure which responses are considered cacheable.
                  cacheableResponse: {
                    statuses: [0, 200],
                    headers: {'x-test': 'true'},
                  }
                },
              }]
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
        new StyleLintPlugin()
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
  
    ]),
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

(isDev && isBundleAnalyzerActive) && web.plugins.push(new BundleAnalyzerPlugin())

module.exports = web;
