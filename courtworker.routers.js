const Routes=require('express')
const courtworkerrouters= new Routes()
const courtworkercontroller=require('../controller/courtwoker.controller')
courtworkerrouters.put('/courtwork',courtworkercontroller.Createcourtwoker)
courtworkerrouters.get('/courtwork',courtworkercontroller.GetALL)
courtworkerrouters.delete('/courtwork',courtworkercontroller.Deletecountwoker)
courtworkerrouters.patch('/courtwork',courtworkercontroller.Editcountwoker)
module.exports=courtworkerrouters