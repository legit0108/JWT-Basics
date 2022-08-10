const jwt = require("jsonwebtoken")
const {BadRequestError} = require("../errors")

const login = async(req,res) =>{
    const {username,password} = req.body

    if(!username || !password){
        throw new BadRequestError("Please provide both username and password")
    }
    
    const id = new Date().getDate() // dummy id , normally id is provided by db
    
    // try to keep payload small , better experience for user
    // jwt key should be a hard one to guess/crack for use in production
    // we provided : payload , secret key , options in jwt.sign()

    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'})
                                    
    res.status(200).json({msg:'user created',token})
}

const dashboard = async(req,res) =>{
    const user = req.user
    const luckyNumber = Math.floor(Math.random()*100)
    
    res.status(200).json({msg:`Hello, ${user.username}`,secret: `Here is your authorized data, your lucky number is ${luckyNumber}`})
}

module.exports = {
    login,dashboard
}