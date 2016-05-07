var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');


var UserSchema = mongoose.Schema({
    name: String,
    username: {type: String },
    pickUpAddress:{street:String,area:String,city:String,pincode:String,state:String},
    phoneNumber:{type:String,unique:true},
    status:{type:String,default:'Active'}

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
