const express=require("express")

const mongoose=require("mongoose")

const cors=require("cors")

const fileUploader=require("express-fileupload")

const bodyparser=require("body-parser") 

const dbobj=require("./config/dbconig") // connecting with dbconfig.js file

const Routersignup=require("./routers/router")// connecting with RouterProduct.js 

const app=express()

app.use(cors())

app.use("/uploads",express.static("uploads"))//

app.use(fileUploader())

app.use(bodyparser.json())

app.listen(2010,()=>{
    console.log("server started at port 2010 ")
})

const server=dbobj.dburl// using dburl property of object "dbobj"

mongoose.connect(server)

    .then(()=>{
        console.log("connected successfully !!")
    })

    .catch(function(err){
        console.log(err)
    })

app.use(express.urlencoded(true))

app.use("/save",Routersignup) // using RouterProduct
app.get("/",(req,resp)=>{
    resp.send("welcome to server");
})
