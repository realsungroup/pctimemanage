function getDayOptions(successCallback) {//获取时间选项
            console.log("-----------getDayOptions");
            var cmswhere = '';
            var resid = '543946502584';
            appConfig.app.dbs.dbGetdata(resid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
            function fnSuccess(data, subdata, total) {
                successCallback(data);
            }
            function fnError(data) {
                // console.log("---------->error" + data.message);
            }
            function fnSyserror(jqXHR, textStatus, errorThrown) {
                // console.log("---------->Syserror" + jqXHR.message);
            }
        }
