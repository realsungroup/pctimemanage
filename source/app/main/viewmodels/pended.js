define(['durandal/app',
  'knockout',
  'plugins/router',
  'httpServiceRE',
  'components/headerCpt', 'components/cellMainCpt',
  'photoswipeRE/photoswipe-ui-default.min', 'photoswipeRE/photoswipe.min', 'baseVM'],
  function (app, ko, router, httpService, hCpt, cellMainCpt, PhotoSwipeUI_Default, PhotoSwipe, baseVM) {

    var selfVM = new baseVM();

    selfVM.getData = function (type) {
      var self = selfVM;
      
      var keyStr = '';
      keyStr = self.model.selectedCategory();
      keyStr = keyStr == '全部' ? '' : "C3_533398158705 ='" + keyStr + "'"

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
      httpService.getPendedData(param, function (data) {

        if (data && data.data) {
          var dataArr = data.data;
          dataArr.forEach(function (val) {
            val.selected = true
          })
          self.model.data(dataArr);
          //设置页标（base中）
          self.setPageMark(param,data);

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