var connection = require('./connection');

// 데이터를 읽는 함수
exports.getData = function(response) {
	// connection 모듈의 select 함수 호출
	// : 함수를 호출하면서 코드 전체를 인자로 넘겨준다.
	connection.select( function(data) {
		// json 스트링 형태로 변환할 데이터 구조 정의
		var result = {
			bbsList : []
		}
		// 원본 데이터를 클라이언트 데이터 구조에 맞게 수정한다.
		data.forEach( function(item) {
			var newItem = {
				no : item.id, 
				title: item.title,
				content: item.content,
				author: item.author,
				date: item.date
			};
			// 배열에 데이터 담기
			result.bbsList.push(newItem);
		});

		var jsonString = JSON.stringify(result);
		// 3. 데이터를 전송
		response.writeHead(200, {'Content-Type' : 'application/json'});
		// 네트워크처리 순서
		// 3. 데이터를 전송
		// 4. 연결을 닫는다.
		response.end(jsonString);
	});
}

// 데이터를 저장
exports.setData = function(data, response){
	var obj = JSON.parse(data);
	console.log(obj);

	connection.insert(obj,function(){
		console.log("call insert callback");
		response.writeHead(200, {'Content-Type' : 'application/json'});
		response.end('{"result_status":"ok"}');
	})
}

exports.update = function(data){

}

exports.remove = function(data){
	
}