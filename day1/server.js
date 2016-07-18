/*

	모듈은 개발자가 정의할 수도 있지만, 
	이미 nodejs 자체적으로 제공되는 유용한 모듈도 있다.

*/


var http = require("http");				//	http 모듈을 사용한다.

//	http 변수로 해당 모듈을 가리킨다.

var server = http.createServer(function(request, response){

	response.writeHead(200, {"Content-Type":"text/html"});
		
	/*
	function(){

		console.log("client is connected");

	});

	*/

	response.end("<marquee>hi</marquee>");	

});						//	서버 모듈 가져오기



//	웹서버 가동하기
server.listen(9999, function(){

	console.log("server is running 9999 port");

} );
