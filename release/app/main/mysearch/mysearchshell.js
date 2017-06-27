define(['knockout','plugins/router','main/mysearch/viewmodels/mySearchCommon'], function (ko,router) {

    var searchRouteArr = [
            { 
                "route": ["","mysearch1/:action/resid/:resid/recid/:recid"],
                "title":"当月排班",
                "resid":"543666594803",
                "moduleId":"viewmodels/mysearch1",
                "hash": "#mysearch/mysearch1/list/resid/0/recid/0",
                "nav": true ,
                "iconCls":"icon icon-settings",
                "type":"myworkpage"
                 
            },
            {
               "route": ["","mysearch2/:action/resid/:resid/recid/:recid"],
                "title":"考勤日报",
                "resid":"543666594803",
                "moduleId":"viewmodels/mysearch2",
                "hash": "#mysearch/mysearch2/list/resid/0/recid/0",
                "nav": true ,
                "iconCls":"icon icon-settings",
                "type":"myworkpage"
            },
            {
                "route": ["","mysearch3/:action/resid/:resid/recid/:recid"],
                "title":"考勤月报",
                "resid":"543666672286",
                "moduleId":"viewmodels/mysearch3",
                "hash": "#mysearch/mysearch3/list/resid/0/recid/0",
                "nav": true ,
                "iconCls":"icon icon-settings",
                "type":"myworkpage"
            }
        ]
  var childRouter2 = router.createChildRouter()
        .makeRelative({
            moduleId:'mysearch',
            fromParent:true
        }).map(searchRouteArr).buildNavigationModel();
        appConfig.app.mysearchshell=  {
               activate:function () {
                         
                           appConfig.app.workbaseshell =this;
                         
               },
                router: childRouter2,  
                attached:function(){
                   
                },
                getCurroute:function(that){
                    var strmoduleid=that.__moduleId__;
                    //根据路由模块id查询当前路由
                    var curRoute=this.router.routes.filter(function(route){return route.moduleId==strmoduleid})[0];
                    
                           
                    return curRoute;
                    
                },
                setSubtitle:function(title)
                {
                    //刷新当前子标题
                    this.subtitle(title);
                },
                subtitle:ko.observable(""),
               
                mySearchRouter: ko.computed(function() {
                        return ko.utils.arrayFilter(childRouter2.navigationModel(), function(route) {
                         return route.type == 'myworkpage';
                    });
        })
              
        }; 
      return   appConfig.app.mysearchshell;
}); 