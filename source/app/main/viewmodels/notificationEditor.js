define(['durandal/app',
    'knockout',
    'plugins/router',
    'httpServiceRE',
    'mobiscroll',
    'commonRE',
    'untilRE',
    'components/cellReadonlyCpt', 'components/cellEditCpt',
    'photoswipeRE/photoswipe-ui-default.min', 'photoswipeRE/photoswipe.min', 'wangEditorRE'],
    function (app, ko, router, httpService, mobi, co, ut, cellReadonly, cellEdit, PhotoSwipeUI_Default, PhotoSwipe, E) {

        var selfVM = {}

        selfVM.model.title = '考勤员查询';
        selfVM.model.subTitle = '考勤日报';
        selfVM.model.editorContent = '';

        selfVM.attached = function () {

            // 创建编辑器
            var editor = new E('#editor')
            // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
            editor.customConfig.onchange = html => {
                selfVM.model.editorContent = html;
            }
            editor.create()
        }

        return selfVM;
    }); 