define(['durandal/app', 'knockout', 'plugins/router', 'components/headerCpt'],
    function (app, ko, router, headerCpt) {

        var monthReportVM = {};

        monthReportVM.data = ko.observable({})
        
        monthReportVM.model = {
            title: '我的查询',
            subTitle: '日报详情',
            data: ko.observable([]),
        }

        monthReportVM.activate = function (e) {

            monthReportVM.data(monthReportVM.propData);
        };



        return monthReportVM;
    });