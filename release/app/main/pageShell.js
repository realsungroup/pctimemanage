// define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
//     var childRouter;
//     var self;

//     return {
//         router: router,
//         childRouter: childRouter,
//         tmpArr:null,
//         activate: function () {
//             self = this;

//             childRouter = router.createChildRouter()
//                 .makeRelative({
//                     fromParent: false
//                 }).map(routeList).buildNavigationModel();

//             var childRouterRoutesArr = childRouter.routes;

//             // var tmpArr = new Array();
//             // routeTypeList.forEach(function (item) {
//             //     tmpArr.push(childRouterRoutesArr.filter(function (val) {
//             //         return val.type == item;
//             //     }))
//             // })
//             self.childRouter = childRouterRoutesArr;






//         },
//         attached: function () {
//             // initApp.SmartActions();
//             // initApp.domReadyMisc();
//             // shortcut_dropdown = $('#shortcut');
//             // initApp.leftNav();
//         }
//     };
// });


define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {

    var childRouter2 = router.createChildRouter()
        .makeRelative({
            fromParent:true
        }).map(routeList).buildNavigationModel();

    var childRouterRoutesArr = [];

    var tmpArr = new Array();
    routeTypeList.forEach(function (item) {
        tmpArr.push(childRouter2.routes.filter(function (val) {
            return val.type == item;
        }))
    })
    childRouterRoutesArr = tmpArr;


    appConfig.app.mysearchshell = {
        activate: function () {

            appConfig.app.workbaseshell = this;

        },
        router: childRouter2,
        childRouterRoutesArr: childRouterRoutesArr,
        attached: function () {
            //   initApp.SmartActions();
            initApp.SmartActions();
             initApp.leftNav();
             
            initApp.domReadyMisc();
           
        },
        getCurroute: function (that) {
            var strmoduleid = that.__moduleId__;
            //根据路由模块id查询当前路由
            var curRoute = this.router.routes.filter(function (route) { return route.moduleId == strmoduleid })[0];


            return curRoute;

        },
        setSubtitle: function (title) {
            //刷新当前子标题
            this.subtitle(title);
        },
        subtitle: ko.observable(""),

        mySearchRouter: ko.computed(function () {
            return ko.utils.arrayFilter(childRouter2.navigationModel(), function (route) {
                return route.type == 'myworkpage';
            });
        })

    };
    return appConfig.app.mysearchshell;
}); 