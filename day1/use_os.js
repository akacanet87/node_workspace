

var os=require("os");

//cpu 정보
//console.log(os.cpus());

//메모리 정보
console.log(parseInt(os.freemem()/1024/1024)+"Mb");


//	플랫폼
console.log(os.platform());