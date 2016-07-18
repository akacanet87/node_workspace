/*

	nodejs 내장 객체 중 query 내장 모듈을 학습한다.

*/


var query = require("querystring");

var result = query.parse("http://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=102&oid=001&aid=0008547873");

console.log(result);