const simpleRequestLogger = (proxyServer, options) => {
    proxyServer.on('proxyReq', (proxyReq, req, res) => {
        proxyReq.setHeader("X-User-Data",req.user._id)
        
});
} 
module.exports = simpleRequestLogger