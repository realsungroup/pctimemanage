define(['durandal/app',
  'knockout',
  'plugins/router',
  'httpService',
  'components/headerCpt', 'components/cellMainCpt','baseVM'], function (app, ko, router,httpService,headerCpt,cellMainCpt,baseVM) {

    var selfVM = new baseVM();
    selfVM.model.subTitle = '已退回';


    selfVM.getData =  function (type) {
        var self = this;
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


        selfVM.model.isLoading = true;
        httpService.getPendedRefuseData(param, function (data) {

          if (data && data.data) {
            var dataArr = data.data;
            dataArr.forEach(function (val) {
              val.selected = true
            })
            self.model.data(dataArr);

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