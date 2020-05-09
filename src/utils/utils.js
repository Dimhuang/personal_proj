export const isMobile = (func) => {
  if(/phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent)) {
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

export const fileType = (filename,type) => {
  //JavaScript根据文件名判断文件类型

  var imgExt = new Array(".jpg",".jpeg",".bmp",".gif");//图片文件的后缀名
  var pngExt = new Array(".png");//png文件的后缀名
  var docExt = new Array(".doc",".docx");//word文件的后缀名
  var pdfExt = new Array(".pdf");//pdf文件的后缀名
  var xlsExt = new Array(".xls",".xlsx");//excel文件的后缀名
  var mp3Ext = new Array(".mp3");//mp3文件的后缀名
  var pptExt = new Array(".ppt",".pptx");//ppt文件的后缀名
  var txtExt = new Array(".txt");//txt文件的后缀名
  var vidExt = new Array(".mp4",".avi",".rmvb",".mov");//video文件的后缀名



    // 后缀获取
    var suffix = '';
    // 获取类型结果
    var result = '';
    try {
      var flieArr = filename.split('.');
      suffix = flieArr[flieArr.length - 1];
    } catch (err) {
      suffix = '';
    }
    // fileName无后缀返回 false
    if (!suffix) {
      result = false;
      return result;
    }
    suffix = suffix.toLowerCase()
    // 图片格式
    var imglist = ['jpg', 'jpeg', 'bmp', 'gif'];
    // 进行图片匹配
    result = imglist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      if(type==1){
        return 'f-jpg-icon';
      }else{
        return 'f-wap-jpg-icon';
      }
    };
    // png格式
    var pnglist = ['png'];
    // 进行图片匹配
    result = pnglist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      if(type==1){
        return 'f-png-icon';
      }else{
        return 'f-wap-png-icon';
      }
    };
    // 匹配txt
    var txtlist = ['txt'];
    result = txtlist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      if(type==1){
        return 'f-txt-icon';
      }else{
        return 'f-wap-txt-icon';
      }
    };
    // 匹配 excel
    var excelist = ['xls', 'xlsx'];
    result = excelist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      if(type==1){
        return 'f-xls-icon';
      }else{
        return 'f-wap-xls-icon';
      }
    };
    // 匹配 word
    var wordlist = ['doc', 'docx'];
    result = wordlist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      if(type==1){
        return 'f-doc-icon';
      }else{
        return 'f-wap-doc-icon';
      }
    };
    // 匹配 pdf
    var pdflist = ['pdf'];
    result = pdflist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      if(type==1){
        return 'f-pdf-icon';
      }else{
        return 'f-wap-pdf-icon';
      }
    };
    // 匹配 ppt
    var pptlist = ['ppt','pptx'];
    result = pptlist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      if(type==1){
        return 'f-ppt-icon';
      }else{
        return 'f-wap-ppt-icon';
      }
    };
    // 匹配 视频
    var videolist = ['mp4', 'm2v', 'mkv'];
    result = videolist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      if(type==1){
        return 'f-video-icon';
      }else{
        return 'f-wap-video-icon';
      }
    };
    // 匹配 音频
    var radiolist = ['mp3'];
    result = radiolist.some(function (item) {
      return item == suffix;
    });
    if (result) {
      if(type==1){
        return 'f-mp3-icon';
      }else{
        return 'f-wap-mp3-icon';
      }
    }

    // 其他 文件类型
    if(type==1){
      return 'f-na-icon';
    }else{
      return 'f-wap-na-icon';
    }

};

//obj : 1
export const global_ = {
  obj : sessionStorage.getItem('globalObj')  //1：3.0客户端，2：麒麟客户端
}

//上传 打包时需去掉/api
export const upload_url = "/wap/meeting/upload_tmpfile"
