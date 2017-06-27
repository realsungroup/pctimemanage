define(['durandal/app','knockout','plugins/router','httpService'], function (app,ko,router) {
    var self;
    return {
        data:null,
        activate:function(e){
            self = this;

        },
        attached:function(){

        },
        deactivate:function(){
            self = undefined;
        }
    };
}); 