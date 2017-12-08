
requirejs.config({
    paths: {
        'httpServiceRE': "../lib/service/httpService",
        'text': '../lib/require/text',
        'durandal': '../lib/durandal/js',
        'plugins': '../lib/durandal/js/plugins',
        'transitions': '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'jqueryUI': '../js/libs/jquery-ui-1.10.3.min',
        'realsun': '../lib/realsun/js',
        'calendar': '../lib/fullcalendar',
        'components': 'components',
        'mobiscroll': '../lib/mobiscorll/mobiscroll.custom-3.0.0-beta2.min',
        'commonRE': '../lib/common1/common2',
        'untilRE': '../lib/until/untilFun',
        'photoswipeRE': '../lib/photoswipe',
        'baseVM': '../lib/base/baseViewModel',
        'ifvisibleRE': '../lib/ifvisible/ifvisible.min',
        'configSeed': '../js/app.config.seed',
        'smartNot': '../js/notification/SmartNotification.min',
        'bootstrapRE': '../lib/bootstrap/js/bootstrap.min',
        'appSeedRE': '../js/app.seed',
        'dayWorkReportModel': '../lib/models/dayWorkReportModel',
        'FileSaverRE': '../lib/FileSaver/FileSaver.min',
        'wangEditorRE': '../lib/wangEditor/wangEditor.min',
        'xlsxRE': '../lib/xlsx/xlsx.full.min'

    },

    shim: {
        'configSeed': {
            deps: ['jquery'],
            exports: 'configSeed'
        },
        'appSeedRE': {
            deps: ['jquery'],
            exports: 'appSeedRE'
        },
        'smartNot': {
            deps: ['jquery'],
            exports: 'smartNot'
        },
        'bootstrapRE': {
            deps: ['jqueryUI'],
            exports: 'bootstrapRE'
        },
        'jqueryUI': {
            deps: ['jquery'],
            exports: 'jqueryUI'
        },
        'FileSaverRE': {
            exports: 'FileSaverRE'
        },
        'xlsxRE': {
            exports: 'xlsxRE'
        }
    }


});

define(['durandal/system', 'plugins/router', 'durandal/app', 'durandal/viewLocator', 'realsun/common', 'plugins/dialog', 'ifvisibleRE',
    'configSeed', 'smartNot', 'appSeedRE', 'jqueryUI', 'bootstrapRE'],
    function (system, router, app, viewLocator, common, dialog, ifvisible) {


        app.title = '考勤管理';
        app.configurePlugins({
            router: true,
            dialog: true
        });

        // ifvisible.setIdleDuration(globActiveDuration);
        // ifvisible.on("idle", function () {
        //     console.log(" shut down invoke")
        //     appConfig.app.userInfo = undefined;
        //     globBadgeno = undefined;

        //     router.deactivate();
        //     router.reset();
        //     app.setRoot('login')
        //     window.location.hash = "#applying";

        // });

        app.start().then(function () {
            window.location.hash = "#applying";

            viewLocator.useConvention();
            $.getJSON("app.config.json", function (data, textStatus, hr) {
                appConfig = data;
                appConfig.appfunction = appfunctions;

                system.debug(appConfig.app.debug);
                system.log(appConfig);

                // if(localDebug) app.setRoot('main/viewmodels/changePassWord', 'entrance');
                // else 
                    app.setRoot('login', 'entrance');
            });

        });

    });










