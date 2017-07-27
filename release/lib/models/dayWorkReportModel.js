define(function () {
    var workDefaultTime = '166.6';
    var typeArr = ['排班出勤', '加班', '年假', '事假', '病假', '调休', '欠班', '其它'];
    var countProp = ['A16', 'A17', 'A18', 'A19', 'A20', 'A21', 'A22', 'A23', 'A24', 'A25', 'A26', 'A27', 'A28', 'A29', 'A30', 'A31', 'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B09', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15'];
    var workOnVacationProp = ['A21', 'A22','A28', 'A29', 'A30','B03', 'B04', 'B10', 'B11'];

    function sumForArr(dataArr,filterArr){
        var sumNum = 0;
        dataArr.forEach(function (data) {
            for (var key in data) {
                var valOfFloat = parseFloat(data[key]);
                if (filterArr.indexOf(key) == -1 || isNaN(valOfFloat)) continue;
                sumNum = sumNum + valOfFloat;
            }
        })
        return sumNum;
    }   

    //计算月排班工时
    function calMonthWorkTime(dataArr) {
        dataArr = dataArr.filter(function (item) {
           return item['考勤项目'] != typeArr[1];
        })
        return sumForArr(dataArr,countProp);
    }

    //一条A16到B15的和
    function sumForOne(dataArr,index){
        dataArr = dataArr.filter(function (item) {
           return item['考勤项目'] == typeArr[index];
        });
        return sumForArr(dataArr,countProp);
    }

    //休息日加班次数
    function sumForWorkOnVacation(dataArr){
        dataArr = dataArr.filter(function (item) {
           return item['考勤项目'] == typeArr[1];
        });
        return sumForArr(dataArr,workOnVacationProp);
    }

    //empty model
    function returnEmptyModelByTitle(model, title) {
        return {
            '班组名称': model['班组名称'],
            '员工工号': model['员工工号'],
            '员工姓名': model['员工姓名'],
            '考勤项目': title,
            'A16': "",
            'A17': "",
            'A18': "",
            'A19': "",
            'A20': "",
            'A21': "",
            'A22': "",
            'A23': "",
            'A24': "",
            'A25': "",
            'A26': "",
            'A27': "",
            'A28': "",
            'A29': "",
            'A30': "",
            'A31': "",
            'B01': "",
            'B02': "",
            'B03': "",
            'B04': "",
            'B05': "",
            'B06': "",
            'B07': "",
            'B08': "",
            'B09': "",
            'B10': "",
            'B11': "",
            'B12': "",
            'B13': "",
            'B14': "",
            'B15': "",
        }
    }

    return function (dataArr) {

        var arrayForMap = [];
        if (Array.isArray(dataArr)) {
            var map = {};
            dataArr.forEach(function (item) {
                var workerNum = item['员工工号']
                if (map.hasOwnProperty(workerNum)) map[workerNum].push(item)
                else map[workerNum] = [item];
            })


            for (var key in map) {
                var val = map[key];

                var newVal = [];
                typeArr.forEach(function (title) {
                    var isHave = false;
                    val.forEach(function (item) {
                        if (item['考勤项目'] == title) {
                            console.log("----------->" + title);
                            newVal.push(item);
                            isHave = true;
                        }
                    })

                    if (!isHave) {
                        var emptyM = returnEmptyModelByTitle(val[0], title);
                        newVal.push(emptyM);
                    }
                })

                
                var workTime = calMonthWorkTime(newVal);
                var workOverTime = sumForOne(newVal,1);
                var yearVacation = sumForOne(newVal,2);
                var thingVacation = sumForOne(newVal,3);
                var sickVacation = sumForOne(newVal,4);
                var dateChangeVacation = sumForOne(newVal,5);
                var noWorkVacation = sumForOne(newVal,6);
                var otherVacation = sumForOne(newVal,7);
                var workOnVacationCount = sumForWorkOnVacation(newVal,1);
                newVal.forEach(function(item){
                    //月排班工时
                    item.workTime = workTime;
                    //月标准工时
                    item.workDefaultTime = workDefaultTime;
                    //月超出工时
                    item.workExtraTime = parseFloat(workTime) - parseFloat(workDefaultTime);
                    //加班工时
                    item.workOverTime = workOverTime;
                    //年假
                    item.yearVacation = yearVacation;
                    //事假
                    item.thingVacation = thingVacation;
                    //病假
                    item.sickVacation =sickVacation;
                    //调休
                    item.dateChangeVacation = dateChangeVacation;
                    //欠班
                    item.noWorkVacation = noWorkVacation;
                    //其他
                    item.otherVacation = otherVacation;

                    item.middleWorkTypeCount = 0;

                    item.littleNightWorkTypeCount = 0;

                    item.bigNightWorkTypeCount = 0;
                    //休息日加班次数
                    item.workOnVacationCount = workOnVacationCount;

                    //备注(总加班工时）
                    item.allWorkTime = item.workExtraTime + item.workOverTime -item.dateChangeVacation - item.noWorkVacation -item.thingVacation
                })

                

                arrayForMap.push(newVal);
            }


        }
        return arrayForMap;


    }
});