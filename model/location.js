var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var LocationSchema = mongoose.Schema({
    lat:{type:String},
    long:{type:String},
    fbid:{type:String}
});




module.exports=mongoose.model('Location',LocationSchema);
