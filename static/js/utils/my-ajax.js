var base_url='http://127.0.0.1:8000/getdata/';
var MY_AJAX={};
MY_AJAX.get=function(url,data){
    var token=localStorage.getItem('token');
    return $.ajax({
        url:base_url+url,
        Headers:{
            Authorization:token,
        },
        type:"get",
        data:data,
    });
};
/**
 *
 * @param {请求地址} url
 * @param {请求参数} data
 */
 MY_AJAX.post = function (url, data) {
    var token=localStorage.getItem('token');
    return $.ajax({
      // 地址
      url: BASE_URL + url,
      headers:{
        'Content-Type':'application/json;charset=utf-8',
        Authorization:token,
      },
      // 请求类型
      type: "post",
      // 发送参数
      data: JSON.stringify(data)
      
    });
  };