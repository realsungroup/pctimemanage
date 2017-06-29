define(['durandal/app',
  'knockout',
  'plugins/router',
  'httpService', 'mobiscroll', 'main/viewmodels/applying', 'common', 'until'], function (app, ko, router, http, mobi, applying, co) {
    var self;
    return {
      model: {
        title: '我的申请',
        subTitle: '添加申请',
        vacationCategory: [],
        selectedCategory: ko.observable(''),
        noticeStr: ko.observable(''),//提示
        imgShowArr: ko.observableArray(),
        data: null,
        isDraft: false,//是否草稿
        isCard:ko.observable(false)
      },
      activate: function (e) {
        self = this;
        console.log('aaaaaaaaa' + applying.model.data());

        self.init();

        if (e && e.index) {
          var idx = parseInt(e.index);
          self.model.isDraft = true;
          var passData = applying.model.data()[idx];
          
          self.model.selectedCategory(passData.C3_533398158705);
          self.model.data(passData);
        }





      },
      init: function () {
        self.model.data = ko.observable({});

        //配置所有类型
        self.model.vacationCategory = ko.observable(appConfig.app.vacationCategory);
        self.model.selectedCategory(appConfig.app.vacationCategory[0]);
        self.model.selectedCategory('病假');
        // self.model.data( self.model.data());

        ko.computed(self.kvoSelectCategory);


        // getRule
        //设置审批人
        self.model.approver = ko.observable(appConfig.app.teamApprove);
      },
      attached: function () {
        var currYear = (new Date()).getFullYear();
        var optStart = {}, optEnd = {};
        optStart.default = {
          theme: 'bootstrap', //皮肤样式
          display: 'bubble', //显示方式
          mode: 'scroller', //日期选择模式
          dateFormat: 'yy-mm-dd',
          timeFormat: 'HH:ii',
          preset: 'datetime',
          lang: 'zh',
          // showNow: true,
          steps: {
            zeroBased: true
          },
          nowText: "今天",
          onSet: function (event, inst) {//开始时间确定回调
            var a = event.valueText.toString().replace(/-/g, "/");
            now = new Date(a);
            optEnd.default.min = now;
            $($(".appDate")[1]).mobiscroll($.extend(optEnd['date'], optEnd['default']));

            // var tempFormData = work.editform.formdata();
            // tempFormData['C3_533143217561'] = '';
            // tempFormData['C3_541449935726'] = '';
            // work.editform.formdata(tempFormData);
          }
        };


        //设置结束时间



        optEnd.default = {
          theme: 'bootstrap', //皮肤样式
          display: 'bubble', //显示方式
          mode: 'cl', //日期选择模式
          dateFormat: 'yy-mm-dd',
          timeFormat: 'HH:ii',
          preset: 'datetime',
          lang: 'zh',
          // showNow: true,
          steps: {
            zeroBased: false
          },
          nowText: "今天",
          // min: defaultNow,
          onSet: function (event, inst) {//结束时间确定回调
            var tempFormData = self.model.data();
            tempFormData['C3_541449935726'] = '';
            self.model.data(tempFormData);
          }
        };

        var defaultNow = '';

        if (self.model.data().C3_533143179815) {
          var a = self.model.data().C3_533143179815.replace(/-/g, "/");
          defaultNow = new Date(a);//开始时间
        } else {
          var defaultNowStr = (new Date()).format('yyyy-MM-dd hh:mm').replace(/-/g, "/");//开始时间
          defaultNow = new Date(defaultNowStr);
        }





        if (!self.model.isCard()) optEnd.default.min = defaultNow;


        var itemTitle = self.model.data().C3_533398158705;//获取当前类型
        var hor = 1, mte = 30;
        if (itemTitle == '事假' ||
          itemTitle == '病假' ||
          itemTitle == '调休' ||
          itemTitle == '公出' ||
          itemTitle == '加班' ||
          itemTitle == '国定加班') {
          mte = 30;
        } else if (itemTitle == '年假' ||
          itemTitle == '产前检查假') {
          hor = 4;
        } else if (itemTitle == '哺乳假') {
        } else if (itemTitle == '丧假' ||
          itemTitle == '路程假') {
          hor = 8;
        }
        optStart.default.steps['minute'] = mte;
        optEnd.default.steps['minute'] = mte;
        optEnd.default.steps['hour'] = hor;

        $($(".appDate")[0]).mobiscroll($.extend(optStart['date'], optStart['default']));
        $($(".appDate")[1]).mobiscroll($.extend(optEnd['date'], optEnd['default']));



        // $('.start-time-select').mobiscroll().select({
        //   theme: 'ios',      // Specify theme like: theme: 'ios' or omit setting to use default
        //   lang: 'zh',   // Specify language like: lang: 'pl' or omit setting to use default
        //   display: 'center',  // Specify display mode like: display: 'bottom' or omit setting to use default
        //   mode: 'scroller',        // More info about mode: https://docs.mobiscroll.com/3-0-0_beta2/select#!opt-mode
        //   minWidth: 100,                  // More info about minWidth: https://docs.mobiscroll.com/3-0-0_beta2/select#!opt-minWidth
        //   onSet: function (event, inst) {
        //     var tempFormData = work.editform.formdata();
        //     tempFormData['C3_533143179815'] = '';
        //     tempFormData['C3_533143217561'] = '';
        //     tempFormData['C3_541449935726'] = '';
        //     tempFormData['C3_541450276993'] = '';
        //     tempFormData['C3_545771156108'] = '';
        //     tempFormData['C3_545771157350'] = '';
        //     tempFormData['C3_545771158420'] = '';
        //     work.editform.formdata(tempFormData);
        //   }
        // });

        

      },
      deactivate: function () {
        self = undefined;
      },
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
      },

      imgClick:function(index){
        index = index();

        $gallery = $("#gallery"), $galleryImg = $("#galleryImg"),
        // $galleryImg.attr("style", this.getAttribute("style"));
            $gallery.fadeIn(100);
      },
      galleryClick:function(){
        $gallery = $("#gallery");
         $gallery.fadeOut(100);
      },

      //监听选择出对应的注意事项
      kvoSelectCategory: function () {
        self.model.data().C3_533398158705 = self.model.selectedCategory();
        var currentCategory = self.model.data().C3_533398158705;

        if(currentCategory == '补打卡') 
        self.model.isCard(true)
        else
        self.model.isCard(false)

        var tmpNoticeStr = common.getRule(currentCategory);
        self.model.noticeStr(tmpNoticeStr);

        var tmpVacationObj = common.getVactionObject(currentCategory);
        var tmpImgShowArr = common.getCarmeShow(tmpVacationObj);
        self.model.imgShowArr(tmpImgShowArr)


      
      },


      //计算时长
      hourCalculate: function () {
        var data1 = {
          "C3_546130034510": self.model.data().C3_533143179815,
          "C3_546130034799": self.model.data().C3_533143217561,
          "C3_546130035036": self.model.data().C3_533398158705,
          "C3_546181010461": appConfig.app.userInfo.data.Dep1Code
        }

        var param = {
          'resid': 546129993686,
          'data': data1
        }

        var data2 = {
          "C3_545822726730": self.model.data().C3_533143179815,
          "C3_545822726977": self.model.data().C3_533143217561,
          "C3_545822727444": self.model.data().C3_533398158705

        }

        var param2 = {
          'resid': 545822693342,
          'data': data2
        }

        httpService.hourCalculate(param, function (data) {
          if (data && data.data && data.data[0]) {
            param2.data.C3_546180817741 = data.data[0].C3_546130076462;
            httpService.hourCalculate(param2, function (data) {

              self.model.data().C3_541449935726 = data.data[0].C3_545928354975;
              self.model.data(self.model.data());

            }, function () {
            });

          } else self.setData({ data: [] });

        }, function () {

        });

      },

      // 提交
      saveOrsubmitClick: function (action) {
        var tmpData = self.model.data();
        for (var key in tmpData) {
          if (typeof tmpData[key] == 'function') {
            tmpData[key] = tmpData[key]();
          }
        }
        console.log(tmpData);
        if (action == 'save') tmpData.C3_541449538456 = "N"
          else tmpData.C3_541449538456 = "Y"
        var param = {
            'data': tmpData
          }

        if (self.model.isDraft) {
          httpService.saveApply(param, function (resData) {
            if (resData.error == 0 && resData && resData.data && resData.data[0]) {
              cmAlert("success");
              var returnData = resData.data[0];
              applying.model.data().unshift(returnData);
              applying.model.data(applying.model.data());
              router.navigateBack();

            }else{
              cmAlert("error");
            }

          },function(){
            cmAlert("fail");
          });

        } else {
          

          
          httpService.addApply(param, function (resData) {
            if (resData.error == 0 && resData && resData.data && resData.data[0]) {
              cmAlert("success");
              var returnData = resData.data[0];
              applying.model.data().unshift(returnData);
              applying.model.data(applying.model.data());
              router.navigateBack();

            }else{
              cmAlert("error");
            }

          },function(){
            cmAlert("fail");
          });
        }
      }
    };
  }); 