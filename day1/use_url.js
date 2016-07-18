/*

	내장 모듈 중 url 모듈을 학습한다.
	URL : 자원의 위치 (Uniformed Resource Locator)

*/

var url = require("url");

//	특정 데이터로부터 데이터를 추출하는 과정을 파싱이라 한다
//	url 객체의 parse메서드는 지정한 url 정보에 대한 해석 후 json형태의
//	객체를 반환해준다.

var obj=url.parse("http://sports.news.naver.com/wfootball/news/read.nhn?oid=208&aid=0000001087");

console.log(obj);

console.log(obj.port);