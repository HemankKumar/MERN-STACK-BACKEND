const {getsignup}=require("../models/model")

const {getprofile}=require("../models/model")

const{getAvail}=require("../models/model")

const{getprofileconsumer}=require("../models/model")

const path=require('path');

const ProductModel=getsignup()

const ProfileModel=getprofile()

const AvailModel=getAvail()

const getprofileconsumers=getprofileconsumer()

// signup data saving
function Dosavesignup(req,resp){
    const doc=new ProductModel(req.body)

    doc.save()

    .then((retDoc)=>{
        resp.set("json");
        resp.json({status:true,rec:retDoc})
    })

    .catch((err)=>{
        resp.json({status:false,msg:"duplicate entry",err:err.message,req:req.body})
    })
}

// profile data saving(Grower)
function Dosaveprofile(req,resp){
    let filename="nopic.jpg"

    if(req.files!=null){
        filename=req.files.pic.name
        var filepath=path.join(__dirname,"..","uploads",filename)
        req.files.pic.mv(filepath)

    }

    req.body.picpath=filename

    const doc=new ProfileModel(req.body)
    doc.save()

    .then((retDoc)=>{
        resp.set("json")
        resp.json({status:true,rec:retDoc})
    })

    .catch((err)=>{
        resp.json({status:false,msg:"duplicate entry",err:err.message,req:req.body})
    })
    
}

//profile data fetching/searching(Grower)
function dosearchprofile(req, resp)
{   console.log(req.query)
    ProfileModel.findOne({email:req.query.email}).then((result) => {

        resp.json({status:true, obj:result});


    }).catch(function()
    {
        resp.json({ status: false,err:err.message }); 
    }) 

}




//profile data updating(Grower)
function Doupdateprofile(req, resp) {

    //fetching the data from the request body
    const { email,firstname, lastname, dealing ,address, city, state ,postalcode,mobilenumber,aadhaarnumber} = req.body;

    //fetching the files from the req.files object
    const picpath = req?.files?.pic;
   
    
    let ppicName  = picpath?.name;
    
    console.log(picpath)
    
    //checking if the profilepic is present
    if (picpath) {

        ppicName = `${picpath.name}`;

        let profilepicPath = `${__dirname}/../uploads/${picpath.name}`;
        

        picpath.mv(profilepicPath, (err) => {
            if (err) {
                console.log("Error uploading the profile pic ", err);
            }
        })

    }
    else{
        profilepicPath = req.body.hdn;
        console.log(profilepicPath);
    }




    //updating the data in the database
    ProfileModel.findOneAndUpdate({ email }, {
        email,firstname, lastname, dealing ,address, city, state ,postalcode,mobilenumber,aadhaarnumber,
        picpath: ppicName
    }, { new: true })
        .then((doc) => {
            return resp.status(200).json({
                success: true,
                message: "Profile updated successfully !!",
                profile: doc
            })
        }).catch((err) => {
            return resp.status(500).json({
                success: false,
                message: "Error updating the profile !!",
                error: err
            })
        })

}


//login controller
const loginHandler = async (req , resp)=>{

    //fetching the data from req body
    const {emails , pass} = req.body;
    

    //finding the user from the database
    let chkUsr ;
    await ProductModel.findOne({emails}).then((doc)=>{
        chkUsr = doc;
    }).catch((err)=>{
        return resp.json({
            status:false,
            message:"Internal server error while finding the user",
            error:err.message,
        })
    })

    //checking whether the user exists or not
    if(!chkUsr){
        return resp.json({
            status:false,
            message:"User does  not exist , Please sign up first."
        })
    }


    //checking the password - using bcryot library compare method 
    if(pass===chkUsr.pass){

        chkUsr.pass = undefined;

        //sending the response.
        resp.json({
            status:true,
            user : chkUsr,
            message:"User logged in succesfully",
        })
    }

    else{
        resp.status(400).json({
            status:false,
            message:"Password didn't match.",
        })
    }

}

