define(['durandal/app', 'knockout', 'plugins/router', 'components/headerCpt', 'httpServiceRE', 'baseVM', 'components/cellMainCpt','untilRE'],
    function (app, ko, router, headerCpt, httpService, baseVM, cellMainCpt,unt) {
        var rowI=0;
        var selfVM = new baseVM();
        selfVM.model.title = '微信考勤申请'
        selfVM.model.subTitle = '微信考勤申请记录'

        selfVM.getData = function (type) {
            var self = selfVM;
            var param = {
                'subresid': '',
                'cmswhere': "",
                'key': self.model.inputVal() ? self.model.inputVal() : ''
            }

            param.pageSize = 10;
            if (!type) {//刷新
                param.pageIndex = 0;

            } else {//加载
                param.pageIndex = self.model.pageIndex;
            }

            selfVM.model.isLoading = true;
            httpService.getApplyDataForWX(param, function (data) {

             

                if (data && data.data) {
                    var dataArr = data.data;   
                    
                    

                    dataArr.forEach(function(item){
                        item.C3_546778248258 = new Date(item.C3_546778248258).format("yyyy-MM-dd hh:mm:ss");
                        item.C3_546778254638 = new Date(item.C3_546778254638).format("yyyy-MM-dd hh:mm:ss");
                    })


                    self.model.data(dataArr);

                    //设置页标（base中）
                    self.setPageMark(param,data);
                    

                    if (dataArr.length < param.pageSize) self.model.noMore = true;
                    else self.model.noMore = false;

                }
                selfVM.model.isLoading = false;
            }, function () {
                selfVM.model.isLoading = false;
            });
        }

        selfVM.detailClick = function (index) {
            index = index();
            var tmpData = selfVM.model.data()[index];
            router.navigate("#wxApplyPendDetail?recID=" + tmpData.REC_ID);
        }

        selfVM.cancelClick = function (index) {
            rowI=index();
          

            $('#myModalConfirm').modal({})
        }
     selfVM.EnsureClick=function(){
           
            var tmpData = selfVM.model.data()[rowI];
         
            tmpData.C3_553774879841 = 'Y';
             var params = {
                 'data':tmpData
             }
             httpService.cancelApplyDataForWX(params,function(data){
                cmAlert("撤销成功");
                 selfVM.getData(1);
             })
             $('#myModalConfirm').modal('hide');
     }


        return selfVM;

    });