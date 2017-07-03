define(['durandal/app', 'knockout', 'plugins/router', 'httpService','until'], 
function (app, ko, router,httpService,ut) {
  var self;
  return {
    data: {
      vacationCategorySuccess: false,
      teamApproveSuccess: false,
      refuseArrSuccess: false
    },
    login: function () {
      self = this;
      var userStr = $("#account").val();
      var passWordStr = $("#passWord").val();

      console.log("--------->" + userStr + passWordStr)
      var url = "https://kingofdinner.realsun.me:9092/api/Account/Login"
      var data = { "Code": "demo1", "Password": "kingofdinner@2017", "unionid": "" };
      // var data = { "Code": userStr, "Password": passWordStr, "unionid": "" };
      httpService.accountLogin(data, function (e) {
        if (e.OpResult == 'Y') {
          cmAlert("登录成功",function(){});
             var tmpData  = {
            'Dep1Code':'9063'
          }
          e.data = tmpData
          appConfig.app.userInfo = e;

          self.getVacationCategory();
          self.getTeamApprove();
          self.getRefuseData();
          
         



        } else {
          cmAlert(e.ErrorMsg);
        }
      }, function () {
        cmAlert('系统错误');
      })


      // var param = {
      //     'apitoken': 'KingOfDinner123456789',
      //     'clienttype': 'mobile',
      //     'openid': 'oqWaVwKG0Yj0_8cbsSB3b9R31YcA'
      //   }
      // httpService.accountLogin(param, function (e) {
      //      if (e.error == 0) {
      //                 // cmAlert("success");   
      //                 appConfig.app.userInfo = e;
      //                 self.getVacationCategory();
      //       self.getTeamApprove();
      //       self.getRefuseData();



      //             } else {
      //                 cmAlert(e.ErrorMsg);
      //             }
      // }, function () {
      //     cmAlert('doWindowlogin:系统错误');
      // })

    },

    getVacationCategory: function () {
      httpService.getVacationHttpCategory(function (data) {
        if (data && data.data) {
          var dataArr = data.data;
          var tmpArr = [];
          for (var i = 0; i < dataArr.length; i++) {
            tmpArr.push(dataArr[i].C3_533402301362);
          }
          appConfig.app.rule = dataArr;
          appConfig.app.vacationCategory = tmpArr;
          self.data.vacationCategorySuccess = true
          self.gotoApplyPage();
        } else {
          cmAlert('获取假期类别失败')
        }
      }, function () {
        cmAlert('获取假期类别失败')
      });
    },
    getTeamApprove: function () {
      httpService.getTeamHttpApprove(function (data) {
        if (data && data.data) {
          var dataArr = data.data;

          if (dataArr[0].C3_541450807755 == dataArr[0].C3_541450797951) {
            appConfig.app.teamApprove = dataArr[0].C3_541467332728;
          } else {
            appConfig.app.teamApprove = dataArr[0].C3_541450797951;
          }

          console.log('appConfig.app.teamApprove' + appConfig.app.teamApprove);
          self.data.teamApproveSuccess = true
          self.gotoApplyPage();
        } else {
          cmAlert('获取审批组长类别失败')
        }
      }, function () {
        cmAlert('获取审批组长类别失败')
      });
    },
    gotoApplyPage: function () {
      if (self.data.vacationCategorySuccess && self.data.teamApproveSuccess && self.data.refuseArrSuccess) {
        router.deactivate();
        router.reset();
        app.setRoot('shell');

      } else {

      }

    },
    getRefuseData: function () {
      var params = {
        'resid': 541705605790,
        'subresid': '',
        'cmswhere': '',
        'key': ''
      }
      httpService.getRefuseHttpData(params, function (data) {
        if (data && data.data) {
          var dataArr = data.data;
          var tmpArr = [];
          for (var i = 0; i < dataArr.length; i++) {
            tmpArr.push(dataArr[i].C3_541705620055);
          }
          appConfig.app.refuseArr = tmpArr;

          self.data.refuseArrSuccess = true
          self.gotoApplyPage();
        } else {
          cmAlert('获取退回理由失败')
        }
      }, function () {
        cmAlert('获取退回理由失败')
      });
    }
  };
}); 