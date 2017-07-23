var dao = require("./bbsDao");
exports.read = function(response){
    send(response, "READ");
}
exports.write = function(request, response){
    console.log("in bbs write");
    // 데이터를 꺼내자
    var postdata = "";
    request.on('data', function(data){ // 데이터를 읽을 수 있을 때 호출
        postdata = postdata + data;
    });
    request.on('end', function(){ // 데이터를 다 읽었을 때 호출
        var dataObj = JSON.parse(postdata);
        dao.insert(dataObj, function(){
            send(response, "WRITE Success!");
        });
    });
}
exports.update = function(response){
    send(response, "UPDATE");
}
exports.delete = function(response){
    send(response, "DELTE");
}

function send(response, flag){
    response.writeHead(200,{'Content-Type':'text/html'});
    response.end("BBS "+flag);
}