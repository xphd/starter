// vue.config.js
module.exports = {
  devServer: {
    publicPath: "/",
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
