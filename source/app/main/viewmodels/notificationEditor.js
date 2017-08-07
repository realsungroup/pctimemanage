define(['durandal/app',
    'knockout',
    'plugins/router',
    'httpServiceRE',
    'mobiscroll',
    'commonRE',
    'untilRE',
    'components/headerCpt', 'wangEditorRE'],
    function (app, ko, router, httpService, mobi, co, ut, headerCpt, E) {


        var selfVM = {}
        selfVM.model = {
            "title": '文档编辑',
            "subTitle": '编辑',
            "data":{},
            "editorContent": ko.observable(''),
            "resid": ""
        }



        selfVM.activate = function (e) {
            selfVM.model.data = {};
            selfVM.model.editorContent('');
            selfVM.model.resid = '';


            if (e && e.data) {
                selfVM.model.resid = e.data;

            }
        }

        selfVM.getData = function (resid) {
            var params = {
                "resid": resid
            }
            httpService.getReadBookData(params, function (data) {
                if (data && data.data && data.data[0]) {
                    selfVM.model.data = data.data[0];

                    var htmlCont = data.data[0].C3_544732822790;
                    selfVM.model.editorContent(htmlCont);
                }
                console.info(data);

                selfVM.createEditor();
            }, function (data) {

            });
        }

        selfVM.attached = function () {

            selfVM.getData(selfVM.model.resid);


        }

       

        selfVM.createEditor = function () {
            // 创建编辑器
            var editor = new E('#editorTool', '#editor');

            editor.customConfig.zIndex = 10;

            // 自定义菜单配置
            editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                // 'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                // 'video',  // 插入视频
                // 'code',  // 插入代码
                'undo',  // 撤销
                // 'redo'  // 重复
            ]

            //使用 onchange 函数监听内容的变化，并实时更新到 state 中
            editor.customConfig.onchange = function (html) {
                selfVM.model.data.C3_544732822790 = html;
                console.log(selfVM.model.editorOutContent);
            }

            editor.customConfig.customUploadImg = function (files, insert) {
                // files 是 input 中选中的文件列表
                // insert 是获取图片 url 后，插入到编辑器的方法

                var file = files[0];

                var xhr = new XMLHttpRequest();
                var upUrlStr = appConfig.app.uploadFileUrl + '?savepath=c:\\web\\web\\rispweb\\upfiles&httppath=' + appConfig.app.httppath;//cmAlert(upUrlStr);
                xhr.open('POST', upUrlStr);
                xhr.onload = function () {
                    var data = JSON.parse(xhr.response);
                    if (xhr.status === 200) {
                        cmAlert("上传成功");
                        var imgUrl = data.httpfilename;
                        if (localDebug) console.log(imgUrl);

                        // 上传代码返回结果之后，将图片插入到编辑器中
                        insert(imgUrl)
                    } else {
                        cmAlert('error==' + data);
                    }
                };


                var fd = new FormData();
                fd.append("file", file, 'hello.png');//新建formdata提交，png格式
                xhr.send(fd);
            }

            editor.create()
        }

        selfVM.saveClick = function(){
            var params = {
                "resid":selfVM.model.resid,
                "data":selfVM.model.data
            }
            httpService.saveReadBookData(params,function(data){
                cmAlert("保存成功");
                router.navigateBack();
            },function(data){

            })
        }

        return selfVM;
    }); 