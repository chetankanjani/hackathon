var config=require('./config');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var express = require('express');
var morgan=require('morgan');
var request=require('request');
var path=require('path');


var app = express();


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(morgan('dev'));



//app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/'));








mongoose.connect(config.database,function(err){
    if(err)
        console.log(err);
    else {
        console.log('database connected');
    }

});


app.get('/',function(req,res){
    //res.sendFile(__dirname +'/public/index.html' );
    res.json({message:"hello"});
});


app.listen(config.port,function(err){
    if(err)
        console.log(err);
    else
        console.log('server running at  '+config.port);

});


var api = require('./routes/api')(app, express);


app.use('/api',api);










