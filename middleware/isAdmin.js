let isAdmin = (req,res,next)=>{
    if(!req.isAuthenticated()){
     return res.render("admin/login")
}
next()
}



module.exports = isAdmin