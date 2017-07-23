var net = require('net');

net.createServer(function(socket){
	socket.on('data', function(data){
		console.log(data);
		console.log(data.toString());
		socket.write("답변입니다.");
	});
}).listen(7337, function(){
	console.log('server is running');
});
