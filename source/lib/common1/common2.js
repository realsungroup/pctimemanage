


//筛选出请假规则
function getRule(str) {
  var ruleArr = appConfig.app.rule;
  for (var i = 0; i < ruleArr.length; i++) {
    var tempRuleM = ruleArr[i];
    if (tempRuleM.C3_533402301362 == str) {
      return tempRuleM.C3_545771115865

    }
  }
  return '';
}

//筛选出那一条请假规则
function getVactionObject(str) {
  var ruleArr = appConfig.app.rule;
  for (var i = 0; i < ruleArr.length; i++) {
    var tempRuleM = ruleArr[i];
    if (tempRuleM.C3_533402301362 == str) {
      return tempRuleM

    }
  }
  return null;
}

//获取所有请假类型
function getAllRuleCategory() {
  var ruleArr = Array.from(appConfig.app.rule);
  var dataArr = ['全部'];
  for (var i = 0; i < ruleArr.length; i++) {
    var tempRuleM = ruleArr[i];
    dataArr.push(tempRuleM.C3_533402301362);
  }
  return dataArr;
}

//获取照片非必填
function getCarmeShow(selectRuleM) {//附件
  if (selectRuleM == null) return ["", "", "", ""];
  var imgShowArr = [];//拍照是否显示
  imgShowArr.push([selectRuleM.C3_545770918237 == 'Y' ? true : false, selectRuleM.C3_545770982165 == 'Y' ? "必填" : "非必填", selectRuleM.C3_545771032511]);
  imgShowArr.push([selectRuleM.C3_545770921226 == 'Y' ? true : false, selectRuleM.C3_545770982361 == 'Y' ? "必填" : "非必填", selectRuleM.C3_545771032706]);
  imgShowArr.push([selectRuleM.C3_545770922361 == 'Y' ? true : false, selectRuleM.C3_545770982566 == 'Y' ? "必填" : "非必填", selectRuleM.C3_545771032913]);
  imgShowArr.push([selectRuleM.C3_545770923478 == 'Y' ? true : false, selectRuleM.C3_545770990395 == 'Y' ? "必填" : "非必填", selectRuleM.C3_545771067208]);
  return imgShowArr;
}

function valiateForm(data) {//验证提交数据

  if (data.C3_533398158705 != '补打卡') {//非补打卡时长的验证
    if (data.C3_541449935726 == undefined || data.C3_541449935726 == '') {
      cmAlert("时长不能为空！");
      return false;
    }
  }

  if (!appConfig.app.teamApprove || appConfig.app.teamApprove.length == 0) { cmAlert("审批人不能为空！"); return false; }

  var selectRuleM = getVactionObject(data.C3_533398158705);

  var cameraNeccesseryArr = [selectRuleM.C3_545770982165,
  selectRuleM.C3_545770982361,
  selectRuleM.C3_545770982566,
  selectRuleM.C3_545770990395];

  var addressArr = [data.C3_541450276993, data.C3_545771156108, data.C3_545771157350, data.C3_545771158420];
  for (var i = 0; i < addressArr.length; i++) {
    if (i >= cameraNeccesseryArr.length) { alert(cameraNeccesseryArr); return false; }
    if (cameraNeccesseryArr[i] == 'Y' && (addressArr[i] == undefined || addressArr[i] == '' || addressArr[i] == null)) {
      cmAlert("请上传必需附件！");
      return false;
    }
  }
  return true;
}

var common = {
  getRule: getRule,
  getVactionObject: getVactionObject,
  getAllRuleCategory: getAllRuleCategory,
  getCarmeShow: getCarmeShow,
  valiateForm:valiateForm
}
