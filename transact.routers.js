const Routes=require('express')
const transrrouters= new Routes()
const transactController=require('../controller/transact.controller')
transrrouters.put('/begin',transactController.Start)
transrrouters.put('/commit',transactController.Commit)
transrrouters.put('/rolleback',transactController.Rollback)
module.exports=transrrouters