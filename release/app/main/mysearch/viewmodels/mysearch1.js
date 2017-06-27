define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'jquery', 'editbase', 'durandal/system', 'editform', 'durandal/binder'],
    function (app, ko, router, dialog, jquery, editbase, system, editform, binder) {
        var monthDayCountArr, dateM;
        var entMonth, entYear;
        var firstWeek;

        var mysearch = new myworkbase();
        mysearch.registerBasepath("#mysearch/mysearch1");
        // mysearch.OptionYearMonth = ko.observable();

        var myaction, myresid, myrecid, mye;


        mysearch.activate = function (action, resid, recid, e) {//获取数据
            myaction = action;
            myresid = resid;
            myrecid = recid;
            mye = e;
        };

        mysearch.dateArr = ko.observable([]);
        mysearch.filterdatafunction = function (data) {//获取数据回调

            var textColorArr = [];//字体颜色数组
            var monthDayCount = monthDayCountArr[dateM];//当月天数
            // data.splice(10, 5);
            var arrLength = data.length;
            if (data.length != monthDayCount) {//返回数据有误处理
                for (var i = 0; i < arrLength; i++) {
                    var str = data[i].DATES;
                    var curDay = new Date(entYear, entMonth - 1, i + 1).format('yyyyMMdd');
                    if (parseInt(str) != curDay) {
                        var dataM = new Object();
                        dataM.C3_375377576828 = '';
                        data.splice(i, 0, dataM);
                    }


                }
            }

            for (var i = 0; i < data.length; i++) {
                if (data[i].C3_375377576828 == '白班') {
                    textColorArr.push('red');
                } else {
                    textColorArr.push('blue');
                }

            }
            
            var numberArr = [];
            for (var i = 0; i < firstWeek; i++) {
                numberArr.push('');
                textColorArr.unshift('');

                var dataM = new Object();
                dataM.C3_375377576828 = '';
                data.unshift(dataM);
            }
            for (var i = 0; i < monthDayCount; i++) numberArr.push(i + 1 + '');
            // console.log(numberArr + "----------->count" + numberArr.length);

            function viewModel(sun, mon, tus, wen, thur, fri, sat) {
                this.sun = sun;
                this.mon = mon;
                this.tus = tus;
                this.wen = wen;
                this.thur = thur;
                this.fri = fri;
                this.sat = sat;
                this.sunWork = sunWork;
            }
            var self = this;
            var viewModelArr = [];
            for (var i = 0; i < numberArr.length / 7; i++) {
                var sunWork;
                var textColorSun;

                var m = new viewModel([numberArr[i * 7], i * 7 < data.length ? data[i * 7].C3_375377576828 : "", textColorArr[i * 7]],
                    [numberArr[i * 7 + 1], i * 7 + 1 < data.length ? data[i * 7 + 1].C3_375377576828 : "", textColorArr[i * 7 + 1]],
                    [numberArr[i * 7 + 2], i * 7 + 2 < data.length ? data[i * 7 + 2].C3_375377576828 : "", textColorArr[i * 7 + 2]],
                    [numberArr[i * 7 + 3], i * 7 + 3 < data.length ? data[i * 7 + 3].C3_375377576828 : "", textColorArr[i * 7 + 3]],
                    [numberArr[i * 7 + 4], i * 7 + 4 < data.length ? data[i * 7 + 4].C3_375377576828 : "", textColorArr[i * 7 + 4]],
                    [numberArr[i * 7 + 5], i * 7 + 5 < data.length ? data[i * 7 + 5].C3_375377576828 : "", textColorArr[i * 7 + 5]],
                    [numberArr[i * 7 + 6], i * 7 + 6 < data.length ? data[i * 7 + 6].C3_375377576828 : "", textColorArr[i * 7 + 6]]);
                viewModelArr.push(m);
            }

            mysearch.dateArr(viewModelArr);

            //   console.log("-------->count"+mysearch.dateArr().length +"------first"+mysearch.dateArr()[0].sat);
            return data;
        };
        //compositionComplete
        mysearch.compositionComplete = function (view) {
            mysearch._compositionComplete(view, mysearch);

        };
        //binding
        mysearch.binding = function (view) {


            return { cacheViews: false }; //cancels view caching for this module, allowing the triggering of the detached callback
        };
        //bindingComplete
        mysearch.bindingComplete = function (view) {

        };
        //attached
        mysearch.attached = function () {
            getDayOptions(function(data){
                 var yearMonthArr = [];
                $.each(data, function (index, item) {
                    console.log("--------------->type" + typeof (data[index].C3_542128471153));
                    var yearMonthM = data[index].C3_542128471153;
                    var yearMonthStr = yearMonthM.toString();
                    yearMonthArr.push(yearMonthStr);

                });
                mysearch.dayOption(yearMonthArr);
            });
            this._attached();

        };

        mysearch.selectDate = ko.observable('');

        mysearch.obserSelectDate = ko.computed(function(){
            var dateStr = mysearch.selectDate().toString();
            if(dateStr != '' && dateStr != undefined){
                getCalendar(dateStr);
            }
        });

        mysearch.dayOption = ko.observable(['']);

        function getCalendar(defaultYM) {
            defaultYM = defaultYM.toString();
            var yearArr = defaultYM.substring(0, 4); //.slice('年');
            var MonthArr = defaultYM.substring(4, 6); //.slice('月');

            entMonth = parseInt(MonthArr); entYear = parseInt(yearArr);
            var date = new Date(entYear, entMonth - 1);
            dateM = date.getMonth();
            var y = date.getFullYear();


            function is_leap(year) {//是否闰年
                return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
            }

            monthDayCountArr = [31, 28 + is_leap(y), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31];//每月天数

            var firstDate = new Date(entYear, entMonth - 1, 1);
            firstWeek = firstDate.getDay();//1号星期几


            var firstDateStr = new Date(entYear, entMonth - 1, 1).format('yyyyMMdd');
            var lastDateStr = new Date(entYear, entMonth - 1, monthDayCountArr[entMonth - 1]).format('yyyyMMdd');
            var cmswhere = "DATES >= '" + firstDateStr + "' AND DATES <= '" + lastDateStr + "'";

            system.log("test rows-------");
            // system.log(mysearch.rows());
            mysearch._activate(myaction, myresid, myrecid, editform, mysearch, mye);
            mysearch.setPagesize(31);
            mysearch.cmswhere(cmswhere);
            mysearch.pagestep = mysearch.getPagesize();

        }



        return mysearch;
    });