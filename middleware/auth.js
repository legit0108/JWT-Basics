const jwt = require("jsonwebtoken")
const CustomAPIError = require("../errors/custom-error")

const authenticationMiddleware = async(req,res,next) => {
   const authHeader = req.headers.authorization

   if(!authHeader||!authHeader.startsWith('Bearer ')){
       throw new CustomAPIError("Invalid authorization attempt , please check if authorization field is present and well formatted , i.e. , starts with Bearer followed by JWT token",401) // invalid auth status code is 401
   }
    
   const token = authHeader.split(' ')[1]

   try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const {id,username} = decoded
    
    req.user = {id,username}  
    next()  
   }catch(error){
    throw new CustomAPIError('JWT token verification failed',401)  
   }
}

module.exports = authenticationMiddleware