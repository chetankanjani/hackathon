var mongoose = require('mongoose');
var User = require('../model/user');

var jsonwebtoken = require('jsonwebtoken');
var request=require('request');



var config = require('../config');


function createToken(user) {                                                           //creating token for authentication

    var token = jsonwebtoken.sign({

        _id: user._id,
        phoneNumber: user.phoneNumber,


    }, config.superSecretCustomer, {
        expiresInMinutes: 1440

    });


    return token;


}


module.exports = function (app, express) {

    var api = express.Router();



    //
    //api.post('/signup', function (req, res) {                                                  //for local signup
    //
    //    var user = new User();
    //
    //    user.phoneNumber=req.body.phoneNumber;
    //    user.name=req.body.name;
    //
    //    user.pickUpAddress.street=req.body.street;
    //    user.pickUpAddress.pincode=req.body.pincode;
    //    user.pickUpAddress.area=req.body.area;
    //    user.pickUpAddress.state=req.body.state;
    //    user.pickUpAddress.city=req.body.city;
    //
    //
    //
    //
    //    user.save(function (err) {
    //        if (err) {
    //            if (err.code == 11000)
    //                return res.json({message: "User with this phone number already exist ", success: false});
    //            else {
    //                console.log(err);
    //                return res.json({message: "User not created", success: false});
    //
    //            }
    //        }
    //        else
    //            return res.json({message: "User created Successfully!", success: true});
    //
    //
    //    });
    //
    //});
    //

    //
    //api.post('/login',function(req,res){
    //
    //    var phoneNumber=req.body.phoneNumber;
    //
    //    User.findOne({'phoneNumber':phoneNumber},function(err,user){
    //
    //
    //        if(err)
    //            res.json(err);
    //        else if(!user){
    //
    //            res.json({"success":false,"message":"user does not exist"});
    //
    //        }
    //        else if(user){
    //
    //
    //            if(user.status=='Active') {
    //
    //
    //                var token = createToken(user);
    //
    //                res.json({"success": true, "token": token});
    //            }
    //            else
    //                res.json({"success":true,"message":"User blocked"});
    //        }
    //    });
    //});



    //////authentication
    //api.use(function(req, res, next) {
    //
    //
    ////console.log("Somebody just came to our app!");
    //
    //var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    //
    //// check if token exist
    //if(token) {
    //
    //jsonwebtoken.verify(token, config.superSecretCustomer, function(err, decoded) {
    //
    //if(err) {
    //res.status(403).send({ success: false, message: "Failed to authenticate user"});
    //    }
    //
    //});
    //} else {
    //    res.status(403).send({ success: false, message: "No Token Provided"});
    //}
    //
    //});






    return api;

}
