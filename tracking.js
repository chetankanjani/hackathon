var mongoose = require('mongoose');
var config=require('./config');
var User=require('./model/user');

    module.exports=function(app, http){

    var room = [];

    var  io = require('socket.io').listen(app);


    io.sockets.on('connection', function (socket) {

        //console.log('new connection');
        socket.on('disconnect', function () {

           room[socket.userid]=null;

        });

        socket.on("new user",function(data) {

            console.log('new user came');
            socket.join(socket.id);
            room[data]=socket.id;
            socket.userid=data;

        });

        socket.on("Location Change",function(data){

            lat=data.lat;
            long=data.long;


            User.findOne({'facebook.id':socket.userid},function(err,user){

                if(err)
                    console.log(err);
                else {

                    if (user != null) {

                        if(user.friends!=null)
                        for (var i = 0; i < user.friends.length; i++) {

                            if(room[user.friends[i].id]!=null) {
                                io.sockets.connected[room[user.friends[i].id]].emit('update marker', lat, long,socket.userid);
                            }
                        }
                    }
                }
            });
        });
    });
    return io;
}