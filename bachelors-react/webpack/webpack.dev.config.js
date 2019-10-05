const webpack = require('webpack');
const baseConfig = require('./base');


module.exports = {
  ...baseConfig,
  mode: 'development',

  devServer: {
    inline: true,
    historyApiFallback: true,
    compress: true,
    port: 1233,
    hotOnly: true,
    host: '0.0.0.0',
  },

  plugins: [
    ...baseConfig.plugins,

    new webpack.LoaderOptionsPlugin({ debug: true }),

    new webpack.HotModuleReplacementPlugin(),
  ],
};
