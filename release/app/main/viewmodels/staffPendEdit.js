define(['durandal/app', 'knockout', 'plugins/router', 'components/headerCpt', 'httpServiceRE', 'components/cellMainCpt', 'main/viewmodels/staffPendEditOption', 'components/cellReadonlyCpt'],
    function (app, ko, router, headerCpt, httpService, cellMainCpt, staffPendEditOption, cellReadonlyCpt) {

        var selfVM = {};
        selfVM.model = {
            'title': '员工审批',
            'subTitle': '员工审批定义编辑',
            'data': ko.observable({}),
            "isEdit":false//是否编辑状态
        }


        selfVM.activate = function () {
            if(!router.explicitNavigation) return;
            console.log("staffPendEdit activate")

            selfVM.model.isEdit = false;
            selfVM.model.data({});
            if (selfVM.propData) {
                selfVM.model.data(selfVM.propData)
                selfVM.propData = null;
                selfVM.model.isEdit = true;
            }
        }

        selfVM.attached = function(){
            console.log("staffPendEdit attached")
        }

        selfVM.gotoChoosePageClick = function (type) {

            //block 回调函数定义
            staffPendEditOption.chooseBlock = function (data) {
                switch (type) {
                    case 'zuzhang': {
                        selfVM.model.data().C3_549036811852 = data.C3_511299354239;// 组长工号 
                        selfVM.model.data().C3_541450790021 = data.C3_511297180036;// 组长编号 
                        selfVM.model.data().C3_541450797951 = data.C3_511297363801;//组长 
                    }
                        break;

                    case 'zhuguan': {
                        selfVM.model.data().C3_549036828477 = data.C3_511299354239;// 主管工号 
                        selfVM.model.data().C3_541467332510 = data.C3_511297180036;// 主管编号 
                        selfVM.model.data().C3_541467332728 = data.C3_511297363801;// 主管 
                    }
                        break;

                    case 'jinli': {
                        selfVM.model.data().C3_549036840539 = data.C3_511299354239;// 经理工号 
                        selfVM.model.data().C3_541467368324 = data.C3_511297180036;//  经理编号 
                        selfVM.model.data().C3_541467363607 = data.C3_511297363801;//   经理 
                    }
                        break;

                }

                //执行完销毁
                staffPendEditOption.chooseBlock = null;
            }

            router.navigate("#staffPendEditOption")
        }

        //保存
        selfVM.saveClick = function () {
            //编辑
            var params = {
                'data': selfVM.model.data()
            }
            if (selfVM.model.isEdit) {
                console.log("edit invoke");
                httpService.savePesonPendData(params, function (data) {

                    cmAlert("修改成功");
                    success(data);
                })
                //新增
            } else {
                console.log("add invoke")
                params.data.C3_542058915408 = enterprisecode;
                httpService.addPesonPendData(params, function (data) {

                    cmAlert("添加成功");
                    success(data);
                })
            }

            function success(data) {
                if (typeof (selfVM.saveSuccessBlock) == 'function' &&
                    data && data.data && data.data[0]) {
                    selfVM.saveSuccessBlock(data.data[0])
                    selfVM.saveSuccessBlock = null;
                }
                router.navigateBack();
            }
        }

        selfVM.deactivate = function () {
            console.log("staffPendEdit deactive")
        }


        selfVM.detached = function () {
            console.log("staffPendEdit detached")
        }
        return selfVM;

    });



    //
    /*
     var subData = {
                    'C3_542058915408': '',//1级企业编号
                    'C3_542062213811': '',//员工工号
                    'C3_541450807755': '',//员工姓名
                    'C3_549036811852': selfVM.model.zuzhang().C3_511299354239,// 组长工号 
                    'C3_541450790021': selfVM.model.zuzhang().C3_511297180036,// 组长编号 
                    'C3_541450797951': selfVM.model.zuzhang().C3_511297363801,//组长 
                    'C3_549036828477': selfVM.model.zhuguan().C3_511299354239,// 主管工号 
                    'C3_541467332510': selfVM.model.zhuguan().C3_511297180036,// 主管编号 
                    'C3_541467332728': selfVM.model.zhuguan().C3_511297363801,// 主管 
                    'C3_549036840539': selfVM.model.jinli().C3_511299354239,// 经理工号 
                    'C3_541467368324': selfVM.model.jinli().C3_511297180036,//  经理编号 
                    'C3_541467363607': selfVM.model.jinli().C3_511297363801,//   经理 
                }
    */