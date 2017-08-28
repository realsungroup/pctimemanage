define(['durandal/app',
    'knockout',
    'plugins/router',
    'httpServiceRE',
    'components/headerCpt',
    'components/cellMainCpt',
    'untilRE'],
    function (app, ko, router, httpService, hCpt, cellCpt, ut) {
        var selfVM = {};
        selfVM.activate = function () {
            selfVM.model = {
                "subTitle": '',
                "oldPW": '',
                "newPW": '',
                "sureNewPW": ''
            }
        }

        selfVM.changePassWordClick = function () {
            if (!confirmPassWord(selfVM.model.newPW, selfVM.model.sureNewPW)) return;
            var params = {
                'OldPass': selfVM.model.oldPW,
                'NewPass1': selfVM.model.newPW
            }
            httpService.changePassWord(params, function (data) {
                cmAlert("修改密码成功，请重新登录！");
                router.deactivate();
                router.reset();
                app.setRoot('login');
                window.location.hash = "#applying";
            }, function (err) {

            })
        }

        function confirmPassWord(newPW, sureNewPW) {
            if (!newPW.length && !sureNewPW.length) {
                cmAlert("请输入新密码！");
                return false;
            }

            if (newPW == sureNewPW) {
                return true;
            } else {
                cmAlert("两次输入的密码不一致！");
                return false;
            }
        }

        return selfVM
    }); 