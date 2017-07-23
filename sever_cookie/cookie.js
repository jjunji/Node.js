var express = require('express');
var cookieParser = require('cookie-parser');
var http = require('http');

var app = express();
app.use(cookieParser());

app.use(function(req,res,next)
{
   res.cookie('user',{"name":"Kim","pw":"sdsf"});
   res.send("OK");
});


var server = http.createServer(app);
server.listen(3000,function(){console.log("server is running")});