define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','editbase','durandal/system','editform','durandal/binder'], 
    function (app,ko,router,dialog,jquery,editbase,system,editform,binder) {
     
    var mysearch3=new myworkbase();
    mysearch3.registerBasepath("#mysearch/mysearch3");
   
       mysearch3.activate=function(action,resid,recid,e){
            system.log("test rows-------");
            system.log(mysearch3.rows());
            mysearch3._activate(action,resid,recid,editform,this,e);
            mysearch3.setPagesize(1);
            mysearch3.pagestep=mysearch3.getPagesize();
            
            if ( appConfig.app.dbs!==null){ if (mysearch3.rows().length==0){ mysearch3.pageIndexChanged(mysearch3.pageIndex);}}
           
           
       };
 
//compositionComplete
       mysearch3.compositionComplete=function(view){
           mysearch3._compositionComplete(view,mysearch3);
  
       };
//binding
       mysearch3.binding= function (view) {
              
        
            return { cacheViews:false }; //cancels view caching for this module, allowing the triggering of the detached callback
        };
//bindingComplete
        mysearch3.bindingComplete= function (view) {
            
        };
//attached
        mysearch3.attached=function(){
             
          
            this._attached();
           
           
              
        }
return mysearch3;
});