define(['durandal/app',
    'knockout',
    'plugins/router',
    'httpService',
    'components/headerCpt'], function (app, ko, router) {
        var self;
        return {
            model: {
                title: '我的申请',
                subTitle:'申请中',
                data: ko.observableArray(),
                vacationCategory:[],
                selectedCategory:''
            },
            activate: function (e) {
                self = this;
                

                  //配置所有类型
                self.model.vacationCategory = ko.observable(appConfig.app.vacationCategory);
                self.model.selectedCategory = ko.observable(appConfig.app.vacationCategory[0])


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
                    // param.pageIndex = self.data.dataArr[self.data.pageIndex].length;
                    var indx = Math.ceil(self.data.dataArr[self.data.pageIndex].length / param.pageSize);
                    param.pageIndex = indx;
                }



                httpService.getApplyingData(param, function (data) {

                    if (data && data.data) {
                        var dataArr = data.data;
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
            goToAddApplying:function(){
                router.navigate("#addApply");
            },

            //类型筛选
            categoryFilterClick:function(index){
                self.model.selectedCategory(self.model.vacationCategory()[index()]);
                self.getData(0);
            }
        };
    }); 