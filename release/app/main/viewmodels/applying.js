define(['durandal/app',
    'knockout',
    'plugins/router',
    'httpServiceRE',
    'components/headerCpt',
    'components/cellMainCpt',
    'untilRE',
    'photoswipeRE/photoswipe-ui-default.min',
    'photoswipeRE/photoswipe.min',
    'baseVM',"durandal/viewEngine"],
    function (app, ko, router, httpService, hCpt, cellCpt, ut, PhotoSwipeUI_Default, PhotoSwipe, baseVM,viewEngine) {
        var selfVM = new baseVM();
        selfVM.model.subTitle = '申请中'
        var self = selfVM;

        //获取数据
        selfVM.getData = function (type) {
            selfVM.model.isLoading = true;
            var keyStr = '';
            keyStr = self.model.selectedCategory();
            keyStr = keyStr == '全部' ? '' : keyStr;

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



            httpService.getApplyingData(param, function (data) {

                if (data && data.data) {
                    var dataArr = data.data;
                    self.model.data(dataArr);

                     //设置页标（base中）
                    self.setPageMark(param,data);

                    if (dataArr.length < param.pageSize) self.model.noMore = true;
                    else self.model.noMore = false;


                } else {
                    // self.setData({ data: [] });
                    // self.setData({ noMore: true });
                }
                selfVM.model.isLoading = false;
            }, function () {
                selfVM.model.isLoading = false;
            });
        }
        selfVM.goToAddApplying = function () {
            router.navigate("#addApply");
        }

        selfVM.goToEditPage = function (index) {
            index = index();
            var tmpData = self.model.data()[index];
            // router.navigate("#addApply?data=" + JSON.stringify(tmpData));

            globSingleData = JSON.stringify(tmpData);
            router.navigate("#addApply");
        }

        selfVM.goToApplyDetailPage = function (index) {
                var tmpData = self.model.data()[index()];
                // var tmpJsonData = JSON.stringify(tmpData);
                // router.navigate("#applyDetail?data=" + tmpJsonData + '&willCancel=true');

                globSingleData = JSON.stringify(tmpData);
                router.navigate("#applyDetail?willCancel=true");
            }

        //提交
        selfVM.submit = function (index) {
            index = index()
            var tmpData = self.model.data()[index];
            tmpData.C3_541449538456 = "Y"

            var param = {
                'data': tmpData
            }

            httpService.saveApply(param, function (resData) {
                if (resData.error == 0 && resData && resData.data && resData.data[0]) {
                    cmAlert("");
                    var returnData = resData.data[0];
                    self.model.data()[index] = returnData;
                    self.model.data(self.model.data());
                } else {
                    cmAlert("error");
                }

            }, function () {

            });
        }
        return selfVM
    }); 