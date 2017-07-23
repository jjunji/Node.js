var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var http = require('http');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(function (request, response, next) {
    console.log(request.body.name);
    console.log(request.body.age);
    response.cookie('user',{'id':'전지', 'pw':'1234'});
    response.end();
});
var server = http.createServer(app);
    server.listen(4567,function () {
    console.log("Server is running")
});