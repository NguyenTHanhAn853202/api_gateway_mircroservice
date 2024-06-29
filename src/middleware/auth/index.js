const jwt = require('jsonwebtoken')
const secretKey = process.env.ACCESS_TOKEN
const refreshKey = process.env.REFRESH_TOKEN


const authen = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token,secretKey,(err,decoded)=>{
            if(err){
                return res.status(401).json({
                    message:"the token is invalid"
                })
            }
            req.user = decoded
            next()
        })
    } catch (error) {
        return res.status(403).json({
            message:error.message 
        })
    }
}

const refreshToken = async(req,res)=>{
    try {
        const token = req.cookies.refreshToken
        jwt.verify(token,refreshKey,(err,decoded)=>{
            if(err){
                return res.status(401).json({
                    message:"the token is invalid"
                }) 
            }

            const accessToken = jwt.sign(decoded,secretKey,{expiresIn:'30s'})

            return res.cookie('accessToken',accessToken)

        })
    } catch (error) {
        return res.status(403).json({
            message:"the error"
        }) 
    }
}

module.exports = {refreshToken,authen}