define(['durandal/app','knockout','durandal/system'], function (app,ko,system) {  
      return  {
            activate:function () { 
                  appConfig.app.pageType="mysearch4";
            },
            binding: function () {
            system.log('Lifecycle : binding : hello');
            return { cacheViews:false }; //cancels view caching for this module, allowing the triggering of the detached callback
             },
              detached: function (view) {
            system.log('Lifecycle : detached : hello');
        },
            attached:function(){
                  kqjs=function(jsDate){
                        var py,pm,pd,ay,am,ad;
                        if(jsDate.slice(jsDate.length-2)=="01"){
                              py=jsDate.substr(0, 4)-1;
                              pm=12;
                              pd=16;
                              ay=jsDate.substr(0, 4);
                              am=01;
                              ad=15;
                        }else{
                              py=ay=jsDate.substr(0, 4);
                              pm=jsDate.slice(jsDate.length-2)-1;
                              pd=16;
                              am=jsDate.slice(jsDate.length-2);
                              ad=15;
                        }
                        var list="<span>"+py+"年"+pm+"月"+pd+"日 ～ "+ay+"年"+am+"月"+ad+"日</span>";
                        $('#rl').html(list);
                  };
                  kqjs($('#jsDate')[0].value);
                  $('#jsDate').change(function(){
                        var jsDate=this.value;
                        kqjs(jsDate);
                  });
             }
      };
});