define(['durandal/app',
    'knockout',
    'plugins/router',
    'httpServiceRE',
    'mobiscroll',
    'commonRE',
    'untilRE',
    'components/headerCpt'],
    function (app, ko, router, httpService, mobi, co, ut,headerCpt) {

        var selfVM = {}

        selfVM.model = {
            "title" : '文档编辑',
            "subTitle" : '手册列表',
            "data" : ko.observable([])
        }

        selfVM.activate = function(e){
            selfVM.getData();
        }

        selfVM.attached = function () {

        }

        selfVM.getData = function(){
            httpService.getReadBookListData({},function(data){
                selfVM.model.data([]);
                if(data && data.data){
                    var settingData = selfVM.addProperty(data.data);
                    selfVM.model.data(settingData);
                }
            },function(data){

            })
        }

        selfVM.editClick = function(index){
            index = index();
            
            var selectData = selfVM.model.data()[index];
            router.navigate("#notificationEditor?data=" +　selectData.C3_548337789616);
        }

        selfVM.addProperty = function(data){
            if(Array.isArray(data)){
                data.forEach(function(item){
                    item.isEdit = ko.observable(false);
                })
            }
            return data;
        }
        
        selfVM.settingClick = function(index){
            index = index();
            var tmpData = selfVM.model.data()[index];
            var tmpIsEdit = tmpData.isEdit;

            if(tmpIsEdit()){//保存
                var params = {
                    "data":tmpData
                }
                httpService.saveReadBookListData(params,function(data){

                    tmpIsEdit(!tmpIsEdit());
                },function(data){

                })
            }else{
                tmpIsEdit(!tmpIsEdit());
            }
            
        }

        return selfVM;
    }); 