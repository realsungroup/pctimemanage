﻿define(['durandal/app',
    'knockout',
    'plugins/router',
    'httpServiceRE',
    'components/headerCpt', 'components/cellMainCpt',
    'untilRE','photoswipeRE/photoswipe-ui-default.min', 'photoswipeRE/photoswipe.min','baseVM'],
    function (app, ko, router, httpService, hCpt, cellCpt, ut, PhotoSwipeUI_Default, PhotoSwipe,baseVM) {
         var selfVM = new baseVM();
            selfVM.model.subTitle = '已审核'
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


                selfVM.model.isLoading = true;
                httpService.getAppledData(param, function (data) {

                    if (data && data.data) {
                        var dataArr = data.data;
                        self.model.data(dataArr);

                         //设置页标（base中）
                        self.setPageMark(param,data);

                        if (dataArr.length < param.pageSize) self.model.noMore =  true ;
                        else self.model.noMore =  false ;

                    } else {
                        // self.setData({ data: [] });
                        // self.setData({ noMore: true });
                    }
                    selfVM.model.isLoading = false;
                }, function () {
                    selfVM.model.isLoading = false;
                });
            }

            return selfVM;
        }); 