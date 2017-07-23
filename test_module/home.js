/*var custom = require("./custom_module");  // 파일명, 폴더명 지정가능
// 만약 폴더명을 지정하고 그 폴더 아래 여러 js 파일이 있다면 index.js만 찾아서 가져옴
// 특정 파일을 import하고 싶다면 폴더명/파일이름
// require로 여러 파일 import 가능. 
var custom2 = require("./connection_module");


custom.printString("James");
custom2.getData();*/

var conn = require("./connection_module");


/*function printResult(result){
	console.log(result);
}*/


var obj = {
	printResult : function(callback){
		console.log(result);
	}
}

var result = conn.getData(obj);