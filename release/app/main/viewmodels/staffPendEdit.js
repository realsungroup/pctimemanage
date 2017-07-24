define(['durandal/app', 'knockout', 'plugins/router', 'components/headerCpt', 'httpServiceRE', 'components/cellMainCpt','main/viewmodels/staffPendEditOption','components/cellReadonlyCpt'],
    function (app, ko, router, headerCpt, httpService,cellMainCpt,staffPendEditOption,cellReadonlyCpt) {

        var selfVM = {};
        selfVM.model = {
            'title' : '员工审批',
            'subTitle' : '员工审批定义编辑',
            'data':ko.observable({}),
            'zuzhang':ko.observable({}),
            'zhuguan':ko.observable({}),
            'jinli':ko.observable({}),
        }

        selfVM.activate = function(){
            
            if(selfVM.propData) selfVM.model.data(selfVM.propData)
        }

        selfVM.gotoChoosePageClick = function(type){
           
            staffPendEditOption.chooseBlock = function(data){
                    switch(type){
                    case  'zuzhang':{
                        selfVM.model.zuzhang(data);
                    }
                    break;

                    case  'zhuguan':{
                        selfVM.model.zhuguan(data);
                    }
                    break;

                    case  'jinli':{
                        selfVM.model.jinli(data);
                    }
                    break;

                }
            }
            router.navigate("#staffPendEditOption")
        }

        //保存
        selfVM.saveClick = function(){
            if(selfVM.propData){
                
            }else{
                // httpService.addPesonPendData()
            }
        }
        return selfVM;

    });