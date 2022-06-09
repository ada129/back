const Routes=require('express')
const policerouters= new Routes()
const policecontroller=require('../controller/police_officer.controller')
policerouters.put('/policeof',policecontroller.Createpolice_off)
policerouters.get('/policeofnum',policecontroller.GetALL)
policerouters.get('/policeof',policecontroller.GetOne)
policerouters.delete('/policeof',policecontroller.Deletecountwoker)
policerouters.patch('/policeof',policecontroller.Editpolice_off)
module.exports=policerouters