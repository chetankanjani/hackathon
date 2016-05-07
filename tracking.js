var mongoose = require('mongoose');

var config=require('./config');

var Location=require('./model/location');

var request=require('request');

var User=require('./model/user');


    module.exports=function(app, http){


// rooms which are currently available in chat
    var room = [];
    //var order=[];


    var  io = require('socket.io').listen(app);


    io.sockets.on('connection', function (socket) {

        console.log('new connection');

        socket.on("new user",function(data){

            console.log(' add user');
            //console.log(data);
            socket.id=data;
            socket.room=data;


            //console.log(socket.userid);
            //console.log(socket.room);

            //socket.emit('available rooms',room,order);


        });


        socket.on("Location Change",function(data){

            lat=data.lat;
            long=data.long;
            //console.log('location change');

            //console.log(data);
            User.findOneAndUpdate({'facebook.id':socket.id},{$set:{'lat':lat,'long':long}},function(err,location){

                if(err){
                    console.log(err);
                }
                else{
                    //console.log(location);
                }
            });

            User.findOne({'facebook.id':socket.id},function(err,user){

                if(err)
                    console.log(err);
                else {

                    var friendlist = [];

                    if (user != null) {
                        console.log("here" + user.friends[0].id);
                        //console.log();
                        //friendlist.push(user.friends[0].id);
                        //friendlist.push(user.friends[1].id);
                        //console.log(friendlist[0]);
                        //console.log(lat,long);
                        //console.log(friendlist)
                        io.emit('update marker', lat, long);

                        for (var i = 0; i < friendlist.length; i++) {

                            console.log(lat, long);
                            io.emit('update marker', lat, long);

                        }

                    }
                }

            });


        });



    });


    return io;




}