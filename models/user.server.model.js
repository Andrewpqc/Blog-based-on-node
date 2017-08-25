var mongoose=require('mongoose');

mongoose.model("User",{
    uid:{type:Number,unique:true},
    nickname:{type:String}
});