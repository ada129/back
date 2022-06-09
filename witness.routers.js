const Routes=require('express')
const witnessrouters= new Routes()
const witnesscontroller=require('../controller/witness.controller')
witnessrouters.put('/witness',witnesscontroller.Createwitnes)
witnessrouters.get('/witness',witnesscontroller.GetALL)
witnessrouters.delete('/witness',witnesscontroller.Deletewitness)
witnessrouters.patch('/witness',witnesscontroller.Editewitness)
module.exports=witnessrouters
