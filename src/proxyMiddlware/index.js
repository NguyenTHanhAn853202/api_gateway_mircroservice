const {createProxyMiddleware} = require("http-proxy-middleware")
const simpleRequestLogger = require("../utils/proxyServer")

const productProxy = createProxyMiddleware({
    target:'http://localhost:3001/api/v1/products',
    changeOrigin:true,  
})

// user
const userPublicProxy = createProxyMiddleware({
    target:'http://localhost:3002/api/v1/user/public',
    changeOrigin:true
})

const userSecureProxy = createProxyMiddleware({
    target:'http://localhost:3002/api/v1/user/secure',
    changeOrigin:true,
    plugins:[simpleRequestLogger]
})


// video
const videoPublicProxy = createProxyMiddleware({
    target:'http://localhost:3003/api/v1/video/public',
    changeOrigin:true
})

const videoSecureProxy = createProxyMiddleware({
    target:'http://localhost:3003/api/v1/video/secure',
    changeOrigin:true,
    plugins:[simpleRequestLogger]
})

const videoMediaProxy = createProxyMiddleware({
    target:'http://localhost:3003',
    changeOrigin:true,
})





module.exports = {videoSecureProxy,videoPublicProxy,userPublicProxy,productProxy,videoMediaProxy,userSecureProxy}