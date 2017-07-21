define(['durandal/app',
  'knockout',
  'plugins/router',
  'httpServiceRE',
   'mobiscroll', 
   'commonRE',
    'untilRE',
    'components/cellReadonlyCpt','components/cellEditCpt',
    'photoswipeRE/photoswipe-ui-default.min', 'photoswipeRE/photoswipe.min'],
     function (app, ko, router, httpService, mobi, co,ut,cellReadonly,cellEdit,PhotoSwipeUI_Default, PhotoSwipe) {
    var self;
    return {
      model: {
        title: '我的申请',
        subTitle: '修改并提交',
        vacationCategory: [],
        selectedCategory: ko.observable(''),
        noticeStr: ko.observable(''),//提示
        imgShowArr: ko.observableArray(),
        data: null,
        isCard: ko.observable(false),
        pendedProcessData: ko.observableArray(),//审批流
        refuseArr:ko.observableArray(),
        galleryImgUrl:ko.observable('')
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

          self.getPendingData();
        }
         self.model.data().C3_533143291117 = ko.observable(self.model.data().C3_533143291117);




      },
      init: function () {
        self.model.data = ko.observable({});

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
                a.push(tmpPendedProcessData[0]);
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
      selectImgChange: function(index,data,event){
        index = index();
        var src, url = window.URL || window.webkitURL || window.mozURL, files = event.target.files;
            for (var i = 0, len = files.length; i < len; ++i) {
                var file = files[i];

                // if (url) {
                //     src = url.createObjectURL(file);
                // } else {
                //     src = e.target.result;
                // }

                // $uploaderFiles.append($(tmpl.replace('#url#', src)));
        
                console.log(src);
                httpService.uploadImg(file,function(imgUrl){
                  if (index == 0) {
                            self.model.data().C3_541450276993 = imgUrl;
                        } else if (index == 1) {
                            self.model.data().C3_545771156108 = imgUrl;
                        } else if (index == 2) {
                            self.model.data().C3_545771157350 = imgUrl;
                        } else {
                            self.model.data().C3_545771158420 = imageurl;
                        }
                        self.model.data(self.model.data());
                })
            }
      },// 提交
      saveOrsubmitClick: function (action) {
        var tmpData = until.transformFuncToVal(self.model.data());

        console.log(tmpData);
        // if (action == 'save') tmpData.C3_541449538456 = "N"
        // else tmpData.C3_541449538456 = "Y"

         if (action == 'save') tmpData.C3_541449606438 = 'Y';
        else tmpData.C3_541449606438 = 'N';


        var param = {
          'data': tmpData
        }
          httpService.saveApply(param, function (resData) {
            if (resData.error == 0 && resData && resData.data && resData.data[0]) {
              cmAlert("保存成功");
              var returnData = resData.data[0];
              // applying.model.data().unshift(returnData);
              // applying.model.data(applying.model.data());
              router.navigateBack();

            } else {
              cmAlert("保存错误");
            }

          }, function () {
            cmAlert("保存失败");
          });

      },




    };
  }); 