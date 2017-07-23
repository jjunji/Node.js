# Node.js

###설치
* nodejs.org 에서 파일 다운로드 후 설치
*  LTS	와	Current	두	가지	버전이	있는데	LTS가 더 안정화된 버전이므로	처음에는	되도록 LTS	버전을	사용
*  터미널에서 node --version 명령어 통해서 버전 확인

--- 
###Node.js 를 통해 웹 어플리케이션 실행하기
코드 작성 후 터미널에서 node server(js파일 명) 으로 실행. -> 진입점.
```java
// 1. http 서버모듈 가져오기
var http = require("http"); // <- java 의 import

var con = require("./connection_module");

// 2. http 모듈로 서버 생성하기
var server = http.createServer( function (request, response){
    
    console.log("요청URL:"+request.url);
    // 응답 헤더
    response.writeHead(200, {'Content-Type' : 'application/json'});
    response.end('Hello node.js');
} );

// 3. 서버가 로드되면 알려주고, 사용자 요청 대기하기
server.listen(8080, function(){ 
    console.log("server is running...");
});
```
* 웹서버를	실행하기	위해서	http	모듈을	require로	불러온다. 
require는	다른언어의 import	와 유사한 기능으로. node.js는 require 후에 해당 모듈을	http	라는	변수에 담은 후 하나의 독립적인 객체로 사용한다. http 모듈에 정의된 모든	기능이	변수 http 로 생성되는데	변수명은	꼭 http로	하지	않아도 된다.

* http	모듈에	정의되어	있는	createServer( )	함수로	서버를	생성한다.

* 함수명이	없이	function	이라고만	작성된	파라미터는	이벤트	발생시에	callback	된다. 즉,	생성된	서버로	어떤	요청이	들어오면	function	내부의	로직이	실행되면서	function 내부에	선언한	request와	response라는	이름으로	사용할	수	있는	값을	넘겨줌.	그 래서	function	블럭	{	}	내부에서는	request	와	response로	넘어오는	어떤	 값을	사용할 수 있게 된다.

* response로 넘어온 값으로	함수를	실행
response	객체는	서버로	웹브라우저나	또는	앱으로	부터	어떤	요청이	있을	때 요청한	사용자	측으로	값을	반환해	줄	때	사용하는	객체.

* 	request	객체는 사용자가	요청한	내용이	담겨있는	객체.

* 브라우저는	header	값을	보고	서버에서	넘어 온	값이	어떤	형태인지를	파악하고	실제	값을	header	에	세팅된	설정에	맞게	보여준다.

### Java / Json

Java 로 객체 표현
``` java
class obj {
	String aaa = "value123";
	int bbb = "123";

	public void ccc(){
		Log.i("","called");
	}
```
JavaScript
함수로 사용할 수도 있고, 클래스로 사용할 수 도 있다.
대,소 문자로 용도를 구별(함수, 클래스)
```java
// 함수
function obj(){
	var aaa = "value123"
	var bbb = 123;
	function ccc(){
		console.log(called);
	}
}
// 클래스
function Obj(){
	var aaa = "value123"
	var bbb = 123;
	function ccc(){
		console.log(called);
	}
}

```
Json
```java
var json = '{ aaa : "value123, bbb : 123 }'
```