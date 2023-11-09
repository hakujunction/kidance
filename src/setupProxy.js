const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: "http://localhost:3001",
      target: "https://staging.haku.underoot.dev",
      changeOrigin: true,
    })
  );
};
