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