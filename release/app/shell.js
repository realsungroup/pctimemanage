define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
    return {
        router: router,
        routersModel:ko.observableArray(),
        search: function () {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map(routeList).buildNavigationModel();

            var tmpArr = new Array();
            routeTypeList.forEach(function (item) {
                tmpArr.push(router.routes.filter(function (val) {
                    if(val.hash == '#') return false;
                    return val.type == item;
                }))
            })
            this.routersModel(tmpArr);

            return router.activate();
        },
        attached: function () {
            initApp.SmartActions();
            initApp.leftNav();
            initApp.domReadyMisc();
        }
    };
});