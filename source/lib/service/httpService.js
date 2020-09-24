define(["untilRE"], function (until) {
  // 发起get请求
  var path = appConfig.app.path;
  if (localDebug) path.loginBaseUrl = path.baseUrl;

  function fixDataWithMethod(data, method) {
    if (method == -1) return data;
    if (method == 0) {
      //登录
      data.loginMethod = "badgeno"; //工号
      data.enterprisecode = enterprisecode;
      return data;
    }

    data.uiver = 200;
    data.dynlogin = 1;

    //获取主表数据
    if (method == 1) {
      //增 改 数据
    } else if (method == 2 || method == 4 || method == 7) {
      data.data._id = 1;

      if (method == 2) {
        data.data._state = "added";
        data.data.REC_ID = 0;
      } else if (method == 7) {
        data.data._state = "removed";
      } else {
        data.data._state = "modified";
      }

      data.data = JSON.stringify([data.data]);

      //获取附表数据
    } else if (method == 3) {
      //修改多条数据
    } else if (method == 5) {
      data.data = JSON.stringify(data.data);
      //增加或者保存多条数据
    } else if (method == 6) {
      if (Array.isArray(data.data)) {
        data.data.forEach(function (item) {
          item._id = 1;
          item._state = "editoradd";
        });
        data.data = JSON.stringify(data.data);
      }
    }
    return data;
  }

  //打印url
  function printUrl(url, data) {
    var str = path.baseUrl + url + "?";
    for (var key in data) {
      str = str + "&" + key + "=" + data[key];
    }
    console.log(str);
  }

  function getHeader(str) {
    if (str != path.loginBaseUrl + path.login) {
      if (!appConfig.app.userInfo) {
        console.error("用户信息错误");
        return {};
      }
      var headers = {
        userCode: appConfig.app.userInfo.UserCode,
        accessToken: appConfig.app.userInfo.AccessToken,
        loginmethod: "badgeno",
        badgeno: globBadgeno,
        enterprisecode: enterprisecode,
        unionid: "11",
      };
      return headers;
    } else return {};
  }

  //ajax请求
  function baseRequest(type, url, data, method, doSuccess, doFail) {
    data = fixDataWithMethod(data, method);
    // printUrl(url, data);
    var headers = getHeader(url);

    $.ajax({
      url: url,
      data: data,
      dataType: "json",
      type: type,
      headers: headers,
      success: function (res) {
        if (res.statusCode == 401) {
        } else if (res.statusCode == 404) {
          cmAlert("请求出错");
        } else {
          if (typeof doSuccess == "function") {
            if (res && ("error" in res || "Error" in res)) {
              if (res.error == 0 || res.Error == 0) {
                doSuccess(res);
              } else {
                if (res.message) cmAlert(res.message);
                if (typeof doFail == "function") {
                  doFail();
                }
              }
            } else {
              doSuccess(res);
            }
          }
        }
      },
      error: function (e) {
        if (typeof doFail == "function") {
          doFail();
        }
      },
    });
  }

  //账户登录
  function accountLogin(params, doSuccess, doFail) {
    var url = path.loginBaseUrl + path.login;
    baseRequest("POST", url, params, 0, doSuccess, doFail);
  }

  //获取申请中数据
  function getApplyingData(params, doSuccess, doFail) {
    var url = path.baseUrl + path.getData;
    params.resid = 541502768110;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //获取审批中数据
  function getPendingData(params, doSuccess, doFail) {
    var url = path.baseUrl + path.getData;
    // params.resid = 541518842754579635634837
    params.resid = 579635634837;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //获取假期类型
  function getVacationHttpCategory(doSuccess, doFail) {
    var url = path.baseUrl + path.getData;
    var params = {
      resid: 542128856156,
      subresid: "",
      cmswhere: "",
      key: "",
    };
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  // 获取审批人
  function getTeamHttpApprove(doSuccess, doFail) {
    var url = path.baseUrl + path.getData;
    var params = {
      resid: 542225544503,
      subresid: "",
      cmswhere: "",
      key: "",
    };
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  // 获取退回类型
  function getRefuseHttpData(params, doSuccess, doFail) {
    var url = path.baseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  // 添加请假数据
  function addApply(params, doSuccess, doFail) {
    var url = path.baseUrl + path.saveData;
    params.resid = 541502768110;
    baseRequest("POST", url, params, 2, doSuccess, doFail);
  }

  // 保存请假数据
  function saveApply(params, doSuccess, doFail) {
    var url = path.baseUrl + path.saveData;
    params.resid = 541502768110;
    baseRequest("POST", url, params, 4, doSuccess, doFail);
  }
  //删除请假数据
  function deleteApply(params, doSuccess, doFail) {
    var url = path.baseUrl + path.saveData;
    params.resid = 541502768110;
    baseRequest("POST", url, params, 7, doSuccess, doFail);
  }

  //计算时长
  function hourCalculate(params, doSuccess, doFail) {
    var url = path.baseUrl + path.saveData;
    baseRequest("POST", url, params, 2, doSuccess, doFail);
  }

  // 上传图片
  function uploadImg(param, doSuccess, doFail) {
    var xhr = new XMLHttpRequest();
    var uploadFileUrl = appConfig.app.uploadFileUrl;
    httppath = appConfig.app.httppath;
    var upUrlStr =
      uploadFileUrl +
      "?savepath=c:\\web\\web\\rispweb\\upfiles&httppath=" +
      httppath; //cmAlert(upUrlStr);
    xhr.open("POST", upUrlStr);
    xhr.onload = function () {
      var data = JSON.parse(xhr.response);
      if (xhr.status === 200) {
        cmAlert("上传成功");
        var imgUrl = data.httpfilename;
        console.log(imgUrl);
        if (doSuccess) doSuccess(imgUrl);
      } else {
        if (doFail) doFail();
        // 处理错误
        cmAlert("error==" + data);
      }
    };

    var fd = new FormData();
    fd.append("file", param, "hello.png"); //新建formdata提交，png格式
    xhr.send(fd);
  }

  //获取审批流
  function getPendingPepleData(paramREC_ID, doSuccess, doFail) {
    var params = {
      resid: 541502768110,
      subresid: 541521075674,
      // 'cmswhere': "",
      hostrecid: paramREC_ID,
      // 'cmsorder': ""
    };
    var url = path.baseUrl + path.getSubData;
    baseRequest("GET", url, params, 3, doSuccess, doFail);
  }

  //撤销
  function cancelApply(data, doSuccess, doFail) {
    var params = {
      resid: 541502768110,
      data: data,
    };
    var url = path.baseUrl + path.saveData;
    customLoading();
    baseRequest("POST", url, params, 4, doSuccess, doFail);
  }

  // 获取已审核数据
  function getAppledData(params, doSuccess, doFail) {
    var url = path.baseUrl + path.getData;
    params.resid = 541518522808;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //获取退回修改数据
  function getFixSubmitData(params, doSuccess, doFail) {
    var url = path.baseUrl + path.getData;
    params.resid = 543000345781;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  // 获取我的申请历史记录
  function getApplyHistoryData(params, doSuccess, doFail) {
    var url = path.baseUrl + path.getData;
    params.resid = 541518678060;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //审批
  function approveDataArr(param, doSuccess, doFail) {
    var params = {
      resid: 541518842754,
      data: param,
    };
    var url = path.baseUrl + path.batchAuditApplication;
    baseRequest("POST", url, params, 5, doSuccess, doFail);
  }

  //开始批量审批
  function startApprove(param, doSuccess, doFail) {
    var params = {
      resid: 541518842754,
      data: param,
    };
    var url = path.baseUrl + path.startSaveTask;
    baseRequest("POST", url, params, 5, doSuccess, doFail);
  }

  //获取审批进度
  function getApprove(param, doSuccess, doFail) {
    var params = {
      taskid: param.taskid,
    };
    var url = path.baseUrl + path.retrieveSaveTask;
    baseRequest("GET", url, params, 5, doSuccess, doFail);
  }

  //已审批数据
  function getPendedData(params, doSuccess, doFail) {
    params.resid = 541518986783;
    var url = path.baseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //获取审批退回数据
  function getPendedRefuseData(params, doSuccess, doFail) {
    params.resid = 541519417864;
    var url = path.baseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //审批历史记录数据
  function getPendedHistoryData(params, doSuccess, doFail) {
    params.resid = 541520707421;
    var url = path.baseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //获取时间选项
  function getDayOptions(params, doSuccess, doFail) {
    params.cmswhere = "";
    params.resid = "543946502584";
    var url = path.baseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //获取当月排班
  function getMonthWorkData(params, doSuccess, doFail) {
    params.resid = "543666594803";
    var url = path.baseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //获取考勤日报
  function getDayReportData(params, doSuccess, doFail) {
    getMonthWorkData(params, doSuccess, doFail);
  }

  //获取考勤月报
  function getMonthReportData(params, doSuccess, doFail) {
    params.resid = "543666672286";
    var url = path.baseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //查询所有员工审批定义数据
  function getAllStaffPendData(params, doSuccess, doFail) {
    params.resid = "542065063018";
    var url = path.baseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //查询个人所对应的组长，主管，经理列表
  function getSelectPesonData(params, doSuccess, doFail) {
    params.resid = "554233627911";
    var url = path.baseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //增加个人设置的组长，主管，经理列表
  function addPesonPendData(params, doSuccess, doFail) {
    params.resid = "542065063018";
    var url = path.baseUrl + path.saveData;
    baseRequest("POST", url, params, 2, doSuccess, doFail);
  }

  //保存（编辑）个人设置的组长，主管，经理列表
  function savePesonPendData(params, doSuccess, doFail) {
    params.resid = "542065063018";
    var url = path.baseUrl + path.saveData;
    baseRequest("POST", url, params, 4, doSuccess, doFail);
  }

  //获取微信考勤申请记录
  function getApplyDataForWX(params, doSuccess, doFail) {
    params.resid = "552993482400";
    var url = path.loginBaseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //获取微信考勤申请审批数据
  function getApplyPendDataForWX(params, doSuccess, doFail) {
    params.resid = "552993482400";
    params.subresid = "554315806876";
    var url = path.loginBaseUrl + path.getSubData;
    baseRequest("GET", url, params, 3, doSuccess, doFail);
  }

  //撤销微信考勤申请记录
  function cancelApplyDataForWX(params, doSuccess, doFail) {
    params.resid = "552993482400";
    var url = path.loginBaseUrl + path.saveData;
    baseRequest("POST", url, params, 4, doSuccess, doFail);
  }
  //撤销微信考勤申请记录
  function saveApplyDataForWX(params, doSuccess, doFail) {
    params.resid = "552993482400";
    var url = path.loginBaseUrl + path.saveData;
    baseRequest("POST", url, params, 4, doSuccess, doFail);
  }

  //获取考勤员日报数据
  function getEmployeeDayWorkReportData(params, doSuccess, doFail) {
    params.resid = "375296167687";
    var url = path.loginBaseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //获取员工日报数据
  function getDayWorkReportData(params, doSuccess, doFail) {
    params.resid = "554407385613";
    var url = path.loginBaseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //同步考勤员日报数据
  function syncDailyData(params, doSuccess, doFail) {
    params.resid = "543418244671";
    var url = path.extranetBaseUrl + path.saveData;
    baseRequest("POST", url, params, 6, doSuccess, doFail);
  }

  //获取手册列表
  function getReadBookListData(params, doSuccess, doFail) {
    params.resid = "555413706936";
    var url = path.baseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //修改手册日期和政策公告
  function saveReadBookListData(params, doSuccess, doFail) {
    params.resid = "555413706936";
    var url = path.baseUrl + path.saveData;
    baseRequest("POST", url, params, 4, doSuccess, doFail);
  }

  //获取手册内容
  function getReadBookData(params, doSuccess, doFail) {
    var url = path.baseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //保存手册内容
  function saveReadBookData(params, doSuccess, doFail) {
    var url = path.baseUrl + path.saveData;
    baseRequest("POST", url, params, 4, doSuccess, doFail);
  }

  //获取路由
  function getRouteData(params, doSuccess, doFail) {
    params.resid = appConfig.app.routeResid;
    var url = path.baseUrl + path.getData;
    baseRequest("GET", url, params, 1, doSuccess, doFail);
  }

  //修改密码
  function changePassWord(params, doSuccess, doFail) {
    var url = path.loginBaseUrl + path.changePassWrod;
    baseRequest("POST", url, params, -1, doSuccess, doFail);
  }

  //忘记密码
  function forgetPassWord(params, doSuccess, doFail) {
    params.resid = "557247856756";
    var url = path.baseUrl + path.forgetPassWord;
    baseRequest("GET", url, params, -1, doSuccess, doFail);
  }

  //添加多个审批人设置数据
  function addMorePendPerson(params, doSuccess, doFail) {
    params.resid = "542065063018";
    var url = path.baseUrl + path.saveData;
    baseRequest("POST", url, params, 6, doSuccess, doFail);
  }

  var httpService = {
    accountLogin: accountLogin,
    getApplyingData: getApplyingData,
    getPendingData: getPendingData,
    getVacationHttpCategory: getVacationHttpCategory,
    getTeamHttpApprove: getTeamHttpApprove,
    getRefuseHttpData: getRefuseHttpData,
    addApply: addApply,
    saveApply: saveApply,
    deleteApply: deleteApply,
    hourCalculate: hourCalculate,
    uploadImg: uploadImg,
    getPendingPepleData: getPendingPepleData,
    cancelApply: cancelApply,
    getAppledData: getAppledData,
    getFixSubmitData: getFixSubmitData,
    getApplyHistoryData: getApplyHistoryData,
    approveDataArr: approveDataArr,
    startApprove: startApprove,
    getApprove: getApprove,
    getPendedData: getPendedData,
    getPendedRefuseData: getPendedRefuseData,
    getPendedHistoryData: getPendedHistoryData,
    getDayOptions: getDayOptions,
    getMonthWorkData: getMonthWorkData,
    getDayReportData: getDayReportData,
    getMonthReportData: getMonthReportData,
    getAllStaffPendData: getAllStaffPendData,
    getSelectPesonData: getSelectPesonData,
    addPesonPendData: addPesonPendData,
    savePesonPendData: savePesonPendData,
    getApplyDataForWX: getApplyDataForWX,
    getApplyPendDataForWX: getApplyPendDataForWX,
    cancelApplyDataForWX: cancelApplyDataForWX,
    saveApplyDataForWX: saveApplyDataForWX,
    getDayWorkReportData: getDayWorkReportData,
    getReadBookListData: getReadBookListData,
    getReadBookData: getReadBookData,
    saveReadBookData: saveReadBookData,
    saveReadBookListData: saveReadBookListData,
    getRouteData: getRouteData,
    changePassWord: changePassWord,
    forgetPassWord: forgetPassWord,
    addMorePendPerson: addMorePendPerson,
    getEmployeeDayWorkReportData: getEmployeeDayWorkReportData,
    syncDailyData: syncDailyData,
  };
  return httpService;
});
