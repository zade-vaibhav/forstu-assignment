const mongoose=require("mongoose");

const {Schema}=mongoose;

const authSchema= new Schema({
     username:{type:String,require:true},
     email:{type:String,require:true,unique:true},
     password:{type:String,require:true,unique:true}   
})


const userModel= mongoose.model("Admin_register",authSchema)

module.exports=userModel