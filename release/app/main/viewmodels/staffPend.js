define(['durandal/app', 'knockout', 'plugins/router', 'components/headerCpt', 'httpServiceRE', 'baseVM', 'components/cellMainCpt', 'main/viewmodels/staffPendEdit'],
    function (app, ko, router, headerCpt, httpService, baseVM, cellMainCpt, staffPendEdit) {

        var selfVM = new baseVM();
        selfVM.model.title = '员工审批'
        selfVM.model.subTitle = '员工审批定义'

        selfVM.getData = function (type) {
            var self = selfVM;
            var param = {
                'subresid': '',
                'cmswhere': "",
                'key': self.model.inputVal() ? self.model.inputVal() : ''
            }

            param.pageSize = 10;
            if (!type) {//刷新
                param.pageIndex = 0;

            } else {//加载
                param.pageIndex = self.model.pageIndex;
            }

            selfVM.model.isLoading = true;
            httpService.getAllStaffPendData(param, function (data) {

                if (data && data.data) {
                    var dataArr = data.data;
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

        selfVM.editClick = function (index) {
            index = index();
            var tmpData = selfVM.model.data()[index];
            staffPendEdit.propData = tmpData;

            // staffPendEdit.saveSuccessBlock = function (data) {
            //     tmpData = data;
            //     selfVM.model.data(selfVM.model.data());
            // };
            router.navigate("#staffPendEdit");
        }

        selfVM.addClick = function () {
            staffPendEdit.saveSuccessBlock = function (data) {
                selfVM.model.pageIndex = 0;
                // var tmpData = selfVM.model.data();
                // tmpData.push(data);
                // selfVM.model.data(tmpData);
            };
            router.navigate("#staffPendEdit");
        }


        return selfVM;

    });