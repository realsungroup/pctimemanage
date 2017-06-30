Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

//深copy
function deepCopy(obj){
    if(typeof obj != 'object' || obj == null){
        return obj;
    }
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = deepCopy(obj[attr]);
    }
    return newobj;
}

function cmAlert(title) {
    alert(title);
}

function customLoading() {

}

//将对象中的ko转化为值
function transformFuncToVal(data) {
    var tmpData = deepCopy(data);
    for (var key in tmpData) {
        if (typeof tmpData[key] == 'function') {
            tmpData[key] = tmpData[key]();
        }
    }
    return tmpData
}

var until = {
    transformFuncToVal:transformFuncToVal
}