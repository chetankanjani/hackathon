var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');


var UserSchema = mongoose.Schema({
    phoneNumber:{type:String},
    id:String,
    facebook:{id:String,token:String,name:String,email:String,pictureUrl:String},
    friends:[{id:String,pictureUrl:String,name:String}],
    mode:{type:String,default:true},
    lat:String,
    long:String

});


UserSchema.pre('save', function(next) {

    var user = this;


    if (!user.isModified('local.password')) return next();

    bcrypt.hash(user.local.password, null, null, function (err, hash) {
        if(err) return next(err);

        user.local.password = hash;
        next();

    });
});

UserSchema.methods.comparePassword = function(password) {

    var user = this;

    var a = bcrypt.compareSync(password, user.local.password);

    if (a == true)
        return true;
    else {
        console.log('error in compare password');
        return false;
    }

}


module.exports=mongoose.model('User',UserSchema);
