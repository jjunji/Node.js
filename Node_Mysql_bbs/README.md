# Database ����


### server.js
�ڵ� �ۼ� �� �͹̳ο��� node server(js���� ��) ���� ����. -> ������.
```JavaScript
// 1. �������
var http = require("http");
var router = require("./a_router/router");
// 2. ������ ����
var server = http.createServer(function(request, response){
    // ��û url �м�
    console.log("in server");
    //---> ��� ��û�� ���� router.js �� ������
    router.parse(request, response);
});
// 3. ������ ���� , ������ ������ 80�� ��Ʈ�� ������ �ϵ��� ����.
server.listen(80, function(){
    console.log("server's running...");
});
```
* ������ �����Ǹ� router ����� parse( ) �Լ� ����.
*  

--- 
### router.js
��û url�� �޼ҵ带 �м��ϰ� ��û url�� ���εǴ� ����Ͻ� ������ ȣ��(��� ó��)
```JavaScript
var error = require("../error");
var bbs = require("../b_controller/bbs");
var user = require("../b_controller/user");
// request �� �м��ؼ� ��û url�� ���� ����
// url �� �м�
exports.parse = function (request, response){
    console.log("in router parse");
    var path = removeQuerystring(request.url);
    if(path == "/bbs"){
        //---> �ּҷ� ��û�� ���.js �� ������. ��û�ּҰ� /bbs ��� bbs.js
        parseMethod(bbs, request, response);
    } else if(path == "/user"){
        parseMethod(user, request, response);
    } else {
        error.send(response, 404);
    }
};

// http �޼��带 �м�
//---> �� ��⺰ method �б�ó��
function parseMethod(module, request, response){
    console.log("in router parseMethod");
    if(request.method == "POST"){
        module.write(request, response);
    }else if(request.method == "GET"){
        module.read(getQuerystring(request.url), response);
    }else if(request.method == "PUT"){
        module.update(request, response);
    }else if(request.method == "DELETE"){
        module.delete(request, response);
    }
}
// http://localhost 
function removeQuerystring(fullUrl){
    var position = fullUrl.indexOf('?'); // ?�� ��ġ���� ��ȯ. ������ -1
    if(position == -1){
        return fullUrl;
    }else{
        return fullUrl.substring(0, position);
    }
}

function getQuerystring(fullUrl){
    var position = fullUrl.indexOf('?'); // ?�� ��ġ���� ��ȯ. ������ -1
    if(position == -1){
        return "";
    }else{
        return fullUrl.substring(position + 1);
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
bbsDao.js �� ���� database�� �а� �� ������� ó���Ѵ�.
```JavaScript
var dao = require("./bbsDao");
var error = require("./error");
var querystring = require("querystring");

exports.read = function(qs, response){
    if( qs == ""){
        dao.select(function(data){  // dao�� ���� db�� �а� �� ������� ó���ϴ� �ڵ�
            var jsonString = JSON.stringify(data); // data�� �޾Ƽ� json ���·� �ٲ�
            send(response, jsonString);
        });
    }else{
        var parsedQs = querystring.parse(qs, '&', '=');
        // parsedQs = {
        //     title : "����",
        //     author : "ȫ�浿"
        // }
        dao.search(parsedQs, function(data){
            var jsonString = Json.stringify(data);
            send(response,jsonString);
        });
    }
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
            send(response, '{"result":"ok"}');
        });
    });
}

// update�� write�� ���� ��� ����.
exports.update = function(request, response){
    // ��û�� �����͸� ���� ������ ����
    var postdata = "";
    request.on('data', function(data){ // �����Ͱ� ���ۿ� �������� �ڵ����� ȣ��
        postdata = postdata + data;
    });
    request.on('end', function(){ // �����͸� �� �о��� �� ȣ��
        var dataObj = JSON.parse(postdata);
        // dataObj = {
        //     id : 10,
        //     title : "������ ����",
        //     content : "������ ���� ����",
        //     author : "����",
        //     date : "2017-07-24"
        // }
        dao.update(dataObj, function(err){
            if(err){
                error.send(response, 500, err);
            }else{
                send(response, '{"result":"ok"}');
            }
        });
    });
}

exports.delete = function(request, response){
      // ��û�� �����͸� ���� ������ ����
    var postdata = "";
    request.on('data', function(data){ // �����Ͱ� ���ۿ� �������� �ڵ����� ȣ��
        postdata = postdata + data;
    });
    request.on('end', function(){ // �����͸� �� �о��� �� ȣ��
        var dataObj = JSON.parse(postdata);
        dao.delete(dataObj, function(err){
            if(err){
                error.send(response, 500, err);
            }else{
                send(response, '{"result":"ok"}');
            }
        });
    });
}

