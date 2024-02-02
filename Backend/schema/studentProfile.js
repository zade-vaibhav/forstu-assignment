const mongoose=require("mongoose")

const { Schema } = mongoose;

const acedemicSchema=new Schema({
  english:{type:Number},
      hindi:{type:Number},
      maths:{type:Number},
      science:{type:Number},
      project:{type:Number}
})

const presnalData=new Schema({
  academic:acedemicSchema,
  income:{type:Number},
  activity:{
    one:{type:String},
    two:{type:String},
    three:{type:String}
  },
  occupation:{type:String}

})

const studentProfile = new Schema({
  name: {type:String,required:true},
  email:{type:String,required:true,unique:true},
  enrollment_date:{type:String,unique:false},
  state:{type:String,default:"Maharashtra"},
  schlorship:{
   status:{ type:String,default:"pending"},
   percentage:{type:String,default:"0%"}
  },
  acedemic_data:presnalData
});

const profile=mongoose.model("Profile",studentProfile)

module.exports=profile;

