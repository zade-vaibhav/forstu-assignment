const mongoose=require("mongoose")

const { Schema } = mongoose;

const studentProfile = new Schema({
  name: {type:String,required:true},
  email:{type:String,required:true,unique:true},
  enrollment_date:{type:String,unique:false},
  state:{type:String,default:"Maharashtra"},
  status:{type:String,default:"pending"},
  acedemic_data:{type:String}
});

const profile=mongoose.model("Profile",studentProfile)

module.exports=profile;