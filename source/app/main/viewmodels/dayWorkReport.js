//dayWorkReportModel
define([
  "durandal/app",
  "knockout",
  "plugins/router",
  "components/headerCpt",
  "httpServiceRE",
  "baseVM",
  "components/cellMainCpt",
  "dayWorkReportModel",
  "FileSaverRE",
  "untilRE",
  "xlsxRE",
], function (
  app,
  ko,
  router,
  headerCpt,
  httpService,
  baseVM,
  cellMainCpt,
  dayWorkReportModel,
  saveA,
  ut,
  xlsxRE
) {
  var selfVM = new baseVM();

  selfVM.model.title = "考勤员查询";
  selfVM.model.subTitle = "考勤日报";
  selfVM.model.selectDateArr = ko.observable([]);
  selfVM.model.selectDate = ko.observable();
  selfVM.model.weekTitleArr = ko.observable([]);

  selfVM.model.tableHeight = ko.observable(0);
  selfVM.model.allData = null;
  selfVM.model.isLocalLoading = false;

  selfVM.activate = function (e) {
    // selfVM.model.tableHeight(window.innerHeight - 300);
    selfVM.init();

    // if (selfVM.model.data().length) return;

    httpService.getDayOptions({}, function (data) {
      var yearMonthArr = [];
      data.data.forEach(function (item) {
        var yearMonthM = item.C3_542128471153;
        var yearMonthStr = yearMonthM.toString();
        yearMonthArr.push(yearMonthStr);
      });
      selfVM.model.selectDateArr(yearMonthArr);
      // selfVM.model.selectDate(yearMonthArr[0]);

      selfVM.getData(0);
    });
  };

  selfVM.init = function () {
    selfVM.model.isLoading = false;
  };

  selfVM.getData = function (type) {
    var self = selfVM;

    if (selfVM.model.isLoading) return;
    selfVM.model.isLoading = true;

    var cmswhere = "";
    if (selfVM.model.selectDate() && selfVM.model.selectDate().length > 0) {
      cmswhere = "考勤月份 ='" + selfVM.model.selectDate() + "'";
    }
    var param = {
      cmswhere: cmswhere,
      key: self.model.inputVal() ? self.model.inputVal() : "",
    };

    if (localDebug) param.pageSize = 20;
    if (!type) {
      //刷新
      param.pageIndex = 0;
    } else {
      //加载
      param.pageIndex = self.model.pageIndex;
    }

    selfVM.model.data([]);
    httpService.getDayWorkReportData(
      param,
      function (data) {
        var dataArr = [];
        if (data && data.data) {
          dataArr = data.data;

          if (localDebug) console.log("time ==> " + new Date());
          var modelArr = new dayWorkReportModel(dataArr);
          if (localDebug) console.log("time ==> " + new Date());
          modelArr.forEach((item) => {
            item[0].selected = false;
          });
          selfVM.model.allData = modelArr;
          getLocalFilterData(0);
        }

        if (dataArr.length < param.pageSize) self.model.noMore = true;
        else self.model.noMore = false;

        selfVM.model.isLoading = false;
      },
      function () {
        selfVM.model.isLoading = false;
      }
    );
  };

  selfVM.kvoInput = function () {
    selfVM.model.pageIndex = 0;
    selfVM.getData(0);
  };

  selfVM.model.selectDate.subscribe(function (newVal) {
    selfVM.model.pageIndex = 0;
    selfVM.getData(0);

    getWeekArrFormMonth(newVal);
  });

  selfVM.pageUp = function () {
    if (selfVM.model.isLocalLoading) {
      console.log("loading");
      return;
    } //判断当前是否处于加载数据中
    if (selfVM.model.pageIndex <= 0) {
      selfVM.model.pageIndex = 0;
      return;
    } else selfVM.model.pageIndex--;
    getLocalFilterData(selfVM.model.pageIndex);
  };

  selfVM.pageDown = function () {
    if (selfVM.model.isLocalLoading) {
      console.log("loading");
      return;
    } //判断当前是否处于加载数据中
    if (selfVM.model.noMore) return;
    selfVM.model.pageIndex++;

    getLocalFilterData(selfVM.model.pageIndex);
  };

  selfVM.exportExcel = function () {
    if (localDebug) console.info(xlsxRE);
    var wopts = { bookType: "xlsx", bookSST: false, type: "binary" };

    var worksheet = XLSX.utils.table_to_book($("#dayWorkReport table")[0]);
    var wbout = XLSX.write(worksheet, wopts);

    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }

    /* the saveAs call downloads a file on the local machine */
    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      "考勤日报.xlsx"
    );
  };
  selfVM.syncRecords = function () {
    selfVM.model.isLoading = true;
    const employee = selfVM.model.data().find((data) => {
      return data[0].selected;
    });
    const param = {
      cmswhere: `YEARMONTH = '${employee[0].考勤月份}' and PNID = ${employee[0].pnid}`,
    };
    httpService.getEmployeeDayWorkReportData(
      param,
      function (data) {
        var dataArr = [];
        if (data && data.data) {
          // dataArr = data.data;
          dataArr = data.data.map((item) => {
            return {
              YEARMONTH: item.YEARMONTH,
              DATES: item.DATES,
              PNID: item.PNID,
              C3_375380046640: item.C3_375380046640,
              C3_375380006609: item.C3_375380006609,
              C3_375377576828: item.C3_375377576828,
              WORKSTARTTIME: item.WORKSTARTTIME,
              WORKENDTIME: item.WORKENDTIME,
              BREAKSTARTTIME: item.BREAKSTARTTIME,
              BREAKENDTIME: item.BREAKENDTIME,
              F_79: item.F_79,
              DAYTYPE: item.DAYTYPE,
            };
          });
          httpService.syncDailyData(
            {
              data: dataArr,
              uniquecolumns: "DATES,PNID",
            },
            function (data) {
              selfVM.model.isLoading = false;
              if (data && data.data) {
                dataArr = data.data;
              }
            },
            function () {
              selfVM.model.isLoading = false;
            }
          );
        }
      },
      function () {
        selfVM.model.isLoading = false;
      }
    );
  };

  function getLocalFilterData(index) {
    if (selfVM.model.isLocalLoading) return;
    selfVM.model.isLocalLoading = true;
    var pageSize = appConfig.app.dayReportExportCount;
    var pageIndex = index;

    var startIndex = pageSize * index;
    var endIndex = pageSize * (index + 1);
    var data = [];
    if (Array.isArray(selfVM.model.allData) && selfVM.model.allData.length) {
      data = selfVM.model.allData.slice(startIndex, endIndex);
    }

    if (data.length) pageIndex = pageIndex + 1;
    var total = Math.ceil(selfVM.model.allData.length / pageSize);

    if (!data.length) {
      selfVM.model.pageIndex--;
      selfVM.model.isLocalLoading = false;

      if (index == 0) selfVM.setPageMarkWithNum(0, 0);
      return;
    }
    selfVM.model.data(data);

    selfVM.setPageMarkWithNum(pageIndex, total);
    selfVM.model.isLocalLoading = false;
  }

  //监听浏览器窗口变化
  // window.onresize = function(){
  //     selfVM.model.tableHeight(window.innerHeight - 300);
  // }

  function getWeekArrFormMonth(dateStr) {
    var curYear = dateStr.substring(0, 4);
    var curMonth = parseInt(dateStr.substring(4, 6)) - 2;

    var nextYear = curMonth >= 11 ? curYear + 1 : curYear;
    var nextMonth = curMonth >= 11 ? 0 : curMonth + 1;

    var curYearMonthDayCount = until.getMonthDayCount(curYear)[curMonth];
    var nextYearMonthDayCount = until.getMonthDayCount(curYear)[nextMonth];

    var dateWeekArr = [];
    for (var i = 16; i < 31 + 1; i++) {
      if (i > curYearMonthDayCount) {
        dateWeekArr.push({
          week: "",
          num: "",
          visible: false,
        });
        continue;
      }
      var tmpDate = new Date(curYear, curMonth, i);
      var tmpWeek = tranformNumToWeek(tmpDate.getDay());
      dateWeekArr.push({
        week: tmpWeek,
        num: i,
        visible: true,
      });
    }

    for (var i = 1; i < 15 + 1; i++) {
      var tmpDate = new Date(nextYear, nextMonth, i);
      var tmpWeek = tranformNumToWeek(tmpDate.getDay());
      dateWeekArr.push({
        week: tmpWeek,
        num: i,
        visible: true,
      });
    }
    console.info(dateWeekArr);
    selfVM.model.weekTitleArr(dateWeekArr);
  }

  function tranformNumToWeek(num) {
    var week = "";
    switch (num) {
      case 0:
        week = "日";
        break;
      case 1:
        week = "一";
        break;
      case 2:
        week = "二";
        break;
      case 3:
        week = "三";
        break;
      case 4:
        week = "四";
        break;
      case 5:
        week = "五";
        break;
      case 6:
        week = "六";
        break;
    }
    return week;
  }
  return selfVM;
});
