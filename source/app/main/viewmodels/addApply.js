define(['durandal/app',
  'knockout',
  'plugins/router',
  'httpService', 'mobiscroll', 'main/viewmodels/applying','common'], function (app, ko, router, http, mobi, applying,co) {
    var self;
    return {
      model: {
        title: '我的申请',
        subTitle: '添加申请',
        vacationCategory: [],
        selectedCategory: '',
        noticeStr:ko.observable(''),
        imgShowArr:ko.observableArray(),
        data:ko.observable()
      },
      activate: function (e) {
        self = this;
        console.log('aaaaaaaaa' + applying.model.data());
        // if()

        

        //配置所有类型
        self.model.vacationCategory = ko.observable(appConfig.app.vacationCategory);
        self.model.selectedCategory = ko.observable(appConfig.app.vacationCategory[0]);
          
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
          mode: 'clickpick', //日期选择模式
          dateFormat: 'yy-mm-dd',
          timeFormat: 'HH:ii',
          preset: 'datetime',
          lang: 'zh',
          // showNow: true,
          steps: {
            minute: 30,
            second: 5,
            zeroBased: true
          },
          nowText: "今天",
          onSet: function (event, inst) {//开始时间确定回调
            // var a = event.valueText.toString().replace(/-/g, "/");
            // now = new Date(a);
            // optEnd.default.min = now;
            // $($(".appDate")[1]).mobiscroll($.extend(optEnd['date'], optEnd['default']));

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
          mode: 'clickpick', //日期选择模式
          dateFormat: 'yy-mm-dd',
          timeFormat: 'HH:ii',
          preset: 'datetime',
          lang: 'zh',
          // showNow: true,
          steps: {
            minute: 1,
            second: 5,
            hour: 1,
            zeroBased: false
          },
          nowText: "今天",
          // min: defaultNow,
          onSet: function (event, inst) {//结束时间确定回调
            //  var tempFormData = work.editform.formdata();
            // tempFormData['C3_541449935726'] = '';
            // work.editform.formdata(tempFormData);
          }
        };

        var defaultNow = '';
        // if ('editform' in work) {
        //     if (work.editform.formdata().C3_533143179815 != '') {
        //         var a = work.editform.formdata().C3_533143179815.replace(/-/g, "/");
        //         defaultNow = new Date(a);//开始时间
        //     } else {
        //         var defaultNowStr = (new Date()).format('yyyy-MM-dd hh:mm').replace(/-/g, "/");//开始时间
        //         defaultNow = new Date(defaultNowStr);
        //     }

        // }




        // if(work.selectedAppItem() != '补打卡') optEnd.default.min = defaultNow;


        var itemTitle = '事假';//获取当前类型
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
        // optStart.default.steps['minute'] = mte;
        optEnd.default.steps['minute'] = mte;
        optEnd.default.steps['hour'] = hor;

        $($(".appDate")[1]).mobiscroll($.extend(optEnd['date'], optEnd['default']));
        $($(".appDate")[0]).mobiscroll($.extend(optStart['date'], optStart['default']));


        $('.start-time-select').mobiscroll().select({
          theme: 'ios',      // Specify theme like: theme: 'ios' or omit setting to use default
          lang: 'zh',   // Specify language like: lang: 'pl' or omit setting to use default
          display: 'center',  // Specify display mode like: display: 'bottom' or omit setting to use default
          mode: 'scroller',        // More info about mode: https://docs.mobiscroll.com/3-0-0_beta2/select#!opt-mode
          minWidth: 100,                  // More info about minWidth: https://docs.mobiscroll.com/3-0-0_beta2/select#!opt-minWidth
          onSet: function (event, inst) {
            var tempFormData = work.editform.formdata();
            tempFormData['C3_533143179815'] = '';
            tempFormData['C3_533143217561'] = '';
            tempFormData['C3_541449935726'] = '';
            tempFormData['C3_541450276993'] = '';
            tempFormData['C3_545771156108'] = '';
            tempFormData['C3_545771157350'] = '';
            tempFormData['C3_545771158420'] = '';
            work.editform.formdata(tempFormData);
          }
        });

      },
      deactivate: function () {
        self = undefined;
      },

      //监听选择出对应的注意事项
      kvoSelectCategory:function(){
        var currentCategory = self.model.selectedCategory();

        var tmpNoticeStr = common.getRule(currentCategory);
         self.model.noticeStr(tmpNoticeStr);

         var tmpVacationObj = common.getVactionObject(currentCategory);
        var tmpImgShowArr = common.getCarmeShow(tmpVacationObj);
         self.model.imgShowArr(tmpImgShowArr)

      }
    };
  }); 