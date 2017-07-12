define(['durandal/app',
  'knockout',
  'plugins/router',
  'httpService',
  'components/headerCpt', 'components/cellMainCpt','baseVM'],
   function (app, ko, router,httpService,headerCpt,cellMainCpt,baseVM) {
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



        param.pageSize = 10;
        if (!type) {//刷新
          param.pageIndex = 0;

        } else {//加载
          param.pageIndex = self.model.pageIndex;
        }



        httpService.getPendedHistoryData(param, function (data) {

          if (data && data.data) {
            var dataArr = data.data;
            dataArr.forEach(function (val) {
              val.selected = true
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
    }


    return selfVM;

   
  }); 