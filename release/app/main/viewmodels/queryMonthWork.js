define(['durandal/app', 'knockout', 'plugins/router', 'httpServiceRE','components/headerCpt',],
    function (app, ko, router, httpService,headerCpt,unt) {
        var monthDayCountArr, dateM;
        var entMonth, entYear;
        var firstWeek;

        var queryMonthVM = {};

        queryMonthVM.model = {
            title: '我的查询',
            subTitle: '当月排班',
            selectDate: ko.observable(''),//当前选择的日期
            dayOption: ko.observable([]),//日期范围
            dateArr: ko.observable([])//排班和日历数据
        }


        queryMonthVM.model.selectDate.subscribe(function (newVal) {
            var dateStr = newVal;
            if (dateStr != '' && dateStr != undefined) {
                queryMonthVM.getCalendar(dateStr);
            }
        })

        queryMonthVM.activate = function (e) {
            var self = this;

            httpService.getDayOptions({}, function (data) {
                var yearMonthArr = [];
                data.data.forEach(function (item) {

                    var yearMonthM = item.C3_542128471153;
                    var yearMonthStr = yearMonthM.toString();
                    yearMonthArr.push(yearMonthStr);

                });
                self.model.dayOption(yearMonthArr);
            });
        }

        queryMonthVM.getCalendar = function (defaultYM) {
            defaultYM = defaultYM.toString();
            var yearArr = defaultYM.substring(0, 4); //.slice('年');
            var MonthArr = defaultYM.substring(4, 6); //.slice('月');

            entMonth = parseInt(MonthArr); entYear = parseInt(yearArr);
            var date = new Date(entYear, entMonth - 1);
            dateM = date.getMonth();
            var y = date.getFullYear();


            monthDayCountArr = until.getMonthDayCount(y);

            var firstDate = new Date(entYear, entMonth - 1, 1);
            firstWeek = firstDate.getDay();//1号星期几


            var firstDateStr = new Date(entYear, entMonth - 1, 1).format('yyyyMMdd');
            var lastDateStr = new Date(entYear, entMonth - 1, monthDayCountArr[entMonth - 1]).format('yyyyMMdd');
            var cmswhere = "DATES >= '" + firstDateStr + "' AND DATES <= '" + lastDateStr + "'";


            //543666594803 pageSize 31
            var params = {
                "pageSize": 31,
                "cmswhere":cmswhere
            }
            httpService.getMonthWorkData(params, function (data) {
                data = data.data;

                // if(localDebug){
                //     var  a = []
                //      for(var i = 0 ; i < 31 ;i ++){
                //         a.push({"C3_375377576828":"白班"});
                //     } 
                //     data = a;
                // }
                var textColorArr = [];//字体颜色数组
                var monthDayCount = monthDayCountArr[dateM];//当月天数
                // data.splice(10, 5);
                var arrLength = data.length;
                if (data.length != monthDayCount) {//返回数据有误处理
                    var fixData = [];
                    for (var i = 0; i < monthDayCount; i++) {
                        var curDay = new Date(entYear, entMonth - 1, i + 1).format('yyyyMMdd');
                        var filterArr = data.filter(item => item.DATES == curDay);
                        var dataM = {
                            "C3_375377576828":""
                        };
                        if(filterArr.length == 1){
                            dataM = filterArr[0];
                        }
                        fixData.push(dataM);
                    }
                    data = fixData;
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
                queryMonthVM.model.dateArr(viewModelArr)
            })
        }




        return queryMonthVM;
    });