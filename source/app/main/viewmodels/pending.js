define([
  "durandal/app",
  "knockout",
  "plugins/router",
  "httpServiceRE",
  "components/headerCpt",
  "components/cellMainCpt",
  "untilRE",
  "baseVM",
], function (app, ko, router, httpService, headerCpt, cellMainCpt, ut, baseVM) {
  var selfVM = new baseVM();
  var self = selfVM;
  selfVM.model.subTitle = "审批中";
  (selfVM.model.allSelected = ko.observable(false)),
    //获取数据
    (selfVM.getData = function (type) {
      var keyStr = "";
      keyStr = self.model.selectedCategory();
      keyStr = keyStr == "全部" ? "" : "C3_533398158705 ='" + keyStr + "'";

      var param = {
        subresid: "",
        cmswhere: keyStr,
        key: self.model.inputVal() ? self.model.inputVal() : "",
      };

      param.pageSize = 200;
      if (!type) {
        //刷新
        param.pageIndex = 0;
      } else {
        //加载
        param.pageIndex = self.model.pageIndex;
      }

      selfVM.model.isLoading = true;
      httpService.getPendingData(
        param,
        function (data) {
          if (data && data.data) {
            var dataArr = data.data;
            dataArr.forEach(function (val) {
              val.selected = false;
            });
            self.model.data(dataArr);
            //设置页标（base中）
            self.setPageMark(param, data);

            if (dataArr.length < param.pageSize) self.model.noMore = true;
            else self.model.noMore = false;
          }
          selfVM.model.isLoading = false;
        },
        function () {
          selfVM.model.isLoading = false;
        }
      );
    });

  selfVM.goToApplyDetailPage = function (index) {
    var tmpData = self.model.data()[index()];
    // var tmpJsonData = JSON.stringify(tmpData);
    // router.navigate("#applyDetail?data=" + tmpJsonData + '&willRefuse=true');

    globSingleData = JSON.stringify(tmpData);
    router.navigate("#applyDetail?willRefuse=true");
  };

  //全选
  selfVM.selectAllChange = function (e) {
    var tmpDataArr = self.model.data();
    for (var i = 0; i < tmpDataArr.length; i++) {
      if (self.model.allSelected()) tmpDataArr[i].selected = true;
      else tmpDataArr[i].selected = false;
    }
    self.model.data([]);
    self.model.data(tmpDataArr);
  };

  //审批
  selfVM.approve = function () {
    // for(var i = 0 ; i < self.data.selectMap.le)
    var submitArr = [];
    self.model.data().forEach(function (item) {
      if (item.selected) {
        var i = {
          REC_ID: item.REC_ID,
          _id: 1,
          _state: "modified",
          C3_541454801460: "Y",
        };

        submitArr.push(i);
      }
    });
    if (!submitArr.length) {
      cmAlert("请勾选至少一个事件");
      return;
    }

    // common.customLoading();
    let taskid, timer;
    function getTaskInfo(taskid) {
      httpService.getApprove(
        { taskid, includeData: true },
        function (data) {
          if (data.IsCompleted) {
            // 当前任务已完成
            cmAlert(`<div style='text-align:center'>
                  <h3>审批已完成</h3>
                  <div>
                    <div style='position:relative;height:8px;border-radius:4px;border:1px #000 solid '>
                      <div style='position:absolute;width:100%;height:100%;background:#000;height:100%'></div>
                    </div>
                  </div>
                  <div>
                    ${data.data.intCurrent} / ${submitArr.length}
                  </div>
                 <div/>`);
            self.getData(1);
          } else {
            // 当前任务未完成
            timer = setTimeout(() => {
              getTaskInfo(taskid);
            }, 1000);
            cmAlert(`<div style='text-align:center'>
                  <h3>审批中</h3>
                  <div>
                    <div style='position:relative;height:8px;border-radius:4px;border:1px #000 solid '>
                      <div style='position:absolute;width:${(
                        (data.data.intCurrent / submitArr.length) *
                        100
                      ).toFixed(
                        2
                      )}%;height:100%;background:#000;height:100%'></div>
                    </div>
                  </div>
                  <div>
                    ${data.data.intCurrent} / ${submitArr.length}
                  </div>
                 <div/>`);
          }
        },
        function () {
          console.log(err);
          timer = setTimeout(() => {
            getTaskInfo(taskid);
          }, 1000);
        }
      );
    }
    httpService.startApprove(
      submitArr,
      function (data) {
        getTaskInfo(data.taskid);
      },
      function () {
        cmAlert("审批失败");
      }
    );
  };
  return selfVM;
});
