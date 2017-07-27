define( function() {

    //计算月排班工时
    function calMonthWorkTime(data){
        var sumNum = 0;
        for(var key in data){
            sumNum = sumNum + parseFloat(data[key]);
        }
        return sumNum;
    }

    return function(dataArr){
        if(!Array.isArray(dataArr) || !dataArr.length) return;
        var firstObj = dataArr[0];

        this.workTeam = firstObj['班组名称'] || {};
        this.workerNum = firstObj['员工工号'] || {};
        this.workerName = firstObj['员工姓名'] || {};
        
        dataArr.forEach(function(item){
            switch(item['考勤项目']){
                case '出勤':{
                    this.participation = item || {};
                }
                break;
                case '加班':{
                    this.overTime = item || {};
                }
                break;
            }
        })

        this.monWorkTime = calMonthWorkTime(this.participation);

    }
});