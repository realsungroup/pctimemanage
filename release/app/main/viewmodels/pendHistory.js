define(['durandal/app',
  'knockout',
  'plugins/router',
  'httpServiceRE',
  'components/headerCpt', 'components/cellMainCpt', 'baseVM'],
  function (app, ko, router, httpService, headerCpt, cellMainCpt, baseVM) {
    // return baseVM();
    var selfVM = new baseVM();
    selfVM.model.subTitle = '历史记录'

    selfVM.getData = function (type) {
      var self = selfVM;
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



      param.pageSize = 200;
      if (!type) {//刷新
        param.pageIndex = 0;

      } else {//加载
        param.pageIndex = self.model.pageIndex;
      }


      selfVM.model.isLoading = true;
      httpService.getPendedHistoryData(param, function (data) {
        console.log(data)
        if (data && data.data) {
          var dataArr = data.data;
          dataArr.forEach(function (val) {
            val.selected = true
          })
          self.model.data(dataArr);
          //设置页标（base中）
          self.setPageMark(param, data);

          if (dataArr.length < param.pageSize) self.model.noMore = true;
          else self.model.noMore = false;

        }
        selfVM.model.isLoading = false;
      }, function () {
        selfVM.model.isLoading = false;
      });
    }


    return selfVM;


  }); 