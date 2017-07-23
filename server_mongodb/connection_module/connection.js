var mongo = require("mongodb").MongoClient;

// database 를 select 하는 함수
exports.select = function(callback){ // <- callback 에는 실행코드가 넘어온다.
	// 데이터베이스 연결
	mongo.connect('mongodb://localhost:27017/bbs', function(err, db){
		if(err){
			console.log(err);
		}else{
			// 1. board 테이블의 전체데이터를 검색해서 가져온다
			var board = db.collection("board").find();
			// 2. toArray 함수로 배열로 만들어서 docs 변수에 담아준다.
			board.toArray(function(error, docs){
				if(error){
					console.log("error:"+error);
				}else{
					// 조회한 데이터를 result 배열에 담아준다.
					if(docs != null){
						console.log(docs);
						// callback 에는 실행가능한 코드 전체가 넘어오기 대문에
						// 넘어온 코드에 결과 데이터를 담아서 실행할 수 있다
						callback(docs);
					}
				}
			});

			db.close();
		}
	});
}


exports.insert = function(data, callback){
	mongo.connect('mongodb://localhost:27017/bbs', function(err,db){
		// 연결에러가 발생하면
		if(err){
			console.log(err);
		}else{
			console.log("connected:"+db);
			db.collection("board").insert(data);
			// 처리후 db 닫기
			db.close();
			console.log("run insert");
			callback();
		}
	});
}