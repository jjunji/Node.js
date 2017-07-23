# Database ����

### server.js
```JavaScript
// 1. �������
var http = require("http");
var router = require("./module/router");
// 2. ������ ����
var server = http.createServer(function(request, response){
    // ��û url �м�
    console.log("in server");
    router.parse(request, response);
});
// 3. ������ ���� , ������ ������ 80�� ��Ʈ�� ������ �ϵ��� ����.
server.listen(80, function(){
    console.log("server's running...");
});
```
* ������ �����Ǹ� router ����� parse( ) �Լ� ����.

--- 
### router.js
�ڵ� �ۼ� �� �͹̳ο��� node server(js���� ��) ���� ����. -> ������.
```JavaScript
var error = require("../error");
var bbs = require("../bbs");
var user = require("../user");
// request �� �м��ؼ� ��û url�� ���� ����
// url �� �м�
exports.parse = function (request, response){
    console.log("in router parse");
    var path = splitQuerystring(request.url);
    if(path == "/bbs"){
        parseMethod(bbs, request, response);
    } else if(path == "/user"){
        parseMethod(user, request, response);
    } else {
        error.send(response, 404);
    }
};

// http �޼��带 �м�
function parseMethod(module, request, response){
    console.log("in router parseMethod");
    if(request.method == "POST"){
        module.write(request, response);
    }else if(request.method == "GET"){
        module.read(response);
    }else if(request.method == "PUT"){
        module.update(response);
    }else if(request.method == "DELETE"){
        module.delete(response);
    }
}
// http://localhost 
function splitQuerystring(fullUrl){
    var position = fullUrl.indexOf('?'); // ?�� ��ġ���� ��ȯ. ������ -1
    if(position == -1){
        return fullUrl;
    }else{
        return fullUrl.substring(0, position);
    }
}
```
* exports.parse
	-> exports ��ü�� ���� parse ��� ����.
*  parse ����� �Ʒ��� ���� ����� �����Ѵ�.
	*  var path = splitQuerystring(request.url);
	-> path ������ splitQuerystring �Լ��� ���� ��ȯ�� ���� ��´�.
	    ���� �� �� : ��û �ּ�.url -> ��û �ּҸ� ������.
	    ��ȯ �� �� :  ��û �ּҰ� ���ǿ� �����Ƿ� ��û �ּҸ� �״�� ���´�.
	* splitQuerystring �Լ����� indexOf( ) �� ���ڿ� �Ǵ� �迭���� ���ϴ� Ư�� ������
	  ��ġ���� index�� ��ȯ�ϴ� �Լ��̴�. -> '?' ��ġ ����.
	* fullUrl.substring(0, position) -> '?' �� �������� ���ڿ��� ����. -> ? ������ �ּ� ��ȯ
	* ���ǹ��� �´� ���ڸ� parseMethod �Լ��� ������.
* parseMethod �Լ��� �Ʒ��� ���� ����� �����Ѵ�.
	* request.method( ) �� ���� ��û Ÿ�� �м�.
	* �� Ÿ�Կ� �´� ��� ���� -> ex) post Ÿ���̸� module.write( ) ����.

---
### bbs.js
������
```JavaScript
var dao = require("./bbsDao");
exports.read = function(response){
    send(response, "READ");
}
exports.write = function(request, response){
    console.log("in bbs write");
    // �����͸� ������
    var postdata = "";
    request.on('data', function(data){ // �����͸� ���� �� ���� �� ȣ��
        postdata = postdata + data;
    });
    request.on('end', function(){ // �����͸� �� �о��� �� ȣ��
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
```
������

---