function send(response, result){
    response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
    response.end(result);
}
```
* read, write, update, delete�� �ش��ϴ� body�� �����Ϳ� ��� ��üȭ �Ѵ�.
* �� ������ postdata ������ ������ �ִ� ���� ������ ��û �� ��Ƽ� ���� json ������ ���ڿ��̴�.
*  JSON.parse(postdata); �� �Ͽ� ���ڿ��� json ���·� �־��ش�.
	* ���� ��� postdata -> { title: 'Title', author: 'jh', content: 'asdf' } �� ������ �ִٸ�,
	   title = Title    author = jh   content = asdf  ó�� ���� �־��ش�.

---
### bbsDao.js
���������� Database���� ����, ���� �ϱ� ���� ����
```JavaScript
var database = require("../module/database/index");
var tableName = "board";

exports.select = function(callback){
    var query = "select * from "+tableName+" ";
    database.executeQuery(query, callback);
}

exports.search = function(qs, callback){
    var query = "select * from" +tableName+ "where title like '%" + qs.title + "%' ";
    console.log(query);
    database.executeQuery(query, callback);
}

exports.insert = function(data, callback){
    console.log("in bbsDao insert");
    var query = " insert into "+tableName+"(title,content,author,date)";
        query = query + " VALUES ?";
    var values = [data.title,data.content,data.author,data.date];
    console.log(query);
    database.executeMulti(query, values, callback);
}

exports.update = function(data, callback){
    var query = " update "+tableName
                + " set title=?, content=?, author=?, date=? where id=?";
    var now = new Date().toLocaleDateString();
    var values = [
        [data.title, data.content, data.author, now, data.id]
    ];

    database.execute(query, values, function(error){
        callback(error);
    })
}

exports.delete = function(data, callback){
    var query = "delete from "+tableName+" where id = ?";
    var values = [data.id];
    database.execute(query, values, function(error){
        callback(error);
    });
}
```
* �����ͺ��̽��� ���� ������ �ϼ��Ѵ�.
	* ex) insert into board(���̺��̸�) (title,content,author,date) VALUES ? 
	* �� �׸� �� ���� values������ �迭 ���·� �־ database����� index���Ϸ� ������.

---
### index.js(database)
������ ���̽��� excess�Ͽ� �����͸� �������� ����. (�����) -> DB ���� ����
�����͸� ������ ���� �� �� �� �ִ�.
```JavaScript
var mysql = require('mysql');
var conInfo = {
	host : '127.0.0.1', // �����ͺ��̽� ������ �Ǵ� url
	user : 'root',      // ����� ���̵�
	password : 'mysql', // ��й�ȣ
	port : '3306',        // ��Ʈ
	database : 'bbs'    // �����ͺ��̽�
};

// ���� �Ŀ� ������� �������ִ� �Լ�
exports.executeQuery = function(query, callback){
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, function(err, items, fields){ // �����ͺ��̽��� ���� ����
		if(err){
			// ����ó��
			console.log(err);
		}else{
			callback(items);
		}
		this.end();  // mysql ���� ����
	});
}

// ������ ���ุ �ϴ� �Լ�
exports.execute = function(query, values, callback){
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, values, function(err, result){ // �����ͺ��̽��� ���� ����
		if(err){
			// ����ó��
			callback(err);
		}else{
			callback();
		}
		this.end();  // mysql ���� ����
	});
}

// ������ ���ุ �ϴ� �Լ�
exports.executeMulti = function(query, values, callback){
	console.log("in database executeMulti");
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query(query, [[values]], function(err, result){ // �����ͺ��̽��� ���� ����
		console.log("in database executeMulti query");
		if(err){
			console.log(err);
		}else{
			callback();
		}
		this.end();  // mysql ���� ����
	});
}
```


---
### error.js
���� ó���� ���� ����
```JavaScript
exports.send = function(response, code, err){
    response.writeHead(code,{'Content-Type':'application/json;charset=utf-8'});
    if(code == 404){
        var errorObj = {
            result : "404 Page Not Found",
            msg : ""
        };
        response.end(JSON.stringify(errorObj));
    }else if(code == 500){
        var errorObj = {
            result : "500 Internal Server Error",
            msg : err
        };
        response.end(JSON.stringify(errorObj));
    }
}
```


---