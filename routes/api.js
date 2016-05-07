var mongoose = require('mongoose');
var User = require('../model/user');

var jsonwebtoken = require('jsonwebtoken');
var request=require('request');



var config = require('../config');


function createToken(user) {                                                           //creating token for authentication

    var token = jsonwebtoken.sign({

        id: user.id


    }, config.superSecret, {
        expiresIn: 1440

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


    api.post('/login',function(req,res){

        var id=req.body.id;

        User.findOne({'facebook.id':id},function(err,user){


            if(err)
                res.json(err);

            else if(user){



                var token = createToken(user);


                res.json({"success": true, "token": token});

            }
            else {

                var user = new User();
                console.log(req.body.id);
                user.id=req.body.id;
                //console.log(request.)

                user.facebook.id = req.body.id;
                user.facebook.name = req.body.name;
                user.facebook.email = req.body.email;
                user.facebook.token = req.body.token;
                user.facebook.pictureUrl=req.body.pictureUrl;
                console.log(user);

                user.save(function (err) {
                    if (err) {
                        if (err.code == 11000)
                            return res.json({message: "User with this phone number already exist ", success: false});
                        else {
                            console.log(err);
                            return res.json({message: "User not created", success: false});

                        }
                    }
                    else {

                        var token=createToken(user);
                        return res.json({message: "User created Successfully!", success: true,token:token});
                    }


                });

            }


        });
    });


    ////// Middleware
    //api.use(function (req,res,next) {
    //    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    //
    //    if(token){
    //        jsonwebtoken.verify(token, secretKey, function(err, decoded){
    //            if(err){
    //                res.status(403).send({success: false, message: "Failed to connect"});
    //            }else {
    //                req.decoded= decoded;
    //                next();
    //            }
    //        });
    //    }else {
    //
    //        res.status(403).send({success: false, message: "false token"});
    //    }
    //
    //});
    api.get('/getAllUsers',function(req,res){


        //var id=req.param.user_id;

        User.find({}, function (err, users) {
            if (err) {
                res.send(err);
                return;
            }
            else if(users) {

                res.json(users);
            }
            else
                res.json(null);
        });

    });

    api.get('/getAllFriends',function(req,res){


        //var id=req.param.user_id;

        User.findOne({'facebook.id': req.param.id}, function (err, users) {
            if (err) {
                res.send(err);
                return;
            }
            else if(users) {

                res.json(users.friends);
            }
            else
                res.json(null);
        });

    });
    api.post('/addFriend', function(req, res) {
            id=req.body.id;
            friendid=req.body.id;
        User.findOneAndUpdate({ 'facebook.id': id },
            { $push: { friends:{ id:friendid}}},
            { upsert: true },
            function(fav) { res.json({success:true}); });
    });

    api.post('/removeFriend', function (req, res) {
        // _id: req.body.id;
        User.findOneAndUpdate({'facebook.id': req.param.id},
            {$pull: {friends: {name: req.body.name}}},
            function (err) {
                if (err)
                    return err;
                else
                    res.json({success: true});
            });
    });
    api.post('/updatephoneNumber',function(req,res){
        User.update({"facebook.id": req.param.id},{$set:{'phoneNumber': req.body.phoneNumber}}, function (err, name) {
            if(err){
                res.send(err);
                return;
            }
            res.json({success:true});
        })
    })


    return api;

}
