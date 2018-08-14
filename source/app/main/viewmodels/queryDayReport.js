define(['durandal/app', 'knockout', 'plugins/router', 'httpServiceRE','main/viewmodels/queryDayReportDetail','components/headerCpt','untilRE'],
    function (app, ko, router, httpService,queryDayReportDetail) {
        var monthDayCountArr;
        var myaction, myresid, myrecid, mye;
        var backupData;



        var queryDayReportVM = {};

         queryDayReportVM.model = {
            title: '我的查询',
            subTitle: '考勤日报',
            data: ko.observable([]),
        }

        queryDayReportVM.dataArr = ko.observable([]);
        queryDayReportVM.switchBool = ko.observable(false);
        queryDayReportVM.selectedAppItem = ko.observable({});
        queryDayReportVM.textCr = ko.observable([]);
        queryDayReportVM.dayOptionT = ko.observableArray(['']);
        queryDayReportVM.selectDate = ko.observable("");


        //attached
        queryDayReportVM.attached = function () {
            httpService.getDayOptions({}, function (data) {
                data = data.data;
                var yearMonthArr = [];
                var currentMonth;
                data.forEach(function (item) {
                    var yearMonthM = item.C3_542128471153;
                    var yearMonthStr = yearMonthM.toString();
                    yearMonthArr.push(yearMonthStr);

                    if(item.C3_547308103102 === "Y"){
                        currentMonth = item.C3_542128471153
                    }
                   
                });
                
                queryDayReportVM.selectDate(currentMonth);
                

            });
        }

        queryDayReportVM.activate = function (e) {
            var self = this;

            httpService.getDayOptions({}, function (data) {
                var yearMonthArr = [];
                data.data.forEach(function (item) {
                    
                    var yearMonthM = item.C3_542128471153;
                    var yearMonthStr = yearMonthM.toString();
                    yearMonthArr.push(yearMonthStr);

                });
               // yearMonthArr.reverse();
               // yearMonthArr.splice(0,1)
                self.dayOptionT(yearMonthArr);
            });
        }


        function getWorkDay(defaultYM) {
            defaultYM = defaultYM.toString();
            //  defaultYM = "201703"
            var entYear = parseInt(defaultYM.substring(0, 4)); //.slice('年');
            var entMonth = parseInt(defaultYM.substring(4, 6)) - 1; //.slice('月');
            function is_leap(year) {//是否闰年
                return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
            }

            monthDayCountArr = [31, 28 + is_leap(entYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];//每月天数
            var firstDateStr = new Date(entYear, entMonth, 1).format('yyyyMMdd');
            var lastDateStr = new Date(entYear, entMonth, monthDayCountArr[entMonth]).format('yyyyMMdd');

            var cmswhere = "DATES >= '" + firstDateStr + "' AND DATES <= '" + lastDateStr + "'";

            var params = {
                "cmswhere": cmswhere,
                "pageIndex": 0,
                "pageSize": 31
            }

            httpService.getDayReportData(params, function (data) {
                if (localDebug) {
                    data = {
                        "data": [{
                            'DATES': "1",
                            'C3_375377576828': "2",
                            'STARTTIMES': "3",
                            'ENDTIMES': "4",
                            'F_5': "5"
                        },{
                            'DATES': "11",
                            'C3_375377576828': "22",
                            'STARTTIMES': "33",
                            'ENDTIMES': "44",
                            'F_5': "55"
                        },{
                            'DATES': "111",
                            'C3_375377576828': "222",
                            'STARTTIMES': "333",
                            'ENDTIMES': "444",
                            'F_5': "555",
                            'F_1':'10'
                        }]
                    }
                }
                data = data.data;
                backupData = data;
                for (var i = 0; i < data.length; i++) {
                    var dataM = data[i];
                    if (dataM.C3_375377576828 == '白班') {
                        dataM.tcolor = 'red';
                    } else {
                        dataM.tcolor = 'blue';
                    }
                }
                queryDayReportVM.dataArr(data)
            })
        }



        queryDayReportVM.selectDate.subscribe(function (newVal) {
            var selectDateStr = newVal;
            if (selectDateStr != "" && selectDateStr != undefined) {
                getWorkDay(selectDateStr);
                queryDayReportVM.switchBool(false);
            }

        });

        queryDayReportVM.errorData = function () {
            queryDayReportVM.switchBool(!queryDayReportVM.switchBool());
            if (!queryDayReportVM.switchBool()) {
                queryDayReportVM.dataArr(backupData);
                return;
            }

            var filterArray = [];
            for (var i = 0; i < backupData.length; i++) {
                var dataModel = backupData[i];
                if (parseInt(dataModel.F_1) > 0 || parseInt(dataModel.F_2) > 0 || parseInt(dataModel.F_3) > 0) {
                    filterArray.push(dataModel);
                }
            }
            queryDayReportVM.dataArr(filterArray);
        }

        queryDayReportVM.gotoDetailClick = function(index){
            index = index();
            var tmpData = queryDayReportVM.dataArr()[index];
            queryDayReportDetail.propData = tmpData;
            router.navigate("#queryDayReportDetail");
        }
        return queryDayReportVM;
    });