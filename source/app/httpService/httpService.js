// 发起get请求
const path = {
  baseUrl: 'https://kingofmall.realsun.me/',
  // baseUrl:'https://kingofdinner.realsun.me:9092/',
  config: '/config',
  // login: 'api/Account/Login',

  login: 'rispweb/rispservice/apiSvrLogin.aspx',
  getData: 'rispweb/risphost/data/AjaxService.aspx',

  apply: 'rispweb/risphost/data/AjaxService.aspx',
  dataLogin: 'kingofweixin/WxOpen/loginService',
  sendValiateCode: 'kingofweixin/rsauth/SendValidMsg',
  authCode: 'kingofweixin/rsauth/AuthClient'
}

function fixDataWithMethod(data, method) {
  if (method == 0) return data;

  data.uiver = 200;
  data.dynlogin = 1;

 data.user = '18356288459';
  data.AccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxODM1NjI4ODQ1OSIsImlzcyI6IkxpbmtlZFlvdSIsImF1ZCI6Imh0dHA6Ly93d3cubGlua2VkeW91LmNuIiwiaWF0IjoxNDk4ODE2NzcyLCJleHAiOjE0OTg5MDMxNzIsIm5iZiI6MTQ5ODgxNjc3MiwianRpIjoiYjFiMDY2ZTEtNWY1OC00ZWEyLTkwMTEtMjliYTE1ZDAyN2VjIn0.UuOGzm773owHc_SM2LuItE1NmWNJ-ICiCZ_ysiUUua4';
  // data.AccessToken = appConfig.app.userInfo.AccessToken;

  //获取主表数据
  if (method == 1) {
    data.method = 'ShowHostTableDatas_Ajax';

  //增 改 数据
  } else if (method == 2 || method == 4) {
    data.method = 'SaveData_Ajax';
    data.data._id = 1;

    if (method == 2) {
      data.data._state = "added";
      data.data.REC_ID = 0;
    } else {
      data.data._state = "modified";
    }

    data.data = JSON.stringify([data.data]);
    
  //获取附表数据
  } else if (method == 3) {
    data.method = 'ajax_GetRelTableByHostRecord';
  
  //修改多条数据
  } else if (method == 5) {
    data.method = 'SaveData_Ajax';
    data.data = JSON.stringify(data.data);
  }
  return data;
}

//打印url
function printUrl(url,data){
    var str = path.baseUrl + url + '?';
  for (var key in data) {
    str = str + '&' + key + '=' + data[key];
  }
  console.log(str);
}

//ajax请求
function baseRequest(type, url, data,method, doSuccess, doFail) {
  data = fixDataWithMethod(data,method);

  printUrl(url,data);
  $.ajax({
    url: path.baseUrl + url,
    data: data,
    dataType: "json",
    type: type,
    success: function (res) {
      if (res.statusCode == 401) {

      } else if (res.statusCode == 404) {
        wx.showToast({
          title: '请求出错',
          icon: 'loading'
        });
      } else {
        
         if (typeof doSuccess == "function") {

          if (res != '' && 'error' in res){

            if (res.error == 0) {
              doSuccess(res);
            } else {

              if (res.message)  alert(res.message);
              doFail();
            }

          }else{
            doSuccess(res);
          }
        }
        


      }
    },
    error: function (e) {
      if (typeof doFail == "function") {
        doFail();
      }
    }
  });
}

//账户登录
function accountLogin(params, doSuccess, doFail){
  baseRequest("POST",path.login, params, 0, doSuccess, doFail);
}

//获取申请中数据
function getApplyingData(params, doSuccess, doFail){
  params.resid = 541502768110
  baseRequest("GET",path.getData, params, 1, doSuccess, doFail);
}

//获取审批中数据
function getPendingData(params, doSuccess, doFail){
  params.resid = 541518842754
  baseRequest("GET",path.getData, params, 1, doSuccess, doFail);
}

//获取假期类型
function getVacationHttpCategory( doSuccess, doFail){
  var params = {
      'resid': 542128856156,
      'subresid': '',
      'cmswhere': '',
      'key': ''
    }
  baseRequest("GET",path.getData, params, 1, doSuccess, doFail);
}

