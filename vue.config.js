module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/coco" : "/",
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
};
