// --------------  fcm 설정 ------------------
// fcm 주소, 내 서버 키, 메시지 이 3가지를 조합해서 알림 메시지 날림.
// fcm 주소
var fcmUrl = "https://fcm.googleapis.com/fcm/send";

// 내 서버 키
var serverKey = "AAAAK3GRxEs:APA91bGQxHBnrz1jslYwQL_L8I-SebFT1H4NXvoQpQ-tthuakIeQ4P9pjXMzO5VsyKr72N3-uLHxY1ciIFoY5pJrcdST3hoEYTDGTjYGj48-8vYNUfIkyBblZQpNseRU0ST5_-e7c9cW";

var message = {
	to : "",  // 상대방 토큰
	notification : {
		title : "노티바의 타이틀",
		body : ""   //노티바에 나타나는 메시지
	}
};

//----------------  node -------------------
// 1. http 서버모듈 가져오기
var http = require("http"); // <- java 의 import
var url = require("url");
var httpUrlConnection = require("request");
var querystring = require("querystring");


// 2. http 모듈로 서버 생성하기
var server = http.createServer( function (request, response){
	// 4. 사용자 요청이 발생하면 요청 자원을 분리하고
	var parsedUrl = url.parse(request.url);
	var path = parsedUrl.pathname;
	//var path = url.parse(request.url).pathname; // -> 위 문장 한줄로 한 것.

	// 5. send_notification을 체크
	if(path == "/send_notification"){
		if(request.method == "POST"){
			// 6. 스마트폰에서 전송된 데이터를 message객체에 담고
			var postdata = "";
			request.on('data', function(data){
				postdata = postdata + data;
			});

			request.on('end',function(){
				console.log("postdata:"+ postdata);
				var dataObj = querystring.parse(postdata);

				message.to = dataObj.token;
				message.notification.body = dataObj.msg;

				console.log(message);

				// 7. httpUrlConnection 으로 FCM 서버로 전송
				httpUrlConnection({
					// fcm 서버로 데이터 전송
					url : fcmUrl,
					method : "POST",
					headers : {
						"Authorization":"key=" + serverKey,
						"Content-Type":"application/json"
					},
					body : JSON.stringify(message)
				}, function(error, res, body){
					// fcm 서버에서 결과처리 상태를반환             
					console.log("after: error="+error+", code="+res.statusCode);
					if(!error && res.statusCode == 200){
						// 8. 결과처리 상태 스마트폰으로 전송
						response.writeHead(200, {'Content-Type' : 'application/json'});
		    			response.end('{"result_status":"ok"}');
					}else{
						response.writeHead(501, {'Content-Type' : 'application/json'});
                        response.end('{"result_status":"'+body+'"}');
                    }
                });
            });
        }else{
            send404(response);
        }
    }else{
        send404(response);
    }
} );


function send404(response){
	response.writeHead(404, {'Content-Type' : 'application/json'});
    response.end('{"result_status":"404 page not found"}');
}

// 3. 서버가 로드되면 알려주고, 사용자 요청 대기하기
server.listen(8090, function(){ 
    console.log("server is running...");
});