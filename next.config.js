const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack(config, { isServer }){
    config.plugins.push(new Dotenv({ silent: true }));
    config.module.rules.push(
      {
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: { mode: ['react-component'] }
      }
    )

    if (!isServer) {
      config.node = {
        fs: "empty",
      }
    }

    return config;
  },
  
  webpackDevMiddleware(config){
    return config;
  },
};
