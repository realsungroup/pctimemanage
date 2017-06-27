define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'jquery', 'editbase', 'durandal/system', 'editform', 'durandal/binder'],
    function (app, ko, router, dialog, jquery, editbase, system, editform, binder) {
        var monthDayCountArr;
        var myaction, myresid, myrecid, mye;
        var mysearch2 = new myworkbase();
        var backupData;
        mysearch2.switchBool = ko.observable(false);
        mysearch2.registerBasepath("#mysearch/mysearch2");
        mysearch2.selectedAppItem = ko.observable({});
        mysearch2.textCr = ko.observable([]);

        mysearch2.activate = function (action, resid, recid, e) {
            myaction = action;
            myresid = resid;
            myrecid = recid;
            mye = e;
        };

        mysearch2.filterdatafunction = function (data) {//获取数据回调
            backupData = data;
            for (var i = 0; i < data.length; i++) {
                var dataM = data[i];
                if (dataM.C3_375377576828 == '白班') {
                    dataM.tcolor = 'red';
                } else {
                    dataM.tcolor = 'blue';
                }
            }
            return data;
        };

        //compositionComplete
        mysearch2.compositionComplete = function (view) {
            mysearch2._compositionComplete(view, mysearch2);

        };
        mysearch2.getView = function () {
            if (myaction == 'list') {
                return 'mysearch/views/mysearch2.html'
            }
            else {
                return 'mysearch/views/mysearch2Detail.html'
            }

        }
        //binding
        mysearch2.binding = function (view) {


            return { cacheViews: false }; //cancels view caching for this module, allowing the triggering of the detached callback
        };
        //bindingComplete
        mysearch2.bindingComplete = function (view) {

        };
        //attached
        mysearch2.attached = function () {
            getDayOptions(function (data) {
                var yearMonthArr = [];
                $.each(data, function (index, item) {
                    console.log("--------------->type" + typeof (data[index].C3_542128471153));
                    var yearMonthM = data[index].C3_542128471153;
                    var yearMonthStr = yearMonthM.toString();
                    yearMonthArr.push(yearMonthStr);

                });
                mysearch2.dayOptionT(yearMonthArr);
                // getWorkDay(mysearch2.selectDate());
            });
            this._attached();
        }

        mysearch2.dayOptionT = ko.observableArray(['']);

        function getWorkDay(defaultYM) {
            defaultYM = defaultYM.toString();
            //  defaultYM = "201703"
            var entYear = parseInt(defaultYM.substring(0, 4)); //.slice('年');
            var entMonth = parseInt(defaultYM.substring(4, 6)) - 1; //.slice('月');
            function is_leap(year) {//是否闰年
                return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
            }

            monthDayCountArr = [31, 28 + is_leap(entYear), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31];//每月天数
            var firstDateStr = new Date(entYear, entMonth, 1).format('yyyyMMdd');
            var lastDateStr = new Date(entYear, entMonth, monthDayCountArr[entMonth]).format('yyyyMMdd');

            var cmswhere = "DATES >= '" + firstDateStr + "' AND DATES <= '" + lastDateStr + "'";
            mysearch2._activate(myaction, myresid, myrecid, editform, mysearch2, mye);
            mysearch2.setPagesize(31);
            mysearch2.cmswhere(cmswhere);
            mysearch2.pagestep = mysearch2.getPagesize();
        }

        mysearch2.browse = function (row) {
            mysearch2.selectedAppItem(row);
            mysearch2._browse(row, mysearch2, mysearch2.Basepath, router)
        }

        mysearch2.selectDate = ko.observable("");
        mysearch2.monitorselectDate = ko.computed(function () {

            var selectDateStr = mysearch2.selectDate().toString();
            if (selectDateStr != "" && selectDateStr != undefined) {
                getWorkDay(selectDateStr);
                mysearch2.switchBool(false);
            }
            
        }, mysearch2);

        mysearch2.errorData = function () {
            mysearch2.switchBool(!mysearch2.switchBool());
            if (!mysearch2.switchBool()) {
                mysearch2.rows(backupData);
                return;
            }

            var filterArray = [];
            for (var i = 0; i < backupData.length; i++) {
                var dataModel = backupData[i];
                if (parseInt(dataModel.F_1) > 0 || parseInt(dataModel.F_2) > 0 || parseInt(dataModel.F_3) > 0) {
                    filterArray.push(dataModel);
                }
            }
            mysearch2.rows(filterArray);
        }
        return mysearch2;
    });