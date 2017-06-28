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
  data.AccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxODM1NjI4ODQ1OSIsImlzcyI6IkxpbmtlZFlvdSIsImF1ZCI6Imh0dHA6Ly93d3cubGlua2VkeW91LmNuIiwiaWF0IjoxNDk4NjQzMDY4LCJleHAiOjE0OTg3Mjk0NjgsIm5iZiI6MTQ5ODY0MzA2OCwianRpIjoiMDFiZTk4NDMtNDA4Yi00NjkxLWIzMjMtYTQzN2E1YzI0NGQ0In0.wa1eiFILAGIJPBQO_OV_PPHD81kNb5g6rsYLXU-S2-I';
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
  var params = {
    'resid': 541502768110,
    'data': data
  }
  baseRequest("GET",path.getData, params, 2, doSuccess, doFail);
}

//计算时长
function hourCalculate(params, doSuccess, doFail) {
  baseRequest("GET",path.getData, params, 2, doSuccess, doFail);
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
  hourCalculate:hourCalculate
}

// //图片上传
// function uploadImg(tempFilePath,callback){
//   //res.tempFilePaths[0]
//     wx.uploadFile({
//       url: getApp().Config.uploadImgPath + tempFilePath,
//       filePath: tempFilePath,
//       name: 'file',
//       success: function (e) {
//         var data = e.data;
//         console.log("image-====>" + e.data);
//         var imgModel = JSON.parse(e.data);
//         if (imgModel.Data) {
//           callback(getApp().Config.basePath + imgModel.Data)
//         } else {
//           wx.showModal({
//             title: '注意',
//             content: '上传错误',
//           })
//         }

//       },
//       fail: function (e) {
//         wx.showModal({
//           title: '注意',
//           content: '图片上传失败',
//         })
//       }
//     })


// }

/*
//获取openid unionid
function customLogin(params, doSuccess, doFail) {
  getRequest(path.dataLogin, params, doSuccess, doFail);
}

//发送验证码
function sendValidMsg(params, doSuccess, doFail) {
  // params.openid = wx.getStorageSync('openid');
  // params.unionid = wx.getStorageSync('unionid');
  getRequest(path.sendValiateCode, params, doSuccess, doFail);
}

//验证
function authClient(params, doSuccess, doFail) {
  // params.openid = wx.getStorageSync('openid');
  // params.unionid = wx.getStorageSync('unionid');
  getRequest(path.authCode, params, doSuccess, doFail);
}

// module.exports = {
//   customWxLogin: customWxLogin,
//   getApplyData: getApplyData,
//   hourCalculate: hourCalculate,
//   addApply: addApply,
//   getSubData: getSubData,
//   saveData: saveData,
//   addData: addData,
//   getData:getData,
//   saveDataArr:saveDataArr,
//   uploadImg: uploadImg,
//   customLogin: customLogin,
//   sendValidMsg: sendValidMsg,
//   authClient: authClient
// }


*/