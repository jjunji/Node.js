# Node.js

###��ġ
* nodejs.org ���� ���� �ٿ�ε� �� ��ġ
*  LTS	��	Current	��	����	������	�ִµ�	LTS�� �� ����ȭ�� �����̹Ƿ�	ó������	�ǵ��� LTS	������	���
*  �͹̳ο��� node --version ��ɾ� ���ؼ� ���� Ȯ��

--- 
###Node.js �� ���� �� ���ø����̼� �����ϱ�
�ڵ� �ۼ� �� �͹̳ο��� node server(js���� ��) ���� ����. -> ������.
```java
// 1. http ������� ��������
var http = require("http"); // <- java �� import

var con = require("./connection_module");

// 2. http ���� ���� �����ϱ�
var server = http.createServer( function (request, response){
    
    console.log("��ûURL:"+request.url);
    // ���� ���
    response.writeHead(200, {'Content-Type' : 'application/json'});
    response.end('Hello node.js');
} );

// 3. ������ �ε�Ǹ� �˷��ְ�, ����� ��û ����ϱ�
server.listen(8080, function(){ 
    console.log("server is running...");
});
```
* ��������	�����ϱ�	���ؼ�	http	�����	require��	�ҷ��´�. 
require��	�ٸ������ import	�� ������ �������. node.js�� require �Ŀ� �ش� �����	http	���	������ ���� �� �ϳ��� �������� ��ü�� ����Ѵ�. http ��⿡ ���ǵ� ���	�����	���� http �� �����Ǵµ�	��������	�� http��	����	�ʾƵ� �ȴ�.

* http	��⿡	���ǵǾ�	�ִ�	createServer( )	�Լ���	������	�����Ѵ�.

* �Լ�����	����	function	�̶��	�ۼ���	�Ķ���ʹ�	�̺�Ʈ	�߻��ÿ�	callback	�ȴ�. ��,	������	������	�	��û��	������	function	������	������	����Ǹ鼭	function ���ο�	������	request��	response���	�̸�����	�����	��	�ִ�	����	�Ѱ���.	�� ����	function	��	{	}	���ο�����	request	��	response��	�Ѿ����	�	 ����	����� �� �ְ� �ȴ�.

* response�� �Ѿ�� ������	�Լ���	����
response	��ü��	������	����������	�Ǵ�	������	����	�	��û��	����	�� ��û��	�����	������	����	��ȯ��	��	��	����ϴ�	��ü.

* 	request	��ü�� ����ڰ�	��û��	������	����ִ�	��ü.

* ��������	header	����	����	��������	�Ѿ� ��	����	�	����������	�ľ��ϰ�	����	����	header	��	���õ�	������	�°�	�����ش�.

### Java / Json

Java �� ��ü ǥ��
``` java
class obj {
	String aaa = "value123";
	int bbb = "123";

	public void ccc(){
		Log.i("","called");
	}
```
JavaScript
�Լ��� ����� ���� �ְ�, Ŭ������ ����� �� �� �ִ�.
��,�� ���ڷ� �뵵�� ����(�Լ�, Ŭ����)
```java
// �Լ�
function obj(){
	var aaa = "value123"
	var bbb = 123;
	function ccc(){
		console.log(called);
	}
}
// Ŭ����
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