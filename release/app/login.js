define(['durandal/app', 'knockout', 'plugins/router', 'httpServiceRE', 'untilRE'],
  function (app, ko, router, httpService, ut) {
    var self;
    return {
      data: {
        vacationCategorySuccess: false,
        refuseArrSuccess: false,
        radomPhotoNum: ko.observable(1)
      },
      activate: function () {
        self = this;

        self.data.vacationCategorySuccess = false;
        self.data.refuseArrSuccess = false;

        // 随机背景图片
        var radmomNum = Math.floor(Math.random() * 4) + 1
        self.data.radomPhotoNum("url('../../img/img/photo" + radmomNum + ".jpg')")
      },

      // 登录
      login: function () {
        if (localDebug) console.log("loginClick")
        $("#loginBtn").button('loading');

        var userStr = $("#account").val();
        var passWordStr = $("#passWord").val();

        if (localDebug) userStr = "80881"
        // if (localDebug) { userStr = "20465"; passWordStr = "095028"; }
        //  if (localDebug){ userStr = "demo1"   ;passWordStr = "66287175";} 
        var data = { "badgeno": userStr, "Password": passWordStr };

        httpService.accountLogin(data, function (e) {
          if (e.OpResult == 'Y') {
            cmAlert("登录成功");
            var tmpData = {
              'Dep1Code': enterprisecode
            }
            e.data = tmpData
            appConfig.app.userInfo = e;
            globBadgeno = userStr;

            self.getVacationCategory();
            self.getTeamApprove();
            self.getRefuseData();


          } else {
            cmAlert(e.ErrorMsg);
          }
          $("#loginBtn").button('reset')
        }, function () {
          $("#loginBtn").button('reset')
          cmAlert('系统错误');
        })

      },

      // 获取假期数据
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

      // 获取审批人
      getTeamApprove: function () {
        httpService.getTeamHttpApprove(function (data) {
          // if(localDebug) data.data = ['11'];
          if (data && data.data && data.data[0]) {
            var dataArr = data.data;

            if (dataArr[0].C3_541450807755 == dataArr[0].C3_541450797951) {
              appConfig.app.teamApprove = dataArr[0].C3_541467332728;
            } else {
              appConfig.app.teamApprove = dataArr[0].C3_541450797951;
            }

            if (localDebug) console.log('appConfig.app.teamApprove' + appConfig.app.teamApprove);
            // self.gotoApplyPage();
          } else {
            cmAlert('获取审批组长类别失败');
          }
        }, function () {
          cmAlert('获取审批组长类别失败');
        });
      },



      //获取拒绝数据
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
      },


      // 跳转到主路由
      gotoApplyPage: function () {
        if (self.data.vacationCategorySuccess && self.data.refuseArrSuccess) {
          router.deactivate();
          router.reset();
          app.setRoot('shell');
          $("#loginBtn").button('reset');
          if(localDebug) console.log("go to shell invoke")
        }
      }
    };
  }); 