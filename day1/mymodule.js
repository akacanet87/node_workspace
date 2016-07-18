/*

	nodejs에서 개발자가 객체를 정의할 수 있는데,
	특히 nodejs에서는 객체를 모듈이라고 한다.
	nodejs에서는 저장된 파일을 모듈이라고 한다.

*/

exports.getRandom = function(n){

	return parseInt(Math.random()*n);

}


exports.getExtend = function(root){

	
	var path = root;
	//var path =  __filename;
	var ext = path.substr(path.lastIndexOf("//")+1, path.length);
	var extarr = ext.split(".");

	return extarr[1];

}