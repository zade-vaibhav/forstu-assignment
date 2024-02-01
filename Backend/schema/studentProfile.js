const mongoose=require("mongoose")

const { Schema } = mongoose;

const studentProfile = new Schema({
  name: {type:String,required:true},
  email:{type:String,required:true,unique:true},
  enrollment_date:{type:String,unique:false},
  state:{type:String,default:"Maharashtra"},

});

const profile=mongoose.model("Profile",studentProfile)

module.exports=profile;