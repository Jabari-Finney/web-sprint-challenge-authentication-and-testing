const User = require('./../users/users-model')

const validatePayload = async (req,res,next)=>{
    try{
        const {username,password} = req.body
        if(!username|| !password){
            next({status:401,message:'username and password required'})
        }else{
            next()
        }
    }catch(err){
        next(err)
    }
}

const usernameTaken = async (req,res,next) =>{
    try{
        const [user] = await User.getBy({username:req.body.username}) 
        if(user){
            next({status:401,message:'username taken'})
        }else{
            next()
        }
    }catch(err){
        next(err)
    }
}

const usernameExists = async (req, res, next) => {
   try{
    const [user] = await User.getBy({username:req.body.username})
      if(!user){
        next({status:401, message:'Invalid credentials'})
      }else{
        req.user = user
        next()
      }
    }catch(err){
      next(err)
    }
  }

module.exports = {
    usernameExists,
    validatePayload,
    usernameTaken
    
}