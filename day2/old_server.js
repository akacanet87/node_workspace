/*

		nodejs는 완제품이 아니다.
		따라서 서버를 내가 직접 코드로 작성해야 한다.
		하지만 nodejs 자체의 문법 및 내장, 외부 모듈 등을 이용하면
		서버구축은 상당히 쉬워진다.

*/


//	내부 모듈 중 http 모듈을 가져오기 (모듈 = 객체 + 메서드)
var http = require("http");

//	파일의 내용을 읽어 들일 수 있는 내부 모듈
var fs = require("fs");

//	서버 객체 생성
var server = http.createServer(function(request, response){

	//	서버는 이미 W3C가 정해놓은 형식에 맞춰서 클라이언트에게 응답해야 하므로
	//	아래와 같은 코드가 작성되어야 한다.
	response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
	
	//	end() 의 인수에는 클라이언트가 받게 될 문자열 컨텐츠를 넣을 수 있다.
	
	//	클라이언트가 green.html을 원하면
	console.log(request.url);

	var data;

	if( request.url !="/favicon.ico" ){

		data = fs.readFileSync( "."+request.url, "utf8" );

	}


/*

	if( request.url == "/green.html"){

		console.log("녹색 페이지를 원해?");

	}else if(request.url == "/yellow.html"){

		console.log("노란색 페이지를 원해?");

	}

*/

	response.end(data);
	

	//	클라이언트가 yellow.html을 원하면
	//	response.end("test");

});

//	서버 가동
server.listen(8383, function(){

	console.log("server is running at 8383");

});
