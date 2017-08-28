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
                "personNum": ''
            }
        }

        selfVM.forgetPassWordClick = function () {
            if (!confirmPassWord(selfVM.model.personNum)) return;

            var params = {
                "badgeno": selfVM.model.personNum,
                "enterprisecode": enterprisecode
            }

            httpService.forgetPassWord(params, function (data) {
                cmAlert("找回密码成功，已发送到菲尼萨微信公众号，请重新登录！");
                router.deactivate();
                router.reset();
                app.setRoot('login');
                window.location.hash = "#applying";
            }, function (err) {
                cmAlert("找回密码失败！错误信息：" + JSON.stringify(err));
            })
        }

        function confirmPassWord(num) {
            if (!num.length) {
                cmAlert("请输入工号！");
                return false;
            } else return true;
        }

        return selfVM
    }); 