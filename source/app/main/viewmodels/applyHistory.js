define(['durandal/app',
    'knockout',
    'plugins/router',
    'httpService',
    'components/headerCpt',
    'components/cellMainCpt',
    'baseVM'], 
    function (app, ko, router,httpService,headerCpt,cellMainCpt,baseVM) {
         var selfVM = new baseVM();
            selfVM.model.subTitle = '历史记录'
            var self = selfVM;

            //获取数据
            selfVM.getData = function (type) {
                var keyStr = '';
                // if (self.data.selectDataIndex < self.data.selectDataArr.length) {
                  keyStr = self.model.selectedCategory();
                  keyStr = keyStr == '全部' ? '' : keyStr;
                // }

                var param = {
                    'subresid': '',
                    'cmswhere': '',
                    'key': keyStr
                }


                param.pageSize = 10;
                if (!type) {//刷新
                    param.pageIndex = 0;

                } else {//加载
                    param.pageIndex = self.model.pageIndex;
                }



                httpService.getApplyHistoryData(param, function (data) {

                    if (data && data.data) {
                        var dataArr = data.data;
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