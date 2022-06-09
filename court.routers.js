const Routes=require('express')
const courtrouter=new Routes()
const CourtController=require('../controller/court.controller')
courtrouter.put('/court',CourtController.Createcourt)
courtrouter.get('/court',CourtController.GetOne)
courtrouter.delete('/court',CourtController.Deletecourt)

module.exports=courtrouter