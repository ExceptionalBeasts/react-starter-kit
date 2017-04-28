const path = require('path')
const DefinePlugin = require('webpack').DefinePlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ClosureCompilerPlugin = require('webpack-closure-compiler')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    'client': path.join(__dirname, 'src/index')
  },
  module: {
    rules: [
      {
        test: [ /\.js$/ ],
        include: [/src/],
        exclude: [/\.test.js$/, /node_modules/],
        loaders: ['react-hot-loader', 'babel-loader']
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html?$/, loader: 'html-loader' },
      { test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }) },
      { test: /\.(png|jpg|jpeg|gif|ico)$/, loader: 'file-loader?name=[path][name].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  output: {
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'this',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: path.join(__dirname, 'src/index.html')}
    ]),
    new ClosureCompilerPlugin({
      compiler: {
        language_in: 'ECMASCRIPT5',
        language_out: 'ECMASCRIPT5',
        compilation_level: 'SIMPLE',
        create_source_map: true
      },
      concurrency: 3
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true })
  ],
  target: 'web'
}
