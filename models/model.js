const mongoose=require("mongoose")

//used for signup page schema
function getsignup(){
    let Product=new mongoose.Schema(
        {
            emails:{type:String,unique:true,index:true},
            pass:String,
            cpass:String,
            acctype:String
        },
        {
            versionKey:false // to avoid __v field in table
        }
    )

    const ProductModel=mongoose.model("Signup-page",Product)
    return ProductModel
}



//used for profile-Grower  page schema
function getprofile(){
    let Profile=new mongoose.Schema(
        {
            email:String,
            firstname:String,
            lastname:String,
            dealing:String,
            address:String,
            city:String,
            state:String,
            postalcode:Number,
            mobilenumber:Number,
            aadhaarnumber:Number,
            picpath:String
        },
        {
            versionKey:false
        }

       
    )
    const ProfileModel=mongoose.model("profile",Profile)
        return ProfileModel
}


// used for product avail
function getAvail(){
    let AvailedProducts=new mongoose.Schema(
        {   
            email:String,
            category:String,
            items:[],
            //selecteditems:[],
            city:String,
            picpath:String
        },
        {
            versionKey:false
        }
    )
    const AvailModel=mongoose.model("avail-items",AvailedProducts);
    return AvailModel;
}

//==============================================consumer========================================================================

//used for profile-consumer page schema
function getprofileconsumer(){
    let Profile=new mongoose.Schema(
        {
            email: { type: String, required: true, unique: true },
            firstname:String,
            lastname:String,
            address:String,
            city:String,
            state:String,
            postalcode:Number,
            mobilenumber:Number,
            aadhaarnumber:Number,
            picpath:String
        },
        {
            versionKey:false
        }

       
    )
    const ProfileModel=mongoose.model("profile-consumer",Profile)
        return ProfileModel
}

module.exports={getsignup,getprofile,getAvail,getprofileconsumer}

