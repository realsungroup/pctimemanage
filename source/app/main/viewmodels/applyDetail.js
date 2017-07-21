define(['durandal/app',
  'knockout',
  'plugins/router',
  'httpServiceRE',
  'mobiscroll',
  'commonRE',
  'untilRE',
  'components/cellReadonlyCpt', 'photoswipeRE/photoswipe-ui-default.min', 'photoswipeRE/photoswipe.min'],
  function (app, ko, router, httpService, mobi, co, ut, cellRonlyCpt, PhotoSwipeUI_Default, PhotoSwipe) {
    var self;
    return {
      model: {
        title: '我的申请',
        subTitle: '申请详情',
        vacationCategory: [],
        selectedCategory: ko.observable(''),
        noticeStr: ko.observable(''),//提示
        imgShowArr: ko.observableArray(),
        data: null,
        isCard: ko.observable(false),
        pendedProcessData: ko.observableArray(),//审批流
        refuseArr: ko.observableArray(),
        reasonInput: ko.observable(''),//退回原因
        galleryImgUrl: ko.observable(''),

        willRefuse: ko.observable(false),//是否可以有退回操作
        willCancel: ko.observable(false),//是否可以有撤销操作
      },
      activate: function (e) {
        self = this;

        self.init();
        if(e) e.data =globSingleData
        else  e = {"data": globSingleData}
        globSingleData = null;
        if (e && e.data) {

          var passData = JSON.parse(e.data);

          self.model.selectedCategory(passData.C3_533398158705);
          self.model.data(passData);

          self.model.data().C3_541451198969 = ko.observable(self.model.data().C3_541451198969)

          self.getPendingData();


          if (e.willCancel) {
            var tempWillCancel = JSON.parse(e.willCancel);
            self.model.willCancel(tempWillCancel)
          }

          if (e.willRefuse) {
            var tempWillRefuse = JSON.parse(e.willRefuse);
            self.model.willRefuse(tempWillRefuse)
          }

        }





      },
      init: function () {
        self.model.data = ko.observable({});
        self.model.isCard(false),

          self.model.willRefuse(false),//是否可以有退回操作
          self.model.willCancel(false),//是否可以有撤销操作

          //配置所有类型
          self.model.vacationCategory = ko.observable(appConfig.app.vacationCategory);
        self.model.selectedCategory(appConfig.app.vacationCategory[0]);


        ko.computed(self.kvoSelectCategory);


        // getRule
        //设置审批人
        self.model.approver = ko.observable(appConfig.app.teamApprove);

        self.model.refuseArr(appConfig.app.refuseArr)
      },
      attached: function () {

      },
      deactivate: function () {
        self = undefined;
      },

      imgClick: function (index) {
        // index = index();

        // var imgSrcArray = [self.model.data().C3_541450276993, self.model.data().C3_545771156108, self.model.data().C3_545771157350, self.model.data().C3_545771158420]
        // $gallery = $("#gallery"), $galleryImg = $("#galleryImg")
        // self.model.galleryImgUrl(imgSrcArray[index])
        // $gallery.fadeIn(100);

        //附件
        index = index();
        var tmpData = self.model.data();
        var imgUrlArr = [tmpData.C3_541450276993, tmpData.C3_545771156108, tmpData.C3_545771157350, tmpData.C3_545771158420];
        attachShow(imgUrlArr,PhotoSwipe,PhotoSwipeUI_Default);

      },
      galleryClick: function () {
        $gallery = $("#gallery");
        $gallery.fadeOut(100);
      },

      //监听选择出对应的注意事项
      kvoSelectCategory: function () {
        self.model.data().C3_533398158705 = self.model.selectedCategory();
        var currentCategory = self.model.data().C3_533398158705;

        if (currentCategory == '补打卡')
          self.model.isCard(true)
        else
          self.model.isCard(false)

        var tmpNoticeStr = common.getRule(currentCategory);
        self.model.noticeStr(tmpNoticeStr);

        var tmpVacationObj = common.getVactionObject(currentCategory);
        var tmpImgShowArr = common.getCarmeShow(tmpVacationObj);
        self.model.imgShowArr(tmpImgShowArr)



      },

      //获取审批流
      getPendingData: function () {
        httpService.getPendingPepleData(self.model.data().REC_ID, function (data) {
          if (data && data.data) {
            var tmpPendedProcessData = data.data;

            if (localDebug) {
              var a = [];
              for (var i = 0; i < 3; i++) {
                if(tmpPendedProcessData[0])  a.push(tmpPendedProcessData[0]);
              }
              tmpPendedProcessData = a;
            }
            self.model.pendedProcessData(tmpPendedProcessData)

          } else self.model.pendedProcessData([]);
        }, function () {
          cmAlert("获取审批流数据失败")
        });
      },

      // 撤销
      cancelClick: function () {
        var tmpData = until.transformFuncToVal(self.model.data());
        tmpData.C3_541449646638 = 'Y';
        httpService.cancelApply(tmpData, function (data) {
          if (data.error == 0) {
            cmAlert('撤销成功')
            router.navigateBack();
          } else {
            cmAlert(data.message)
          }
        }, function () {
          cmAlert('撤销失败');
        })
      }
      ,
      refuseClick: function (e) {//退回
        // C3_541449606438
        var tmpData = until.transformFuncToVal(self.model.data());
        if (tmpData.C3_541451198969 == '其他') {
          tmpData.C3_547719838514 = self.model.reasonInput();
        }
        tmpData.C3_541449606438 = 'Y';

        var param = {
          'data': tmpData
        }
        httpService.saveApply(param, function (resData) {
          if (resData.error == 0 && resData && resData.data && resData.data[0]) {
            cmAlert("退回成功");
            router.navigateBack();

          } else {
            cmAlert("退回错误");
          }

        }, function () {
          cmAlert("退回失败");
        });
      },
      reasonInputChange: function () {

      }




    };
  }); 