const Routes=require('express')
const expertiserouters= new Routes()
const expertiecontroller=require('../controller/expertise.controller')
expertiserouters.put('/expertise',expertiecontroller.Createexpertie)
expertiserouters.get('/expertisenum',expertiecontroller.GetALL)
expertiserouters.get('/expertise',expertiecontroller.GetOne)
expertiserouters.delete('/expertise',expertiecontroller.Deleteexpertise)
expertiserouters.patch('/expertise',expertiecontroller.Editexpertise)
module.exports=expertiserouters