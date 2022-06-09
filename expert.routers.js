const Routes=require('express')
const expertrouter=new Routes()
const ExpertController=require('../controller/expert.controller')
expertrouter.put('/expert',ExpertController.Createexert)
expertrouter.get('/expert',ExpertController.GetOne)
expertrouter.delete('/expert',ExpertController.Deleteexpert)
expertrouter.patch('/expert',ExpertController.EditExpert)

module.exports=expertrouter