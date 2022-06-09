const Routes=require('express')
const accusedrouters= new Routes()
const accusedcontroller=require('../controller/accused.controller')
accusedrouters.put('/accused',accusedcontroller.Createaccused)
accusedrouters.get('/accused',accusedcontroller.GetALL)
accusedrouters.patch('/accused',accusedcontroller.Editaccued)
accusedrouters.delete('/accused',accusedcontroller.Deleteaccued)
module.exports=accusedrouters
