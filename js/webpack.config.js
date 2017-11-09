// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    //devtool: 'eval',
    //devtool: "source-map",
    entry: {
        vendor: "./common/vendor.js",
        app: "./App.js"
    },
    output: {
        path: __dirname + "/build",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["es2015", "react", "stage-0"],
                            plugins: ['transform-runtime']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style!css'
                    }
                ]
            }
        ]
    },
    externals: {
        jQuery: 'jquery'
    },
    // plugins: [
    //     new UglifyJSPlugin()
    // ],
    watch: true
};

