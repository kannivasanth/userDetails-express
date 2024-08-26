const express = require("express")
require("dotenv").config()
const cors = require('cors')
const dbConnect = require("./src/db/db")
const router = require("./src/router/userRouter")

const app = express()

app.use(express.json())
app.use(cors())
app.use('/',router)

dbConnect()

//homepage-route
app.get('/',(req,res)=>{
    res.send("<h1>User Details Express App</h1>")
})

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Sever started at : http://localhost:${port}`);
})