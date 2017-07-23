// 1. http 서버모듈 가져오기
var http = require("http"); // <- java 의 import

var con = require("./connection_module");

// 2. http 모듈로 서버 생성하기
var server = http.createServer( function (request, response){
    
    console.log("요청URL:"+request.url);
    // 응답 헤더
    response.writeHead(200, {'Content-Type' : 'application/json'});
    // 
    con.getData(response);  //response.end 부분이 어디로
} );

// 3. 서버가 로드되면 알려주고, 사용자 요청 대기하기
server.listen(8080, function(){ 
    console.log("server is running...");
});












// 함수로 사용할 수도 있고, 클래스로 사용할 수 도 있다.
// 대소문자로 용도를 구별(함수, 클래스)

/*var obj = {
	aaa : "value123",
	bbb : 123,
	ccc : function(){
		console.log("called");}
};

function obj(){
	var aaa = "value123"
	var bbb = 123;
	function ccc(){
		console.log(called);
	}
}

var obj2 = new obj();


var json = '{ aaa : "value123, bbb : 123 }';*/

// 위 소스를 자바코드로 바꾼다면 ...
/*class obj {
	String aaa = "value123";
	int bbb = "123";

	public void ccc(){
		Log.i("","called");
	}
}*/


/*
// 응답 데이터
    var one = '{'
    	+ 'bbsList:['
    	+ '{no:"1",title:"제목",content:"내용",author:"작성자",date:"2012/12/12"}'
    	+ ' ,{no:"2",title:"제목2",content:"내용2",author:"작성자2",date:"2012/12/12"}'
		+ ']'
	+'}';

	
	    
    // 응답 데이터 전송 후 완료
    response.end(one);

*/