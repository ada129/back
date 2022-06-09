const Routes=require('express')
const lawyerrouters= new Routes()
const lawyercontroller=require('../controller/lawyer.controller')
lawyerrouters.put('/lawyer',lawyercontroller.Createlawyer)
lawyerrouters.get('/lawyernum',lawyercontroller.GetALL)
lawyerrouters.get('/lawyer',lawyercontroller.GetOne)
lawyerrouters.delete('/lawyer',lawyercontroller.Deletelawyer)
lawyerrouters.patch('/lawyer',lawyercontroller.Editelawyer)
module.exports=lawyerrouters