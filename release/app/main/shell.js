define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
    return {
        router: router,
        search: function () {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map(routeList).buildNavigationModel();

            // router.routes
            var tmpArr = new Array();
            routeTypeList.forEach(function (item) {
                tmpArr.push(router.routes.filter(function (val) {
                    return val.type == item;
                }))
            })
            router.routes = tmpArr;

            return router.activate();
        },
        attached: function () {
            initApp.SmartActions();
            initApp.domReadyMisc();
            shortcut_dropdown = $('#shortcut');
            initApp.leftNav();
        }
    };
});