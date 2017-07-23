# Database 연결

### server.js
```JavaScript
// 1. 서버모듈
var http = require("http");
var router = require("./module/router");
// 2. 서버를 생성
var server = http.createServer(function(request, response){
    // 요청 url 분석
    console.log("in server");
    router.parse(request, response);
});
// 3. 서버를 시작 , 생성한 서버가 80번 포트를 리스닝 하도록 지정.
server.listen(80, function(){
    console.log("server's running...");
});
```
* 서버가 생성되면 router 모듈의 parse( ) 함수 실행.

--- 
### router.js
코드 작성 후 터미널에서 node server(js파일 명) 으로 실행. -> 진입점.
```JavaScript
var error = require("../error");
var bbs = require("../bbs");
var user = require("../user");
// request 를 분석해서 요청 url에 대한 연결
// url 을 분석
exports.parse = function (request, response){
    console.log("in router parse");
    var path = splitQuerystring(request.url);
    if(path == "/bbs"){
        parseMethod(bbs, request, response);
    } else if(path == "/user"){
        parseMethod(user, request, response);
    } else {
        error.send(response, 404);
    }
};

// http 메서드를 분석
function parseMethod(module, request, response){
    console.log("in router parseMethod");
    if(request.method == "POST"){
        module.write(request, response);
    }else if(request.method == "GET"){
        module.read(response);
    }else if(request.method == "PUT"){
        module.update(response);
    }else if(request.method == "DELETE"){
        module.delete(response);
    }
}
// http://localhost 
function splitQuerystring(fullUrl){
    var position = fullUrl.indexOf('?'); // ?의 위치값을 반환. 없으면 -1
    if(position == -1){
        return fullUrl;
    }else{
        return fullUrl.substring(0, position);
    }
}
```
* exports.parse
	-> exports 객체를 통해 parse 모듈 생성.
*  parse 모듈은 아래와 같은 기능을 수행한다.
	*  var path = splitQuerystring(request.url);
	-> path 변수에 splitQuerystring 함수로 부터 반환된 값을 담는다.
	    전달 한 값 : 요청 주소.url -> 요청 주소를 보낸다.
	    반환 된 값 :  요청 주소가 조건에 맞으므로 요청 주소를 그대로 갖는다.
	* splitQuerystring 함수에서 indexOf( ) 는 문자열 또는 배열에서 원하는 특정 문자의
	  위치값을 index로 반환하는 함수이다. -> '?' 위치 나옴.
	* fullUrl.substring(0, position) -> '?' 를 기준으로 문자열을 나눔. -> ? 이전의 주소 반환
	* 조건문에 맞는 인자를 parseMethod 함수로 보낸다.
* parseMethod 함수는 아래와 같은 기능을 수행한다.
	* request.method( ) 를 통해 요청 타입 분석.
	* 각 타입에 맞는 모듈 실행 -> ex) post 타입이면 module.write( ) 수행.

---
### bbs.js
ㅇㅇㅇ
```JavaScript
var dao = require("./bbsDao");
exports.read = function(response){
    send(response, "READ");
}
exports.write = function(request, response){
    console.log("in bbs write");
    // 데이터를 꺼내자
    var postdata = "";
    request.on('data', function(data){ // 데이터를 읽을 수 있을 때 호출
        postdata = postdata + data;
    });
    request.on('end', function(){ // 데이터를 다 읽었을 때 호출
        var dataObj = JSON.parse(postdata);
        dao.insert(dataObj, function(){
            send(response, "WRITE Success!");
        });
    });
}
exports.update = function(response){
    send(response, "UPDATE");
}
exports.delete = function(response){
    send(response, "DELTE");
}

function send(response, flag){
    response.writeHead(200,{'Content-Type':'text/html'});
    response.end("BBS "+flag);
}
```
ㅇㅇㅇ

---