//used to save  avail-items data
function Dosaveproduct(req,resp){

    let filename="nopic.jpg"

    if(req.files!=null){
        filename=req.files.pic.name
        var filepath=path.join(__dirname,"..","uploads",filename)
        req.files.pic.mv(filepath)

    }

    req.body.picpath=filename
    
    const doc=new AvailModel(req.body);
    
    doc.save()
    .then((retDoc)=>{
        resp.set("json");
        resp.json({status:true,rec:retDoc})
    })

    .catch(()=>{
        resp.json({status:false})
    })
}


//used to fetch data of avail items in item manager

function dosearchitems(req,resp)
{
    console.log(req.query);
    AvailModel.find({email:req.query.email})
    

    .then((retdoc)=>{
        console.log(retdoc);
        if(retdoc!=[])
          resp.json({status:1,res:retdoc})
        else
          resp.json({status:2,res:"Wrong EmailId"})
        })

    .catch((err)=>{
        resp.json({status:0,err:err.message})
    })

}

//used to delete items in item manager.jsx.

function doDeleteProduct(req, resp) {
    console.log(req.body);
    AvailModel.deleteOne({ email: req.body.email,  items: req.body.items}).then(function (ans) {
        console.log(ans);
        // resp.send(ans);
        if (ans.deletedCount == 1)
            resp.json({ status: true, mesg: "Deleted" });
        else
            resp.json({ status: true, mesg: "invalid item" });
    }).catch(() => {
        // resp.send({err:"error"});
        resp.json({ status: false, err: err.message });
    })
}





//=========================================Consumer========================================================================================

// profile data saving(consumer)
function Dosaveprofiles(req, resp) {
    let filename = "nopic.jpg";

    if (req.files != null) {
        filename = req.files.pic.name;
        var filepath = path.join(__dirname, "..", "uploads", filename);
        req.files.pic.mv(filepath);
    }

    req.body.picpath = filename;

    // Check if email already exists
    getprofileconsumers.findOne({ email: req.body.email })
        .then((existing) => {
            if (existing) {
                return resp.status(409).json({
                    status: false,
                    msg: "Email already exists",
                    err: "Duplicate email"
                });
            }

            // If not existing, proceed to save
            const doc = new getprofileconsumers(req.body);
            return doc.save()
                .then((retDoc) => {
                    resp.set("json");
                    resp.json({ status: true, rec: retDoc });
                });
        })
        .catch((err) => {
            resp.status(500).json({
                status: false,
                msg: "Internal server error",
                err: err.message
            });
        });
}


//profile data fetching/searching(consumer)
function dosearchprofiles(req, resp)
{   console.log(req.query)
    getprofileconsumers.findOne({email:req.query.email}).then((result) => {

        resp.json({status:true, obj:result});


    }).catch(function()
    {
        resp.json({ status: false,err:err.message }); 
    }) 

}




//profile data updating(consumer)
function Doupdateprofiles(req, resp) {

    //fetching the data from the request body
    const { email,firstname, lastname, dealing ,address, city, state ,postalcode,mobilenumber,aadhaarnumber} = req.body;

    //fetching the files from the req.files object
    const picpath = req?.files?.pic;
   
    
    let ppicName  = picpath?.name;
    
    console.log(picpath)
    
    //checking if the profilepic is present
    if (picpath) {

        ppicName = `${picpath.name}`;

        let profilepicPath = `${__dirname}/../uploads/${picpath.name}`;
        

        picpath.mv(profilepicPath, (err) => {
            if (err) {
                console.log("Error uploading the profile pic ", err);
            }
        })

    }
    else{
        profilepicPath = req.body.hdn;
        console.log(profilepicPath);
    }




    //updating the data in the database
    getprofileconsumers.findOneAndUpdate({ email }, {
        email,firstname, lastname, dealing ,address, city, state ,postalcode,mobilenumber,aadhaarnumber,
        picpath: ppicName
    }, { new: true })
        .then((doc) => {
            return resp.status(200).json({
                success: true,
                message: "Profile updated successfully !!",
                profile: doc
            })
        }).catch((err) => {
            return resp.status(500).json({
                success: false,
                message: "Error updating the profile !!",
                error: err
            })
        })



}








module.exports={Dosavesignup,doDeleteProduct,Dosaveprofile,dosearchprofile,Doupdateprofile,loginHandler,Dosaveproduct,dosearchitems,Dosaveprofiles,dosearchprofiles,Doupdateprofiles}