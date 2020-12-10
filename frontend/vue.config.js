// vue.config.js
module.exports = {
  devServer: {
    host: "0.0.0.0", // have this to avoid localhost/socketjs-node info ERR_CERT_AUTHORITY_INVALID
    // https: false,
    // hot: true,
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
