const Routes=require('express')
const userrouters= new Routes()
const usercontroller=require('../controller/user.controller')
userrouters.put('/user',usercontroller.autorizat)
module.exports=userrouters