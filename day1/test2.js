/*

	nodejs가 자바스크립트이긴 하나, 기존 자바스크립트에는 없는 기능들이 있다.
	그 중 전역변수와 전역함수에 대해 배워보기

	__filename : 현재 실행하고 있는 파일의 풀 경로
	__dirname : 현재 실행하고 있는 파일의 디렉토리 경로

*/

var path = __filename;
var len = path.length;
var str = path.substr(path.lastIndexOf("\\")+1, len);
var str_arr = str.split(".");


console.log("__filename은 "+__filename);

console.log("__dirname은 "+__dirname);

console.log("파일명은 "+str);

console.log("확장자 분리하면 "+str_arr);

console.log("파일명만 보면 "+str_arr[0]);

console.log("확장자를 보면 "+str_arr[1]);

//console.log("확장자는"+);