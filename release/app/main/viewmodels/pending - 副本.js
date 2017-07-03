define(['durandal/app',
  'knockout',
  'plugins/router',
  'httpService',
  'components/headerCpt', 'components/cellMainCpt'], function (app, ko, router) {
    var self;
    return {
      model: {
        title: '我的审批',
        subTitle: '审批中',
        data: ko.observableArray(),
        vacationCategory: [],
        selectedCategory: '',
        inputVal: ko.observable(''),
        allSelected: ko.observable(false)
      },
      activate: function (e) {
        self = this;


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

      //获取数据
      getData: function (type) {
        var keyStr = '';
        // if (self.data.selectDataIndex < self.data.selectDataArr.length) {
        keyStr = self.model.selectedCategory();
        keyStr = keyStr == '全部' ? '' : "C3_533398158705 ='" + keyStr + "'"
        // }

        var param = {
          'subresid': '',
          'cmswhere': keyStr,
          'key': self.model.inputVal() ? self.model.inputVal() : ''
        }



        param.pageSize = 10;
        if (!type) {//刷新
          param.pageIndex = 0;

        } else {//加载
          // param.pageIndex = self.data.dataArr[self.data.pageIndex].length;
          var indx = Math.ceil(self.data.dataArr[self.data.pageIndex].length / param.pageSize);
          param.pageIndex = indx;
        }



        httpService.getPendingData(param, function (data) {

          if (data && data.data) {
            var dataArr = data.data;
            dataArr.forEach(function (val) {
              val.selected = true
            })
            self.model.data(dataArr);

            // if (dataArr.length < param.pageSize) self.setData({ noMore: true });
            // else self.setData({ noMore: false });

            // if (type == 1) {//加载
            //   var oldDataArr = self.data.dataArr[self.data.pageIndex];
            //   oldDataArr = oldDataArr.concat(dataArr);
            //   dataArr = oldDataArr;
            // }

          } else {
            // self.setData({ data: [] });
            // self.setData({ noMore: true });
          }
        }, function () {

        });
      },
      goToAddApplying: function () {
        router.navigate("#addApply");
      },

      //类型筛选
      categoryFilterClick: function (index) {
        self.model.selectedCategory(self.model.vacationCategory()[index()]);
        self.getData(0);
      },
      goToEditPage: function (index) {

        router.navigate("#addApply?index=" + index());
      },
      goToApplyDetailPage: function (index) {
        var tmpData = self.model.data()[index()];
        var tmpJsonData = JSON.stringify(tmpData);
        router.navigate("#applyDetail?data=" + tmpJsonData);
      },
      kvoInput: function () {
        // ko.computed(function(){
        self.getData(0);
        //   return self.model.inputVal()
        // })
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
      // let pendDataArr = self.data.dataArr[self.data.pageIndex];
      // pendDataArr = pendDataArr.filter(x => x.selected != true);
      // self.setData({
      //   data: pendDataArr
      // })

      // var pendedDataArr = self.data.dataArr[1];
      // pendedDataArr = data.data.data.concat(pendedDataArr);

      cmAlert('审批成功');
    }, function () {
      cmAlert('审批失败');
    });

  },

    checkboxChange: function (index) {
        // index = index();
        // var tmpM = self.model.data()[index];
        // if(!tmpM.selected) {
        //   self.model.allSelected(false)
        //   var tmpDataArr = self.model.data();
        //    self.model.data([])
        //    self.model.data(tmpDataArr)
        // }

    }
    };
  }); 