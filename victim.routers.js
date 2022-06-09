const Routes=require('express')
const victimrouters= new Routes()
const victimcontroller=require('../controller/victim.controller')
victimrouters.put('/victim',victimcontroller.Createvictim)
victimrouters.get('/victim',victimcontroller.GetALL)
victimrouters.delete('/victim',victimcontroller.Deletevictim)
victimrouters.patch('/victim',victimcontroller.Editvictim)
module.exports=victimrouters
