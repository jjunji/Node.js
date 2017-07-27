Nodejs - Database 연동
======================

전체 프로세스
-------------

![](https://github.com/jjunji/Node.js/blob/master/Node_Mysql_bbs/c_dao/bbs%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4.PNG)
-------------------------------------------------------------------------------------------------------------------

콜백 동작 과정
--------------

![](https://github.com/jjunji/Node.js/blob/master/Node_Mysql_bbs/c_dao/process1.jpg)

![](https://github.com/jjunji/Node.js/blob/master/Node_Mysql_bbs/c_dao/process2.jpg)
------------------------------------------------------------------------------------

### server.js

코드 작성 후 터미널에서 node server(js파일 명) 으로 실행. -> 진입점.`JavaScript
// 1. 서버모듈
var http = require("http");
var router = require("./a_router/router");
// 2. 서버를 생성
var server = http.createServer(function(request, response){
    // 요청 url 분석
    console.log("in server");
    //---> 모든 요청에 대해 router.js 로 보낸다
    router.parse(request, response);
});
// 3. 서버를 시작 , 생성한 서버가 80번 포트를 리스닝 하도록 지정.
server.listen(80, function(){
    console.log("server's running...");
});
`* 서버가 생성되면 router 모듈의 parse( ) 함수 실행.

---

### router.js

요청 url과 메소드를 분석하고 요청 url에 매핑되는 비즈니스 로직을 호출(경로 처리)\`\``JavaScript var error = require("../error"); var bbs = require("../b_controller/bbs"); var user = require("../b_controller/user"); // request 를 분석해서 요청 url에 대한 연결 // url 을 분석 exports.parse = function (request, response){ console.log("in router parse"); var path = removeQuerystring(request.url); if(path == "/bbs"){ //---> 주소로 요청된 모듈.js 로 보낸다. 요청주소가 /bbs 라면 bbs.js parseMethod(bbs, request, response); } else if(path == "/user"){ parseMethod(user, request, response); } else { error.send(response, 404); } };

// http 메서드를 분석 //---> 각 모듈별 method 분기처리 function parseMethod(module, request, response){ console.log("in router parseMethod"); if(request.method == "POST"){ module.write(request, response); }else if(request.method == "GET"){ module.read(getQuerystring(request.url), response); }else if(request.method == "PUT"){ module.update(request, response); }else if(request.method == "DELETE"){ module.delete(request, response); } } // http://localhost function removeQuerystring(fullUrl){ var position = fullUrl.indexOf('?'); // ?의 위치값을 반환. 없으면 -1 if(position == -1){ return fullUrl; }else{ return fullUrl.substring(0, position); } }

function getQuerystring(fullUrl){ var position = fullUrl.indexOf('?'); // ?의 위치값을 반환. 없으면 -1 if(position == -1){ return ""; }else{ return fullUrl.substring(position + 1); } }\`\`\`* exports.parse -> exports 객체를 통해 parse 모듈 생성.* parse 모듈은 아래와 같은 기능을 수행한다. * var path = splitQuerystring(request.url); -> path 변수에 splitQuerystring 함수로 부터 반환된 값을 담는다. 전달 한 값 : 요청 주소.url -> 요청 주소를 보낸다. 반환 된 값 : 요청 주소가 조건에 맞으므로 요청 주소를 그대로 갖는다. * splitQuerystring 함수에서 indexOf( ) 는 문자열 또는 배열에서 원하는 특정 문자의 위치값을 index로 반환하는 함수이다. -> '?' 위치 나옴. * fullUrl.substring(0, position) -> '?' 를 기준으로 문자열을 나눔. -> ? 이전의 주소 반환 * 조건문에 맞는 인자를 parseMethod 함수로 보낸다.* parseMethod 함수는 아래와 같은 기능을 수행한다. * request.method( ) 를 통해 요청 타입 분석. * 각 타입에 맞는 모듈 실행 -> ex) post 타입이면 module.write( ) 수행.

---

### bbs.js

bbsDao.js 를 통해 database를 읽고난 후 결과셋을 처리한다.\`\``JavaScript var dao = require("./bbsDao"); var error = require("./error"); var querystring = require("querystring");

exports.read = function(qs, response){ if( qs == ""){ dao.select(function(data){ // dao를 통해 db를 읽고난 후 결과셋을 처리하는 코드 var jsonString = JSON.stringify(data); // data를 받아서 json 형태로 바꿈 send(response, jsonString); }); }else{ var parsedQs = querystring.parse(qs, '&', '='); // parsedQs = { // title : "제목", // author : "홍길동" // } dao.search(parsedQs, function(data){ var jsonString = Json.stringify(data); send(response,jsonString); }); } } exports.write = function(request, response){ console.log("in bbs write"); // 데이터를 꺼내자 var postdata = ""; request.on('data', function(data){ // 데이터를 읽을 수 있을 때 호출 postdata = postdata + data; }); request.on('end', function(){ // 데이터를 다 읽었을 때 호출 var dataObj = JSON.parse(postdata); dao.insert(dataObj, function(){ send(response, '{"result":"ok"}'); }); }); }

// update는 write와 동작 방식 유사. exports.update = function(request, response){ // 요청한 데이터를 담을 변수를 선언 var postdata = ""; request.on('data', function(data){ // 데이터가 버퍼에 가득차면 자동으로 호출 postdata = postdata + data; }); request.on('end', function(){ // 데이터를 다 읽었을 때 호출 var dataObj = JSON.parse(postdata); // dataObj = { // id : 10, // title : "수정된 제목", // content : "수정된 내용 내용", // author : "지훈", // date : "2017-07-24" // } dao.update(dataObj, function(err){ if(err){ error.send(response, 500, err); }else{ send(response, '{"result":"ok"}'); } }); }); }

exports.delete = function(request, response){ // 요청한 데이터를 담을 변수를 선언 var postdata = ""; request.on('data', function(data){ // 데이터가 버퍼에 가득차면 자동으로 호출 postdata = postdata + data; }); request.on('end', function(){ // 데이터를 다 읽었을 때 호출 var dataObj = JSON.parse(postdata); dao.delete(dataObj, function(err){ if(err){ error.send(response, 500, err); }else{ send(response, '{"result":"ok"}'); } }); }); }

function send(response, result){ response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'}); response.end(result); }\`\`\`* read, write, update, delete에 해당하는 body를 데이터에 담아 객체화 한다.* 각 로직의 postdata 변수가 가지고 있는 것은 웹에서 요청 시 담아서 보낸 json 형태의 문자열이다.* JSON.parse(postdata); 를 하여 문자열을 json 형태로 넣어준다. * 예를 들어 postdata -> { title: 'Title', author: 'jh', content: 'asdf' } 를 가지고 있다면, title = Title author = jh content = asdf 처럼 값을 넣어준다.

---

### bbsDao.js

실질적으로 Database와의 연결, 접근 하기 위한 파일\`\``JavaScript var database = require("../module/database/index"); var tableName = "board";

exports.select = function(callback){ var query = "select * from "+tableName+" "; database.executeQuery(query, callback); }

exports.search = function(qs, callback){ var query = "select * from" +tableName+ "where title like '%" + qs.title + "%' "; console.log(query); database.executeQuery(query, callback); }

exports.insert = function(data, callback){ console.log("in bbsDao insert"); var query = " insert into "+tableName+"(title,content,author,date)"; query = query + " VALUES ?"; var values = [data.title,data.content,data.author,data.date]; console.log(query); database.executeMulti(query, values, callback); }

exports.update = function(data, callback){ var query = " update "+tableName + " set title=?, content=?, author=?, date=? where id=?"; var now = new Date().toLocaleDateString(); var values = \[ [data.title, data.content, data.author, now, data.id] ];

```
database.execute(query, values, function(error){
    callback(error);
})
```

\}

exports.delete = function(data, callback){ var query = "delete from "+tableName+" where id = ?"; var values = [data.id]; database.execute(query, values, function(error){ callback(error); }); }\`\`\`* 데이터베이스에 보낼 쿼리를 완성한다. * ex) insert into board(테이블이름) (title,content,author,date) VALUES ? * 각 항목에 들어갈 값은 values변수에 배열 형태로 넣어서 database모듈의 index파일로 보낸다.

---

### index.js(database)

데이터 베이스에 excess하여 데이터를 가져오는 역할. (양방향) -> DB 쿼리 실행 데이터를 가져올 수도 쓸 수 도 있다.\`\``JavaScript var mysql = require('mysql'); var conInfo = { host : '127.0.0.1', // 데이터베이스 아이피 또는 url user : 'root', // 사용자 아이디 password : 'mysql', // 비밀번호 port : '3306', // 포트 database : 'bbs' // 데이터베이스 };

// 쿼리 후에 결과값을 리턴해주는 함수 exports.executeQuery = function(query, callback){ var con = mysql.createConnection(conInfo); con.connect(); con.query(query, function(err, items, fields){ // 데이터베이스에 쿼리 실행 if(err){ // 에러처리 console.log(err); }else{ callback(items); } this.end(); // mysql 연결 해제 }); }

// 쿼리를 실행만 하는 함수 exports.execute = function(query, values, callback){ var con = mysql.createConnection(conInfo); con.connect(); con.query(query, values, function(err, result){ // 데이터베이스에 쿼리 실행 if(err){ // 에러처리 callback(err); }else{ callback(); } this.end(); // mysql 연결 해제 }); }

// 쿼리를 실행만 하는 함수 exports.executeMulti = function(query, values, callback){ console.log("in database executeMulti"); var con = mysql.createConnection(conInfo); con.connect(); con.query(query, \[[values]], function(err, result){ // 데이터베이스에 쿼리 실행 console.log("in database executeMulti query"); if(err){ console.log(err); }else{ callback(); } this.end(); // mysql 연결 해제 }); }\`\`\`

---

### error.js

에러 처리를 위한 파일`JavaScript
exports.send = function(response, code, err){
    response.writeHead(code,{'Content-Type':'application/json;charset=utf-8'});
    if(code == 404){
        var errorObj = {
            result : "404 Page Not Found",
            msg : ""
        };
        response.end(JSON.stringify(errorObj));
    }else if(code == 500){
        var errorObj = {
            result : "500 Internal Server Error",
            msg : err
        };
        response.end(JSON.stringify(errorObj));
    }
}
`

---
