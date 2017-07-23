var var1 = "Hello";

exports.PI = 3.141592 // exports 사용하면 로그 띄울때 this붙이는 이유...(this.var2)
// exports -> public 접근 제한자  ,  this는 모듈 단위?
exports.printString = function(str){
	console.log(var1 + str);
}


