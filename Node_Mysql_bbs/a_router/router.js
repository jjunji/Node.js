var error = require("../error");
var bbs = require("../b_controller/bbs");
var user = require("../b_controller/user");
// request 를 분석해서 요청 url에 대한 연결
// url 을 분석
exports.parse = function (request, response){
    console.log("in router parse");
    var path = removeQuerystring(request.url);
    if(path == "/bbs"){
        //---> 주소로 요청된 모듈.js 로 보낸다. 요청주소가 /bbs 라면 bbs.js
        parseMethod(bbs, request, response);
    } else if(path == "/user"){
        parseMethod(user, request, response);
    } else {
        error.send(response, 404);
    }
};

// http 메서드를 분석
//---> 각 모듈별 method 분기처리
function parseMethod(module, request, response){
    console.log("in router parseMethod");
    if(request.method == "POST"){
        module.write(request, response);
    }else if(request.method == "GET"){
        module.read(getQuerystring(request.url), response);
    }else if(request.method == "PUT"){
        module.update(request, response);
    }else if(request.method == "DELETE"){
        module.delete(request, response);
    }
}
// http://localhost 
function removeQuerystring(fullUrl){
    var position = fullUrl.indexOf('?'); // ?의 위치값을 반환. 없으면 -1
    if(position == -1){
        return fullUrl;
    }else{
        return fullUrl.substring(0, position);
    }
}

function getQuerystring(fullUrl){
    var position = fullUrl.indexOf('?'); // ?의 위치값을 반환. 없으면 -1
    if(position == -1){
        return "";
    }else{
        return fullUrl.substring(position + 1);
    }
}