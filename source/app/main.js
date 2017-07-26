
requirejs.config({
    paths: {
        'httpServiceRE': "../lib/service/httpService",
        'text': '../lib/require/text',
        'durandal': '../lib/durandal/js',
        'plugins': '../lib/durandal/js/plugins',
        'transitions': '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'jqueryUI':'../js/libs/jquery-ui-1.10.3.min',
        'realsun': '../lib/realsun/js',
        'calendar': '../lib/fullcalendar',
        'components': 'components',
        'mobiscroll': '../lib/mobiscorll/mobiscroll.custom-3.0.0-beta2.min',
        'commonRE': '../lib/common1/common2',
        'untilRE': '../lib/until/untilFun',
        'photoswipeRE': '../lib/photoswipe',
        'baseVM': '../lib/base/baseViewModel',
        'ifvisibleRE': '../lib/ifvisible/ifvisible.min',
        'configSeed':'../js/app.config.seed',
        'smartNot':'../js/notification/SmartNotification.min',
        'bootstrapRE':'../js/bootstrap/bootstrap.min',
        'appSeedRE':'../js/app.seed'

    }


});

define(['durandal/system', 'plugins/router', 'durandal/app', 'durandal/viewLocator', 'realsun/common', 'plugins/dialog', 'ifvisibleRE',
        'configSeed','smartNot','bootstrapRE','appSeedRE','jqueryUI'],
    function (system, router, app, viewLocator, common, dialog, ifvisible) {


        app.title = '考勤管理';
        app.configurePlugins({
            router: true,
            dialog: true
        });


        ifvisible.setIdleDuration(globActiveDuration);
        ifvisible.on("idle", function () {
            appConfig.app.userInfo = undefined;
            globBadgeno = undefined;

            router.reset();
            router.deactivate();
            app.setRoot('login')
             window.location.hash = "#applying";
        });

        app.start().then(function () {
            viewLocator.useConvention();
            $.getJSON("app.config.json", function (data, textStatus, hr) {
                appConfig = data;
                appConfig.appfunction = appfunctions;

                system.debug(appConfig.app.debug);
                system.log(appConfig);

                // initApp.SmartActions();
                // initApp.leftNav();
                // initApp.domReadyMisc();
                
                app.setRoot('login', 'entrance');
            });

        });

    });










