
requirejs.config({
    paths: {
        'httpServiceRE':"../app/httpService/httpService",
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0',
        // 'jQuery':'../lib/jquery/jquery-1.9.1',
        'jquery':'../lib/jquery/jquery-1.9.1',
        'realsun': '../lib/realsun/js',
        'calendar': '../lib/fullcalendar',
        'components':'components',
        'mobiscroll':'../lib/mobiscorll/mobiscroll.custom-3.0.0-beta2.min',
        'commonRE':'../app/common/common',
        'untilRE':'until/until',
        'photoswipeRE':'../lib/photoswipe',
        'baseVM':'main/base/baseViewModel'
        
    }
     
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator','realsun/common','plugins/dialog' ],  function (system, app, viewLocator,common) {
  
    app.title = 'HRM';
    app.configurePlugins({
        router:true,
        dialog: true
    });
  
    app.start().then(function() {
        viewLocator.useConvention();
         $.getJSON("app.config.json",function(data,textStatus,hr){
         appConfig=data;
         appConfig.appfunction=appfunctions;
        
         system.debug(appConfig.app.debug);
         system.log(appConfig);
        //    if (!CheckLODOPIsInstall())
        //     {
        //         appConfig.app.setupprinter=false;
        //     }
        //     if (appConfig.app.setupprinte)
        //     {
        //        appConfig.app.LODOP =getLodop();
        //     }.
         initApp.SmartActions();
            initApp.leftNav();
            
            initApp.domReadyMisc();
         app.setRoot('login', 'entrance');});
        // app.setRoot('shell', 'entrance');});
        
        

    });

});










