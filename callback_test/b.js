
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