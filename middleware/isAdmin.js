let isAdmin = (req,res,next)=>{
    if(!req.isAuthenticated()){
     return res.render("/login")
}
next()
}



module.exports = isAdmin