// 获取审批人
function getTeamHttpApprove( doSuccess, doFail){
  var params = {
      'resid': 542225544503,
      'subresid': '',
      'cmswhere': '',
      'key': ''
    }
  baseRequest("GET",path.getData, params, 1, doSuccess, doFail);
}

// 获取退回类型
function getRefuseHttpData(params,doSuccess, doFail){
 
  baseRequest("GET",path.getData, params, 1, doSuccess, doFail);
}

// 添加请假数据
function addApply(params, doSuccess, doFail) {
   
    params.resid = 541502768110;
  baseRequest("GET",path.getData, params, 2, doSuccess, doFail);
}

// 保存请假数据
function saveApply(params, doSuccess, doFail) {
  params.resid = 541502768110;
  baseRequest("GET",path.getData, params, 4, doSuccess, doFail);
}

//计算时长
function hourCalculate(params, doSuccess, doFail) {
  baseRequest("GET",path.getData, params, 2, doSuccess, doFail);
}

// 上传图片
function uploadImg(param,doSuccess, doFail) {
   var xhr = new XMLHttpRequest();
                var uploadFileUrl = 'http://kingofdinner.realsun.me:8081/rispweb/rispservice/SvcUploadFile2.aspx'
                httppath = "http://kingofdinner.realsun.me:8081/rispweb/upfiles"
                  var upUrlStr = uploadFileUrl+ '?savepath=c:\\web\\web\\rispweb\\upfiles&httppath=' + httppath;//alert(upUrlStr);
                  xhr.open('POST', upUrlStr);
                  xhr.onload = function () {
                        var data = JSON.parse(xhr.response);
                        if (xhr.status === 200) {
                              alert("上传成功");
                              var imgUrl = data.httpfilename;
                              console.log(imgUrl);
                              if(doSuccess) doSuccess(imgUrl);
                        } else {
                              if(doFail) doFail();
                              // 处理错误
                              alert('error==' + data);
                        }
                  };


                  var fd = new FormData();
                  fd.append("file", param, 'hello.png');//新建formdata提交，png格式
                  xhr.send(fd);
}

//获取审批流
function getPendingPepleData(paramREC_ID,doSuccess, doFail){
   var params = {
      'resid': 541502768110,
      'subresid': 541521075674,
      'cmswhere': '',
      'hostrecid': paramREC_ID,
      'cmsorder': ''
    }
    baseRequest("GET",path.getData, params, 3, doSuccess, doFail);
}


//撤销
function cancelApply(data,doSuccess, doFail) {
  data.C3_541449646638 = 'Y';
  var params = {
    'resid': 541502768110,
    'data': data
  }

  customLoading();
  baseRequest("GET",path.getData, params, 4, doSuccess, doFail);
}

// 获取已审核数据
function getAppledData(params, doSuccess, doFail){
  params.resid = 541518522808
  baseRequest("GET",path.getData, params, 1, doSuccess, doFail);
}

//退回修改数据 
function getFixSubmitData(params, doSuccess, doFail){
  params.resid = 543000345781
  baseRequest("GET",path.getData, params, 1, doSuccess, doFail);
}


// 我的申请历史记录
function getApplyHistoryData(params, doSuccess, doFail){
  params.resid = 541518678060
  baseRequest("GET",path.getData, params, 1, doSuccess, doFail);
}

//审批
function approveDataArr(param, doSuccess, doFail) {
   var params = {
      'resid': 541518842754,
      'data': param
    }
  baseRequest("GET",path.getData, params, 5, doSuccess, doFail);
}

var httpService = {
  accountLogin:accountLogin,
  getApplyingData:getApplyingData,
  getPendingData:getPendingData,
  getVacationHttpCategory:getVacationHttpCategory,
  getTeamHttpApprove:getTeamHttpApprove,
  getRefuseHttpData:getRefuseHttpData,
  addApply:addApply,
  saveApply:saveApply,
  hourCalculate:hourCalculate,
  uploadImg:uploadImg,
  getPendingPepleData:getPendingPepleData,
  cancelApply:cancelApply,
  getAppledData:getAppledData,
  getFixSubmitData:getFixSubmitData,
  getApplyHistoryData:getApplyHistoryData,
  approveDataArr:approveDataArr
}