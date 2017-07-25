define(['durandal/app', 'knockout', 'plugins/router', 'components/headerCpt', 'httpServiceRE', 'baseVM', 'components/cellMainCpt'],
    function (app, ko, router, headerCpt, httpService, baseVM, cellMainCpt) {

        var selfVM = {};
        selfVM.model = {
            'title' : '微信考勤申请',
            'subTitle' : '请假加班审批记录',
            'pageIndex':0,
            'data':ko.observable([]),
            'recID':'',
        }

         selfVM.activate = function (e) {
            selfVM.init();
            if(e && e.recID){
                selfVM.model.recID = e.recID;
            }
            selfVM.getData(0);
        }

        selfVM.init = function(){
            selfVM.model.pageIndex = 0;
            selfVM.model.data([]);
            selfVM.model.recID;
        }

        selfVM.getData = function (type) {
            var self = selfVM;
            var param = {
                'cmswhere': "",
                'key': '',
                'hostrecid':self.model.recID
            }

            param.pageSize = 10;
            if (!type) {//刷新
                param.pageIndex = 0;

            } else {//加载
                param.pageIndex = self.model.pageIndex;
            }

            httpService.getApplyPendDataForWX(param, function (data) {

                if (data && data.data) {
                    var dataArr = data.data;
                    self.model.data(dataArr);
                }
            }, function () {
                
            });
        }

        return selfVM;

    });