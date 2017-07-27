# javaScript 기본 함수, 콜백 구조

### 어떤 함수의 매개변수 인자로 함수가 주어졌을 때, 호출 당한 해당 함수를 콜백 함수라고 한다.

```JavaScript
var value = 15;

console.log(next(value))

// next함수를 만들어서
// console 로그에 16이 찍히도록 만들면
// next 함수는 파라미터로 value를 받는다.

function next(param){
  return + 1;
}
```
next 함수의 인자로 위에 선언한 value(15) 를 받아서 처리 후 리턴한다. -> 로그에 16이 찍히는 것을 확인할 수 있다.

---

![](https://github.com/jjunji/Node.js/blob/master/callback_test/capture/2.PNG)

a.js 와 b.js를 생성 한 후
a에서 b에 있는 함수를 호출하면 에러가 발생한다.
b의 함수를 exports화 시켜야 한다.

함수를 exports화 시키면
```javaScript
// 입력된 파라미터에 1을 더해서 리턴

// exports를 하면 함수 명과 function 위치 바뀜.

exports.next = function(param) { // js는 변수에 코드를 저장할 수 있다
    return param + 1;
}

exports.prev = function(param){
    console.log(param - 1);
}

exports.print = function(param, callback){
    var result = "[Result : " + param + "]";
    callback(result);
}
```
다른 파일에서도 사용할 수 있도록 public화 한다고 생각할 수 있다.

![](https://github.com/jjunji/Node.js/blob/master/callback_test/capture/exports.PNG)

---
![](https://github.com/jjunji/Node.js/blob/master/callback_test/capture/callback_3.PNG)

```javaScript
exports.print = function(param, callback){
    var result = "[Result : " + param + "]";
    callback(result);
    // callback(result)가 아래와 같다고 보면된다.
    function(result){
        console.log(result);
    }
}

```
---

### a.js
비동기 함수를 호출할 때는 결과 처리 코드가 호출측에 있어야 한다.
```javaScript
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
```


---
### b.js
```javaScript
// 입력된 파라미터에 1을 더해서 리턴

// exports를 하면 함수 명과 function 위치 바뀜.

exports.next = function(param) { // js는 변수에 코드를 저장할 수 있다
    return param + 1;
}

exports.prev = function(param){
    console.log(param - 1);
}

exports.print = function(param, callback){
    var result = "[Result : " + param + "]";
    callback(result);
}
```
### c.js
비동기로 파일 읽고, 쓰기
```javaScript
// 파일을 읽고 쓰기
var fs = require("fs"); // 파일을 읽고 쓰기 위한 모듈

// 스트림과 다르게 다 읽은 후 알아서 닫아줌.
// 비동기로 파일 읽기
exports.readText = function(fileName,ca){
    fs.readFile(fileName, "utf-8", function(error, data){
        // 콜백안에서 내가 실행하고 싶은 코드가 동작하게 해야함.
        callback(data);
    });
}


// 비동기로 파일 쓰기
exports.writeText = function(fileName, data, callback){
    fs.writeFile(fileName, data, "utf-8:", function(error){
        if(error){
            callback(error);
        }else{
            callback();
        }
    }); 
}

// 오버로딩 같이 인자에 따라 다른 결과를 얻을 수 있음.
// 완료처리를 호출 측에서 하는 것.
cFile.writeText("파일명", "파일내용", function(error){
    if(error){
        에러처리
    }else{
        완료처리
    }
});
```
---
require는	다른언어의 import 와 유사한	기능이다.
```javaScript 
var bFile = require("./b");
var user = require("../b_controller/user");
```
* ./ -> 현재 디렉토리
* ../ -> 상위 경로로 이동
* ../b_controller/user -> 현재 디렉토리의 상위 디렉토리로 이동 후 
  b_controller 디렉토리의 user.js 파일 import