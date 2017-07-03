define(['durandal/app',
    'knockout',
    'plugins/router',
    'httpService',
    'components/headerCpt', 'components/cellMainCpt',
    'until','photoswipe/photoswipe-ui-default.min', 'photoswipe/photoswipe.min'],
    function (app, ko, router, httpService, hCpt, cellCpt, ut, PhotoSwipeUI_Default, PhotoSwipe) {
        var self;
        return {
            model: {
                title: '我的申请',
                subTitle: '已审核',
                data: ko.observableArray(),
                vacationCategory: [],
                selectedCategory: '',
                pageIndex:null,
                noMore:null
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
            init:function(){
                self.model.noMore = false;
                self.model.pageIndex = 0;
                self.model.data([]);
            },
            deactivate: function () {
                self = undefined;
            },

            //获取数据
            getData: function (type) {
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



                httpService.getAppledData(param, function (data) {

                    if (data && data.data) {
                        var dataArr = data.data;
                        self.model.data(dataArr);

                        if (dataArr.length < param.pageSize) self.model.noMore =  true ;
                        else self.model.noMore =  false ;

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
            //附件
            showAttach: function (index) {
                index = index();
                var tmpData = self.model.data()[index];
                var imgUrlArr = [tmpData.C3_541450276993, tmpData.C3_545771156108, tmpData.C3_545771157350, tmpData.C3_545771158420];
                attachShow(imgUrlArr,PhotoSwipe,PhotoSwipeUI_Default);
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
            pageUp: function () {
                if (self.model.pageIndex <= 0) self.model.pageIndex = 0
                else self.model.pageIndex--;
                self.getData(1);
            },
            pageDown: function () {
                if (self.model.noMore) return;
                self.model.pageIndex++;
                self.getData(1);
            }
            };
        }); 