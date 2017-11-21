define(['durandal/app', 'knockout', 'plugins/router', 'components/headerCpt', 'httpServiceRE', 'baseVM', 'components/cellMainCpt', 'main/viewmodels/staffPendEdit', 'xlsxRE'],
    function (app, ko, router, headerCpt, httpService, baseVM, cellMainCpt, staffPendEdit, xlsxRE) {

        var selfVM = new baseVM();
        selfVM.model.title = '员工审批'
        selfVM.model.subTitle = '员工审批定义';

        var dataMap = {
            'C3_549036828477': '主管工号',
            'C3_549036811852': '组长工号',
            'C3_549036840539': '经理工号',
            'C3_542074129459': '产线编号',
            'C3_541450807511': '员工编号',
            'C3_542058915408': '1级企业编号',
            'C3_541468317577': '产线',
            'C3_542062213811': '员工工号',
            'C3_542071636659': '系统员工姓名',
            'C3_541450807755': '员工姓名',
            'C3_541450797951': '组长',
            'C3_541467332728': '主管',
            'C3_541467363607': '经理'
        }

        selfVM.getData = function (type) {
            var self = selfVM;
            var param = {
                'subresid': '',
                'cmswhere': "",
                'key': self.model.inputVal() ? self.model.inputVal() : ''
            }

            param.pageSize = 10;
            if (!type) {//刷新
                param.pageIndex = 0;

            } else {//加载
                param.pageIndex = self.model.pageIndex;
            }

            selfVM.model.isLoading = true;
            httpService.getAllStaffPendData(param, function (data) {

                if (data && data.data) {
                    var dataArr = data.data;
                    self.model.data(dataArr);

                    //设置页标（base中）
                    self.setPageMark(param, data);


                    if (dataArr.length < param.pageSize) self.model.noMore = true;
                    else self.model.noMore = false;

                }
                selfVM.model.isLoading = false;
            }, function () {
                selfVM.model.isLoading = false;
            });
        }

        selfVM.editClick = function (index) {
            index = index();
            var tmpData = selfVM.model.data()[index];
            staffPendEdit.propData = tmpData;

            // staffPendEdit.saveSuccessBlock = function (data) {
            //     tmpData = data;
            //     selfVM.model.data(selfVM.model.data());
            // };
            router.navigate("#staffPendEdit");
        }

        selfVM.addClick = function () {
            staffPendEdit.saveSuccessBlock = function (data) {
                selfVM.model.pageIndex = 0;
                // var tmpData = selfVM.model.data();
                // tmpData.push(data);
                // selfVM.model.data(tmpData);
            };
            router.navigate("#staffPendEdit");
        }

        var wb;//读取完成的数据
        var rABS = false; //是否将文件读取为二进制字符串

        selfVM.readExcel = function (t, event) {

            if (!event.target.files) {
                return;
            }
            var f = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                if (rABS) {
                    wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                        type: 'base64'
                    });
                } else {
                    wb = XLSX.read(data, {
                        type: 'binary'
                    });
                }
                var excelData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                excelData = checkExcelDataMap(excelData);

                if (excelData.length > appConfig.app.excelUploadCount) alert("数据量过大，100条以内");
                else if (!excelData.length) alert("数据长度为0");
                else {
                    let params = {
                        "data": excelData,
                        "uniquecolumns":"C3_542058915408,C3_542062213811"
                    }
                    httpService.addMorePendPerson(params, function (data) {
                        console.info('addMorePendPerson', data);
                        if(data && (data.error == 0 || data.Error == 0)){
                            cmAlert("上传成功");
                        }else cmAlert(data.message || "失败");
                    }, function (error) {
                        cmAlert("上传错误");
                        // console.info('addMorePendPerson', error)
                    })
                }
                //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                //wb.Sheets[Sheet名]获取第一个Sheet的数据
                //document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
            };
            if (rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        }

        function fixdata(data) { //文件流转BinaryString
            var o = "",
                l = 0,
                w = 10240;
            for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
        }

        function checkExcelDataMap(data) {
            if (Array.isArray(data) && data.length > 0) {
                let firstObj = data[0];
                for (var key in firstObj) {
                    if (dataMap[key] != firstObj[key]) return [];
                }
                data.splice(0, 1);
                return data
            } else return [];
        }

        return selfVM;

    });