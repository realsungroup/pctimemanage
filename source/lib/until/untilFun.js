var dialog = require('plugins/dialog');

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
function deepCopy(obj) {
    if (typeof obj != 'object' || obj == null) {
        return obj;
    }
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = deepCopy(obj[attr]);
    }
    return newobj;
}

function cmAlert(title) {
    var options = {}
    $('#modalTitle').html('提示');
    $('#modalSubTitle').html(title);

    if($('#myModal').modal) $('#myModal').modal(options)
    else alert(title)
}

function fixFloatNum(num){
    return Math.round(num * 100) / 100;
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

function attachShow(imgUrlArr,PhotoSwipe,PhotoSwipeUI_Default) {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var items = []
    imgUrlArr.forEach(function (item) {
        if (item) {
            items.push({
                src: item,
                w: 0,
                h: 0
            })
        }
    })


    // define options (if needed)
    var options = {
        // history & focus options are disabled on CodePen        
        history: false,
        focus: false,
        shareEl: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0

    };

    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.listen('gettingData', function (index, item) {
        // index - index of a slide that was loaded
        // item - slide object
        console.log(item);
        var img = new Image();
        img.onload = function(){
            item.w = img.width;
            item.h = img.height;
            gallery.updateSize(true);
        }
        img.src = item.src;
        // items[index].h = item.container.offsetHeight
        // items[index].w = item.container.offsetWidth;
        // gallery.updateSize(true);
        // console.log("--------------->height" + item.container.offsetHeight + "\n width" + item.container.offsetWidth)
    });
    gallery.init();
}

var until = {
    transformFuncToVal: transformFuncToVal
}