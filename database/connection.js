var mysql = require("mysql");

// 연결 정보를 담은 객체를 생성    // 괄호 안에 객체가 담겨야 
var conInfo = {
	host : "127.0.0.1",	// 데이터베이스 아이피 또는 url
	port : 3306,
	user : "root",	// 사용자 아이디
	password : "mysql",	// 비밀번호
	database : "bbs"	// 데이터베이스
};
// 연결정보를 담은 객체를 생성
var con = mysql.createConnection(conInfo);

// 연결정보를 이용해서 database 연결
con.connect();
// 데이터베이스에 쿼리 실행
con.query("select * from board", function(err, items, fields){
	// 에러 체크
	if(err){
		console.log("error message = " + err);
	}else{
		var data = {
			bbsList : []
		};					
		// 반복문을 통해 배열에 item을 하나씩 담는다.
		items.forEach(function(item){ // item은 내가 정한 임의 변수 , // 향상된 for문 처럼 item을 하나씩 꺼내서 function 수행.
			data.bbsList.push(item);
			//console.log(item);
		} );
		// json 스트링으로 변환
		var jsonString = JSON.stringify(data);
		console.log(jsonString); // -> 동기
	}								  // 아이템이 찍히기전에(for문 찍히기전에) 
});									  // 로그가 수행되면(블럭 무시) -> 비동기
console.log("you are here ~~~ ");
con.end(); // <- 필수 : 안하면 계속 연결된 상태