// vue.config.js
module.exports = {
  devServer: {
    // public: "0.0.0.0:8080",
    // disableHostCheck: true,
    // proxy: "http://localhost:9090/",
    // publicPath: "/",
    proxy: {
      "/socket.io": {
        target: "http://localhost:9090/",
        secure: false,
        ws: true,
      },
      // "/sockjs-node": {
      //   target: "http://localhost:9090/",
      //   secure: false,
      //   ws: true,
      // },
    },
    allowedHosts: [".datadrivendiscovery.org"],
  },
};
