define(['durandal/app',
  'knockout',
  'plugins/router',
  'httpServiceRE', 'mobiscroll',
  'main/viewmodels/applying', 'commonRE', 'untilRE',
  'components/cellReadonlyCpt',
  'components/cellEditCpt',
  'photoswipeRE/photoswipe-ui-default.min', 'photoswipeRE/photoswipe.min'],
  function (app, ko, router, httpService, mobi, applying, co, ut, cellReadCpt, cellEdit, PhotoSwipeUI_Default, PhotoSwipe) {
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
        isCard: ko.observable(false),
        galleryImgUrl: ko.observable(''),
        attachUrlArray: ko.observableArray()
      },
      activate: function (e) {
        self = this;
        console.log('aaaaaaaaa' + applying.model.data());

        self.init();
        if (e) e.data = globSingleData
        else e = { "data": globSingleData }
        globSingleData = null;
        if (e && e.data) {
          // var idx = parseInt(e.d);
          self.model.isDraft = true;
          var passData = JSON.parse(e.data);

          self.model.selectedCategory(passData.C3_533398158705);
          self.kvoSelectCategory('draft')
          self.model.data(passData);
        }else self.model.isDraft = false;
        self.bindProperty();
      },
      init: function () {
        self.model.data = ko.observable({});

        //配置所有类型
        self.model.vacationCategory = ko.observable(appConfig.app.vacationCategory);
        self.model.selectedCategory(appConfig.app.vacationCategory[0]);
        if (localDebug) self.model.selectedCategory('病假');
        self.kvoSelectCategory();

        // getRule
        //设置审批人
        self.model.approver = ko.observable(appConfig.app.teamApprove);
      },
      attached: function () {
        self.setTimeControl();
      },
      deactivate: function () {
        self = undefined;
      },
      selectImgChange: function (index, data, event) {
        index = index();
        var src, url = window.URL || window.webkitURL || window.mozURL, files = event.target.files;
        for (var i = 0, len = files.length; i < len; ++i) {
          var file = files[i];


          // $uploaderFiles.append($(tmpl.replace('#url#', src)));

          console.log(src);
          httpService.uploadImg(file, function (imgUrl) {
            if (index == 0) {
              self.model.data().C3_541450276993 = imgUrl;
            } else if (index == 1) {
              self.model.data().C3_545771156108 = imgUrl;
            } else if (index == 2) {
              self.model.data().C3_545771157350 = imgUrl;
            } else {
              self.model.data().C3_545771158420 = imgUrl;
            }

            // self.model.data(self.model.data());
            var tmpImgUrlArray = [self.model.data().C3_541450276993,
            self.model.data().C3_545771156108,
            self.model.data().C3_545771157350,
            self.model.data().C3_545771158420]

            self.model.attachUrlArray(tmpImgUrlArray)
          })
        }
      },

      imgClick: function (index) {

        //附件
        index = index();
        var tmpData = self.model.data();
        var imgUrlArr = [tmpData.C3_541450276993, tmpData.C3_545771156108, tmpData.C3_545771157350, tmpData.C3_545771158420];
        attachShow(imgUrlArr, PhotoSwipe, PhotoSwipeUI_Default);

      },
      galleryClick: function () {
        $gallery = $("#gallery");
        $gallery.fadeOut(100);
      },

      //监听选择出对应的注意事项(切换类型需要清除数据，而草稿数据第一次不能清除数据)
      kvoSelectCategory: function (str) {
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

        self.setTimeControl();
        if (str != 'draft') self.resetData();
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
          if (data && (data.error == 0 || data.Error == 0) && data.data && data.data[0]) {
            param2.data.C3_546180817741 = data.data[0].C3_546130076462;
            httpService.hourCalculate(param2, function (data) {

              if(data && (data.error == 0 || data.Error == 0) && Array.isArray(data.data) && data.data[0]){
                self.model.data().C3_541449935726 = data.data[0].C3_545928354975;
                self.model.data(self.model.data());
              }else cmAlert(data.message || '获取时长失败')

            }, function () {
            });

          } else {
            cmAlert(data.message || '获取时长失败')
          }

        }, function () {

        });

      },

      // 提交
      saveOrsubmitClick: function (action) {
        var tmpData = until.transformFuncToVal(self.model.data());

        console.log(tmpData);
        if (action == 'save') tmpData.C3_541449538456 = "N"
        else {
          tmpData.C3_541449538456 = "Y";
          var validateData = common.valiateForm(tmpData);
          if (!validateData) return;
        }

        var param = {
          'data': tmpData
        }

        if (self.model.isDraft) {
          httpService.saveApply(param, function (resData) {
            if ((resData.error == 0 || resData.Error == 0) && resData && resData.data && resData.data[0]) {
              cmAlert("保存成功");
              // var returnData = resData.data[0];
              // applying.model.data().unshift(returnData);
              // applying.model.data(applying.model.data());
              router.navigateBack();

            } else {
              cmAlert(resData.message || "保存错误");
            }

          }, function () {
            // cmAlert("保存失败");
          });

        } else {


          param['data']['C3_542556605600'] = self.model.approver();
          httpService.addApply(param, function (resData) {
            if ((resData.error == 0 || resData.Error == 0) && resData && resData.data && resData.data[0]) {
              cmAlert("添加成功");
              // var returnData = resData.data[0];
              // applying.model.data().unshift(returnData);
              // applying.model.data(applying.model.data());
              router.navigateBack();

            } else {
              cmAlert(resData.message || "添加错误");
            }

          }, function () {
            // cmAlert("添加失败");
          });
        }
      },


      setTimeControl: function () {
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

            var tempFormData = self.model.data();
            tempFormData['C3_533143217561'] = '';
            tempFormData['C3_541449935726'] = '';
            self.model.data(tempFormData);
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
      },

      resetData: function () {
        var tempFormData = self.model.data();
        tempFormData['C3_533143179815'] = '';
        tempFormData['C3_533143217561'] = '';
        tempFormData['C3_541449935726'] = '';
        tempFormData['C3_541450276993'] = '';
        tempFormData['C3_545771156108'] = '';
        tempFormData['C3_545771157350'] = '';
        tempFormData['C3_545771158420'] = '';

        self.model.data(tempFormData)

        var tmpImgUrlArray = [self.model.data().C3_541450276993,
        self.model.data().C3_545771156108,
        self.model.data().C3_545771157350,
        self.model.data().C3_545771158420]

        self.model.attachUrlArray(tmpImgUrlArray)
      },

  


      bindProperty: function () {
        self.model.data().C3_533143291117 = ko.observable(self.model.data().C3_533143291117);

        var tmpImgUrlArray = [self.model.data().C3_541450276993,
        self.model.data().C3_545771156108,
        self.model.data().C3_545771157350,
        self.model.data().C3_545771158420]

        self.model.attachUrlArray(tmpImgUrlArray)
      }
    };
  }); 