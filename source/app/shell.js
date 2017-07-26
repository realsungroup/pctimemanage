define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
    return {
        data:{
            userName:appConfig.app.userInfo.Data
        },
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

            

            
        },
        logoutClick:function(){
               


                // ask verification
					$.SmartMessageBox({
						title : "<i class='fa fa-sign-out txt-color-orangeDark'></i> 退出 <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
						content :"您的账户即将退出",
						buttons : '[取消][确定]'
			
					}, function(ButtonPressed) {
						// $.root_.addClass('animated fadeOutUp');
                        // $.root_.addClass('animated fadeOutUp');
						if (ButtonPressed == "确定") {
							 router.deactivate();
                            router.reset();
                            app.setRoot('login')
                            window.location.hash = "#applying";
						}
					});
            
        },
        toggleMenu: function(){
			    	if (!$.root_.hasClass("menu-on-top")){
						$('html').toggleClass("hidden-menu-mobile-lock");
						$.root_.toggleClass("hidden-menu");
						$.root_.removeClass("minified");
			    	//} else if ( $.root_.hasClass("menu-on-top") && $.root_.hasClass("mobile-view-activated") ) {
			    	// suggested fix from Christian Jäger	
			    	} else if ( $.root_.hasClass("menu-on-top") && $(window).width() < 979 ) {	
			    		$('html').toggleClass("hidden-menu-mobile-lock");
						$.root_.toggleClass("hidden-menu");
						$.root_.removeClass("minified");
			    	}
			    }
    };
});