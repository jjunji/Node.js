var bFile = require("./b");
var cFile = require("./c");
var value = 15;
//var next = value + 1;
 
console.log(bFile.next(value));
bFile.prev(value);
                        // 인자 이름은 상관x
bFile.print("today", function(param){
    console.log(param);
})

// 비동기 함수를 호출할 때는 결과처리 코드가 호출측에 있어야한다.
cFile.readText("write.txt", function(){
    console.log(param);
}); // write.txt 에서 읽은 결과를 출력하세요.
