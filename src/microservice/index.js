
const {userPublicProxy,userSecureProxy,productProxy,userProxy,videoPublicProxy,videoSecureProxy,videoMediaProxy} = require("../proxyMiddlware/index")
const {authen} = require("../middleware/auth")

function microservices(app){
    app.use('/api/product',productProxy)
    app.use('/api/video/public',videoPublicProxy)
    app.use('/api/video/secure',[authen],videoSecureProxy)
    app.use("/api/video/media",videoMediaProxy)
    app.use('/api/user/public',userPublicProxy)
    app.use('/api/user/secure',[authen],userSecureProxy)
}

module.exports = microservices