var http = require("http");
var mysql = require("mysql");  // npm install mysql 로 설치해야함.
var url = require("url");
var querystring = require("querystring");
var conInfo = {
    host : '127.0.0.1', // 데이터베이스 아이피 또는 url
    user : 'root',      // 사용자 아이디
    password : 'mysql', // 비밀번호
    port : '3306',        // 포트
    database : 'mydb2'    // 데이터베이스
};
// 서버 생성
var server = http.createServer(function(request, response){
    // request : 사용자 요청정보 조회
    // response : 사용자에게 처리결과 응답

    // /airbnb/search?

    // 1. 요청 url 분석 처리
    // /airbnb/house?checkin=2017-07-27&checkout=2017-07-31&a=1&b=abc
    if(request.url.startsWith("/airbnb/house")){
        var parsedUrl = url.parse(request.url);
        var search = querystring.parse(parsedUrl.query);
        // 가. 검색조건이 없는 검색
        //executeQuery(response);
        // 나. 검색조건이 있는 검색
        executeQuery(response, search);
    }else{
        response.writeHead(404,{"Content-Type":"text/html"});
        response.end("404 page not found!");
    }
});
// 2. 쿼리 실행
function executeQuery(response, search){
    var query = "select * from house a join reservation b "
                + " on a.id=b.house_id ";
    var values = [];
    console.log(search);
    if(search){
        query = query + " where 1=1 ";
        // search 오브젝트의 key를 반복문을 돌면서 꺼내고
        for(var key in search){
            // key 이름을 쿼리에 삽입하고
            query = query + " and b." + key + " = ? ";
            // key로 조회한 값을 value에 담는다.
            values.push(search[key]);
        }
    }
    console.log(values);
    // select * from house where checkin = ? and checkout = ?
    //console.log("QUERY : " + query);

   var con = mysql.createConnection(conInfo);
    con.connect();
    con.query(query, values, function(err, items, fields){
        if(err){
            console.log(err);
            sendResult(response, err);
        }else{
            console.log(items);
            sendResult(response, items);
        }
        this.end();  // mysql 연결 해제
    });
}
// 3. 결과값 전송
function sendResult(response, data){
    response.writeHead(200,{"Content-Type":"text/html"});
    response.end(JSON.stringify(data));
}

// 서버 시작
server.listen(80, function(){
    console.log("server's running...");
});