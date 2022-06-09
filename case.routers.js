const Routes=require('express')
const caserouter=new Routes()
const CaseController=require('../controller/case.controller')
caserouter.put('/Case',CaseController.Createcase)
caserouter.get('/Delo',CaseController.GetALL)
caserouter.get('/Case',CaseController.GetId)
caserouter.patch('/Case',CaseController.Editcase)
caserouter.delete('/Case',CaseController.Deletecase)

module.exports=caserouter