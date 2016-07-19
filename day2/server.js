/*

	http 내장 모듈로만은 완전한 웹 서버를 구축하기엔
	너무나 부족하다. 따라서 express 모듈을 사용하자
	express 모듈이란 웹 서버 구축에 필요한 기능들을 위해
	http 모듈에 추가시켜 놓은 외부 모듈 (http의 업그레이드 모듈.
	그러나 두 모듈은 같이 사용해야 한다.)

	ejs 모듈을 이용하면 html문서내에서 반복문 등의
	기초적인 자바스크립트 프로그래밍 문법이 적용될 수 있다.

*/


var http = require("http");					//	내

var express = require("express");			//	외
				
var fs = require("fs");						//	내

var mysql = require("mysql");				//	외

//	express 모듈로부터 application 객체를 생성한다.
var app = express();

//	application 객체란 웹서버 역할을 담당할 객체이다.
//	웹 서버의 역할이란 요청에 대해 응답을 처리하는 역할이다.

var bodyParser = require("body-parser");

var ejs = require("ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//	mysql 서버에 접속
var client = mysql.createConnection({

	"url":"localhost",
	"user":"root",
	"password":""

});


client.query("use iot");
/*

app.use(function(request, response){

	response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
	response.end("express 모듈로 구축한 서버의 응답 메세지");

});

*/

//	app.use() 메서드 안에는 미들웨어라고 불리는 각종 express에 지원함수들이
//	자리잡을 수 있다.


//	라우팅 미들웨어를 사용해본다. route란 방향을 잡는 것을 말하고,
//	nodejs에서는 원하는 페이지를 나오게 처리해준다.
//app.use(app.router);		//	라우팅 시 함수() 표시 X

//	클라이언트가 get방식으로 요청을 시도하면 동작하게 될 메서드

//	게시물 목록 보기 요청 처리
app.route("/list").get(function(request, response){

	//	list.html 페이지를 읽어들인 결과를 page변수에 담음
	var page = fs.readFileSync("./list.html", "utf8");

	//	응답전에 이미 데이터베이스에서 레코드들을 가져와야 한다,
	client.query("select * from student", function(error, records){
	
		if(!error){

			console.log(records);

			response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
			response.end(ejs.render(page, {dataList:records}));
			//	page를 렌더링 하면서 2번째 인수로 전달한 객체를 렌더링 대상이 되는
			//	html에 전달해준다


		}else{

			console.log("망했어요 ㅠㅠ");

		}
	
	});

	

});


//	등록 폼을 원하면 http://localhost:8383/regist_form
app.route("/regist_form").get(function(request, response){

	//console.log("노란 페이지를 원하냐");
	var data = fs.readFileSync("./regist_form.html", "utf8");

	response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
	response.end(data);

});


//	클라이언트가 등록을 원하면 post 방식으로 요청할 경우
//	서버에서는 post() 메서드로 받아야 한다
app.route("/regist").post(function(request, response){

	console.log(request.body);

	var data = request.body;

	//	클라이언트가 보낸 데이터를 받고
	var id =	data.id;	//request.params.id;	//	express 모듈 사용 시 request가 업그레이드되었기 때문
											//	param() 메서드를 사용할 수 있다.
	var pwd = data.pwd;		//request.params.pwd;
	var name = data.name;		//request.params.name;
	
	//console.log("넘겨받은 id는 "+data.id);
	//console.log("넘겨받은 pwd는 "+data.pwd);
	//console.log("넘겨받은 name는 "+data.name);
	//	받은 데이터를 데이터베이스에 넣는다.

	//	쿼리문 수행 후에 두번째 인수인 익명 함수가 작동한다. 개발자는 여기서
	//	등록 성공. 실패 여부를 확인할 수 있다.
	client.query("insert into student(id, pwd, name) values('"+data.id+"','"+data.pwd+"','"+data.name+"')", function(error, records, field){

		if(error){

			console.log("등록 실패입니다.");

		}else{

			console.log("등록 성공입니다.");

			//	리스트 페이지에 대한 요청
			// 클라이언트의 브라우저로 하여금 지정한 url로 요청을 다시 시도 하라는 명령
			response.redirect("/list");
		}

	});


});


//	상세보기 요청이 들어오면
app.route("/detail/:id").get(function(request, response){

	var data = fs.readFileSync("./detail.html", "utf8");

	//	데이터베이스에 연동되어 있어야 한다.
	//	유저가 선택한 id를 get방식으로 넘겨받았어야 한다.
	console.log("유저가 서버로 전송한 아이디는 "+request.params.id);

	client.query("select * from student where id='"+request.params.id+"'", function(error, records){
	
	if(!error){

		console.log(records);
		response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
		response.end(ejs.render(data, {obj:records}));

	}else{

		console.log("일치하는 데이터를 발견할 수 없습니다.");

	}

	});

});


//	삭제 요청 처리
app.route("/delete/:id").get(function(request, response){

	var id = request.params.id;


	client.query("delete from student where id='"+id+"'", function(error, records){

		console.log("delete from student where id='"+id+"'");

		if( !error ){

			response.redirect("/list");

		}else{

			console.log("삭제 실패");

		}
	
	});

});



//	서버 구동 시작
var server = http.createServer(app);

server.listen(8383, function(){

	console.log("Server is running at 8383");

});