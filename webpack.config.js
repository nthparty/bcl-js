// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
// const yargs = require('yargs');

// const isProductionBuild = yargs.argv.mode === 'production';

const config = {
    // devtool: isProductionBuild ? 'none' : 'source-map',
    plugins: [
        // new require('webpack').ProvidePlugin({
        //     Buffer: ['buffer', 'Buffer'],
        //     process: 'process/browser'
        // })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: { crypto: false, path: false }
    }
};

// Bundle configuration: this includes both BCl and libsodium
const bundle = Object.assign({
    entry: './src/bcl.ts',
    output: {
        filename: 'bcl.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'BCl',
        libraryTarget: 'var',
        libraryExport: 'BCl' // Expose BClSlim module so we don't have to access BCl.BCl
    }
}, config);

// Slim configuration: only include BCl, and require libsodium be passed to constructor
const slim = Object.assign({
    entry: './src/bcl.slim.ts',
    output: {
        filename: 'bcl.slim.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'BCl',
        libraryTarget: 'var',
        libraryExport: 'BClSlim' // Expose BClSlim module so we don't have to call new BCl.BClSlim(sodium)
    }
}, config);

module.exports = [
    bundle,
    slim
];
