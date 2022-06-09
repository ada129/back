require('dotenv').config()
const express=require('express')
const port=process.env.PORT
const app=express()
const cors=require('cors')
app.use(cors())
const caserouter=require('./routes/case.routers')
const courtrouter=require('./routes/court.routers')
const police_stationrouter=require('./routes/police_station.routers')
const accusedrouter=require('./routes/accused.routers')
const courtworker=require('./routes/courtworker.routers')
const expertisetrouter=require('./routes/expertise.routers')
const juryrouter=require('./routes/jury.routers')
const lawyerrouter=require('./routes/lawyer.routers')
const policeoffrouter=require('./routes/police_officer.routers')
const userrouter=require('./routes/user.routers')
const victimrouter=require('./routes/victim.routers')
const witnessrouter=require('./routes/witness.routers')
const expertrouter=require('./routes/expert.routers')
const transerouter=require('./routes/transact.routers')
app.use(express.json())
app.use('/api',courtrouter)
app.use('/api',caserouter)
app.use('/api',police_stationrouter)
app.use('/api',expertrouter)
app.use('/api',accusedrouter)
app.use('/api',courtworker)
app.use('/api',expertisetrouter)
app.use('/api',juryrouter)
app.use('/api',lawyerrouter)
app.use('/api',policeoffrouter)
app.use('/api',userrouter)
app.use('/api',victimrouter)
app.use('/api',witnessrouter)
app.use('/api',transerouter)
app.listen(port,()=>console.log('start'))