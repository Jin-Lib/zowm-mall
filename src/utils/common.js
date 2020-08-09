/**
 * 获取文件名称
 */
export function generateUUID() {
  var d = new Date().getTime();
  if(window.performance && typeof window.performance.now === "function"){
      d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
} 

/**
 * 获取链接参数
 */
export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]); return null;
}

export function serializeData(obj){
	let str='?'
  Object.keys(obj).forEach(function(key){
    str+=key+"="+obj[key]+'&'
  });

  var reg=/&$/gi;
  str=str.replace(reg,""); //清除最后一个&符号
  return str
}
