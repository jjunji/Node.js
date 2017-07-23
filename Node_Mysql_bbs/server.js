
// 1. 서버모듈
var http = require("http");
var router = require("./module/router");
// 2. 서버를 생성
var server = http.createServer(function(request, response){
    // 요청 url 분석
    console.log("in server");
    router.parse(request, response);
});
// 3. 서버를 시작
server.listen(80, function(){
    console.log("server's running...");
});