const express=require("express")

const{Dosavesignup,loginHandler, dosearchitems, doDeleteProduct}=require("../controllers/controller")

const{Dosaveprofile}=require("../controllers/controller")

const{dosearchprofile}=require("../controllers/controller")

const{Doupdateprofile}=require("../controllers/controller")

const{ Dosaveproduct}=require("../controllers/controller")


//====================================================consumer===================================

const{Dosaveprofiles}=require("../controllers/controller")
const{dosearchprofiles}=require("../controllers/controller")
const{Doupdateprofiles}=require("../controllers/controller")



//----------------------------------------------------------------------------------------------------------------------------------------------------------


const app=express.Router()


//================================================Grower============================================================

app.post("/savesignup",Dosavesignup)

app.post("/saveprofile",Dosaveprofile)//for Grower

app.get("/fetch-profile",dosearchprofile)//for Grower

app.post("/update-profile",Doupdateprofile)//for Grower

app.post("/checklogin",loginHandler)

app.post("/save-avail-product",Dosaveproduct)

app.get("/fetch-items",dosearchitems)

app.post("/delete-fetch-products",doDeleteProduct)

//=================================================Consumer==============================================================

app.post("/saveprofileconsumer",Dosaveprofiles)

app.get("/fetch-profile-consumer",dosearchprofiles)

app.post("/update-profile-consumer",Doupdateprofiles)



module.exports=app;