const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function(app) {
  app.use(
    createProxyMiddleware("/slack", {
      target: "https://hooks.slack.com/services/",
      changeOrigin: true,
      pathRewrite: {
        "^/slack": ""
      }
    })
  )
}