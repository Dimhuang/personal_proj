export const isMobile = (func) => {
  if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    func(true)
    return
  } else {
    func(false)
    return
  }
};


export const getRequest = (func) => {
  var url = location.search;
  var theRequest = new Object();//获取url中"?"符后的字串
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
    }
  }
  func(theRequest)
  return theRequest;
}
