define(['durandal/app', 'knockout', 'plugins/router', 'components/headerCpt', 'httpServiceRE'],
    function (app, ko, router, headerCpt, httpService) {

        var monthReportVM = {};

        monthReportVM.data = ko.observable({})
        
        monthReportVM.model = {
            title: '我的查询',
            subTitle: '日报详情',
            data: ko.observable([]),
        }

        monthReportVM.activate = function (e) {

            monthReportVM.propData = {
                "F_27":"1",
                "F_1":"2"
            }
            monthReportVM.data(monthReportVM.propData);
            // alert(monthReportVM.propData)
        };



        return monthReportVM;
    });