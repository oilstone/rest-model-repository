const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'rest-model-repository.js',
        library: 'rest-model-repository',
        libraryTarget: 'umd',
        publicPath: '/',
        globalObject: 'this',
    },
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            '@babel/plugin-proposal-private-property-in-object',
                            '@babel/plugin-proposal-private-methods',
                            '@babel/plugin-proposal-class-properties',
                        ]
                    }
                }
            }
        ]
    }
};
