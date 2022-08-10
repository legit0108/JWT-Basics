const jwt = require("jsonwebtoken")
const {UnauthenticatedError} = require("../errors")

const authenticationMiddleware = async(req,res,next) => {
   const authHeader = req.headers.authorization

   if(!authHeader||!authHeader.startsWith('Bearer ')){
       throw new UnauthenticatedError("Invalid authorization attempt , please check if authorization field is present and well formatted , i.e. , starts with Bearer followed by JWT token")
   }
    
   const token = authHeader.split(' ')[1]

   try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const {id,username} = decoded
    
    req.user = {id,username}  
    next()  
   }catch(error){
       throw new UnauthenticatedError("JWT Token verification failed")
   }
}

module.exports = authenticationMiddleware