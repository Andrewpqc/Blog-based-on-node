var mongoose=require('mongoose');

mongoose.model("User",{
    nickname:{type:String,unique:true},
    password:{type:String},
    email:{type:String,unique:true}
});