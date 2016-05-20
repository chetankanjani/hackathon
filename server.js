var config=require('./config');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var express = require('express');
var morgan=require('morgan');
var request=require('request');
var path=require('path');
var app = express();
var http = require('http');
var server = http.createServer(app);

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/app'));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/node_modules'));

mongoose.connect(config.database,function(err){
    if(err)
        console.log(err);
    else {
        console.log('database connected');
    }
});
app.get('/',function(req,res){
    res.json({"message":"Hello World!"});
});

server.listen(config.port,function(err){
    if(err)
        console.log(err);
    else
        console.log('server running at  '+config.port);

});

var api = require('./routes/api')(app, express);
var tracking=require('./tracking')(server,http);
app.use('/api',api);











