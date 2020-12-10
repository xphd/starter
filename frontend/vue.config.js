// vue.config.js
module.exports = {
  devServer: {
    // disableHostCheck: true,
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
      "/cong": {
        target: "http://localhost:9090/",
        secure: false,
        ws: true,
        // pathRewrite: {
        //   "^cong": "",
        // },
      },
    },
    allowedHosts: [".datadrivendiscovery.org"], // include this to avoid "invalid host header" error
  },
};
