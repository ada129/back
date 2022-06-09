const Routes=require('express')
const juryrouters= new Routes()
const jurycontroller=require('../controller/jury.controller')
juryrouters.put('/jury',jurycontroller.Createejurry)
juryrouters.get('/jury',jurycontroller.GetALL)
juryrouters.delete('/jury',jurycontroller.DeleteJurry)
juryrouters.patch('/jury',jurycontroller.Editejurry)
module.exports=juryrouters
