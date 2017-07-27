//dayWorkReportModel
define(['durandal/app', 'knockout', 'plugins/router', 'components/headerCpt', 'httpServiceRE', 'baseVM', 'components/cellMainCpt', 'dayWorkReportModel'],
    function (app, ko, router, headerCpt, httpService, baseVM, cellMainCpt, dayWorkReportModel) {

        var selfVM = new baseVM();

        selfVM.model.title = '考勤员查询';
        selfVM.model.subTitle = '考勤日报';
        selfVM.model.selectDateArr = ko.observable([]);
        selfVM.model.selectDate = ko.observable('');

        selfVM.activate = function (e) {

            selfVM.getData(0);

            var dateArr = [];
            for (var i = 0; i < 6; i++) {
                var nowDate = new Date();
                nowDate.setMonth(nowDate.getMonth() - i);
                var month = nowDate.getMonth() + 1;
                var year = nowDate.getFullYear();
                // var dateStr = year + '年' + month + '月';
                if (month < 10) month = "0" + month;
                var dateStr = year + "" + month;
                dateArr.push(dateStr);
            }
            selfVM.model.selectDateArr(dateArr);
            selfVM.model.selectDate(dateArr[0]);
        }

        selfVM.init = function () {
            selfVM.model.pageIndex = 0;
            selfVM.model.data([]);
            // selfVM.model.recID;
        }

        selfVM.getData = function (type) {
            var self = selfVM;

            var cmswhere = '';
            if (selfVM.model.selectDate().length > 0) {
                cmswhere = "考勤月份 ='" + selfVM.model.selectDate() + "'";
            }
            var param = {
                'cmswhere': cmswhere,
                'key': self.model.inputVal() ? self.model.inputVal() : ''
            }

            param.pageSize = 20;
            if (!type) {//刷新
                param.pageIndex = 0;

            } else {//加载
                param.pageIndex = self.model.pageIndex;
            }

            httpService.getDayWorkReportData(param, function (data) {

                if (data && data.data) {
                    var dataArr = data.data;
                    // self.model.data(dataArr);


                    var modelArr = new dayWorkReportModel(dataArr);
                    selfVM.model.data(modelArr);

                }

                //设置页标（base中）
                self.setPageMark(param, data);


                if (dataArr.length < param.pageSize) self.model.noMore = true;
                else self.model.noMore = false;
            }, function () {

            });
        }

        selfVM.kvoInput = function () {
            selfVM.model.pageIndex = 0;
            selfVM.getData(0);
        }

        selfVM.model.selectDate.subscribe(function (newVal) {
            selfVM.model.pageIndex = 0;
            selfVM.getData(0);
        })


        return selfVM;

    });