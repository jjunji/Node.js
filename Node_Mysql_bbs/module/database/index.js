var mysql = require('mysql');
var conInfo = {
	host : '127.0.0.1', // 데이터베이스 아이피 또는 url
	user : 'root',      // 사용자 아이디
	password : 'mysql', // 비밀번호
	port : '3306',        // 포트
	database : 'bbs'    // 데이터베이스
};

// 쿼리 후에 결과값을 리턴해주는 함수
exports.executeQuery = function(query, callback){
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, function(err, items, fields){ // 데이터베이스에 쿼리 실행
		if(err){
			// 에러처리
			console.log(err);
		}else{
			callback(items);
		}
		this.end();  // mysql 연결 해제
	});
}

// 쿼리를 실행만 하는 함수
exports.execute = function(query, values, callback){
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, values, function(err, result){ // 데이터베이스에 쿼리 실행
		if(err){
			// 에러처리
			callback(err);
		}else{
			callback();
		}
		this.end();  // mysql 연결 해제
	});
}

// 쿼리를 실행만 하는 함수
exports.executeMulti = function(query, values, callback){
	console.log("in database executeMulti");
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, [[values]], function(err, result){ // 데이터베이스에 쿼리 실행
		console.log("in database executeMulti query");
		if(err){
			console.log(err);
		}else{
			callback();
		}
		this.end();  // mysql 연결 해제
	});
}