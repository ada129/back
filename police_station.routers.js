const Routes=require('express')
const police_stationrouter=new Routes()
const Police_stationController=require('../controller/police_station')
police_stationrouter.put('/police_station',Police_stationController.Createpolice_station)
police_stationrouter.get('/police_station/:id',Police_stationController.GetOne)
police_stationrouter.delete('/police_station/:id',Police_stationController.Deletepolice_station)

module.exports=police_stationrouter