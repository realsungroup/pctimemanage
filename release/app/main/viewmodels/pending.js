define(['durandal/app',
  'knockout',
  'plugins/router',
  'httpService',
  'components/headerCpt',
  'components/cellMainCpt',
  'until'], function (app, ko, router,httpService) {
    var self;
    return {
      model: {
        title: '我的审批',
        subTitle: '审批中',
        data: ko.observableArray(),
        vacationCategory: [],
        selectedCategory: '',
        inputVal: ko.observable(''),
        allSelected: ko.observable(false),
        pageIndex: 0,
        noMore: false
      },
      activate: function (e) {
        self = this;
        self.init();

        //配置所有类型
        var allVacationCategory = ['全部'];
        allVacationCategory = allVacationCategory.concat(appConfig.app.vacationCategory)
        self.model.vacationCategory = ko.observable(allVacationCategory);
        self.model.selectedCategory = ko.observable(allVacationCategory[0])


        self.getData(0);
      },
      attached: function () {

      },
      deactivate: function () {
        self = undefined;
      },
      init: function () {
        self.model.noMore = false;
        self.model.pageIndex = 0;
        self.model.data([]);
      },
      //获取数据
      getData: function (type) {
        var keyStr = '';
        keyStr = self.model.selectedCategory();
        keyStr = keyStr == '全部' ? '' : "C3_533398158705 ='" + keyStr + "'"

        var param = {
          'subresid': '',
          'cmswhere': keyStr,
          'key': self.model.inputVal() ? self.model.inputVal() : ''
        }

        param.pageSize = 10;
        if (!type) {//刷新
          param.pageIndex = 0;

        } else {//加载
          param.pageIndex = self.model.pageIndex;
        }



        httpService.getPendingData(param, function (data) {

          if (data && data.data) {
            var dataArr = data.data;
            dataArr.forEach(function (val) {
              val.selected = false
            })
            self.model.data(dataArr);

            if (dataArr.length < param.pageSize) self.model.noMore = true;
            else self.model.noMore = false;

          } else {
            // self.setData({ data: [] });
            // self.setData({ noMore: true });
          }
        }, function () {

        });
      },

      //类型筛选
      categoryFilterClick: function (index) {
        self.model.selectedCategory(self.model.vacationCategory()[index()]);
        self.getData(0);
      },
      goToApplyDetailPage: function (index) {
        var tmpData = self.model.data()[index()];
        var tmpJsonData = JSON.stringify(tmpData);
        router.navigate("#applyDetail?data=" + tmpJsonData + '&willRefuse=true');
      },
      kvoInput: function () {
        self.getData(0);
      },

      //全选
      selectAllChange: function (e) {
        var tmpDataArr = self.model.data();
        for (var i = 0; i < tmpDataArr.length; i++) {
          if (self.model.allSelected()) tmpDataArr[i].selected = true;
          else tmpDataArr[i].selected = false;
        }
        self.model.data([])
        self.model.data(tmpDataArr)
      },

      //审批
      approve: function () {
        // for(var i = 0 ; i < self.data.selectMap.le)
        var submitArr = [];
        self.model.data().forEach(function (item) {
          if (item.selected) {
            var i = {
              REC_ID: item.REC_ID,
              _id: 1,
              _state: "modified",
              C3_541454801460: 'Y'
            };

            submitArr.push(i);
          }
        })
        if (!submitArr.length) {
          cmAlert("请勾选至少一个事件");
          return;
        }


        // common.customLoading();
        httpService.approveDataArr(submitArr, function (data) {
          cmAlert('审批成功');
          self.getData(1);
        }, function () {
          cmAlert('审批失败');
        });

      },
      pageUp: function () {
        if (self.model.pageIndex <= 0) self.model.pageIndex = 0
        else self.model.pageIndex--;
        self.getData(1);
      },
      pageDown: function () {
        if (self.model.noMore) return;
        self.model.pageIndex++;
        self.getData(1);
      },
      showAttach: function (index) {
        index = index();
        var tmpData = self.model.data()[index];

        var imgUrlArr = [tmpData.C3_541450276993, tmpData.C3_545771156108, tmpData.C3_545771157350, tmpData.C3_545771158420];
        attachShow(imgUrlArr, PhotoSwipe, PhotoSwipeUI_Default);
      }
    };
  }); 