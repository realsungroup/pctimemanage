define(['durandal/app', 'knockout', 'plugins/router', 'components/headerCpt', 'httpServiceRE'],
    function (app, ko, router, headerCpt, httpService) {

        var monthReportVM = {};
        monthReportVM.model = {
            title: '我的查询',
            subTitle: '考勤月报',
            data: ko.observable([]),
        }

        monthReportVM.activate = function (e) {

            var params = {
                'subresid': '',
                'cmswhere': '',
                'key': ''
            }

            httpService.getMonthReportData(params, function (data) {
                if (localDebug) {
                    data = {
                        "data": [{
                            'YGNAMES': "1",
                            'KQTYPE': "2"
                        }]
                    }
                }
                monthReportVM.model.data([])
                if (data && data.data && 　data.data[0]) {
                    monthReportVM.model.data(getModel(data.data[0]))
                    console.log("data==========>" + getModel(data.data[0]))
                }
            })
        };


        function getModel(data) {
            var titleArr = ['姓名', '考勤类别', '年月', '入职日期', '出勤时数', '公出A', '病假', '年假', '旷工', '产前假', '路程假', '婚假', '丧假', '工伤假', '产假', '产检假', '计划生育假',
                '哺乳假', '护理假', '其他假', '国定加班', '当月累计欠班', '事假汇', '调休汇', '欠班汇', '平日及超出工时加班'];

            var subTitleArr = ['YGNAMES', 'KQTYPE', 'YEARMONTH', 'JOINDATE', 'F_39', 'C3_431881684425', 'F_14', 'F_23', 'F_3', 'F_36', 'F_54', 'F_18', 'F_19', 'F_27', 'F_16', 'F_35',
                'F_52', 'F_37', 'F_69', 'F_55', 'C3_431863392840', 'F_22', 'C3_431874234218', 'C3_431871740201', 'C3_431871846626', 'C3_431871905878'];
            var valueArr = [];
            subTitleArr.forEach(function (item) {
                valueArr.push(data[item]);
            })

            var dataArr = [];
            if (titleArr.length == valueArr.length) {
                for (var i = 0; i < valueArr.length; i++) {
                    dataArr.push({
                        "title": titleArr[i],
                        "subTitle": valueArr[i]
                    })
                }
            }

            return dataArr;
        }

        return monthReportVM;
    });