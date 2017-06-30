var ko = require('knockout');

ko.components.register('cellCategoryReadonly', {
    viewModel: function(params) {
        // this.text = ko.observable(params && params.initialText || '');
        this.title = params && params.title || '';
    },
    template:"<div class='form-group'>\
        <label for='' class='col-sm-2 col-md-2 col-lg-2 control-label'>申请类别</label>\
        <div class=' col-sm-10 col-md-10 col-lg-10 dropdown'>\
            <input type='text' data-bind='value:title' readonly class='form-control' />\
        </div>\
    </div>"
});
 

 ko.components.register('cellStartTimeReadonlyCpt', {
    viewModel: function(params) {
        this.title = params && params.title || '';
    },
    template:"<div class='form-group'>\
        <label for='' class='col-sm-2 col-md-2 col-lg-2 control-label'>开始时间</label>\
        <div class=' col-sm-10 col-md-10 col-lg-10'>\
            <input type='text' data-bind='value:title' readonly class='form-control' />\
        </div>\
    </div>"
});
 
ko.components.register('cellEndTimeReadonlyCpt', {
    viewModel: function(params) {
        this.title = params && params.title || '';
    },
    template:"<div class='form-group'>\
        <label for='' class='col-sm-2 col-md-2 col-lg-2 control-label'>结束时间</label>\
        <div class=' col-sm-10 col-md-10 col-lg-10'>\
            <input type='text' data-bind='value:title' class='form-control' readonly/>\
        </div>\
    </div>"
});
 
ko.components.register('cellNoticeCpt', {
    viewModel: function(params) {
        this.title = params && params.title || '';
    },
    template:"<div class='form-group'>\
        <label for='' class='col-sm-2 col-md-2 col-lg-2 control-label'>注意事项</label>\
        <div class=' col-sm-10 col-md-10 col-lg-10'>\
            <p class='form-control height-auto' data-bind='text:title'></p>\
        </div>\
    </div>"
});

ko.components.register('cellApprovePersonCpt', {
    viewModel: function(params) {
        this.title = params && params.title || '';
    },
    template:"<div class='form-group'>\
        <label for='' class='col-sm-2 col-md-2 col-lg-2 control-label'>审批人</label>\
        <div class=' col-sm-10 col-md-10 col-lg-10'>\
            <input type='text' class='form-control' data-bind='value:title' readonly/>\
        </div>\
    </div>"
});
 
ko.components.register('cellTimeLenghtReadonlyCpt', {
    viewModel: function(params) {
        this.title = params && params.title || '';
        this.isShow = params && params.isShow || '';
    },
    template:"<div class='form-group' data-bind='visible:isShow'>\
        <label for='' class='col-sm-2 col-md-2 col-lg-2 control-label'>时长</label>\
        <div class=' col-sm-10 col-md-10 col-lg-10 input-group padding-lf-12'>\
             <input type='text' class='form-control' data-bind='value:title' readonly/>\
        </div>\
    </div>"
});

//选择文件
 ko.components.register('cellCameraCpt', {
    viewModel: function(params) {
        this.item = params && params.item || '';
    },
    template:`<div class="form-group" data-bind="visible:item[0]">\
        <label for="" class="col-sm-2 col-md-2 col-lg-2 control-label " data-bind="text:item[2]"></label>\
        <div class=" col-sm-10 col-md-10 col-lg-10 input-group padding-lf-12">\
            <input type="text" class="form-control" data-bind="value:item[1]" readonly aria-describedby="aria-time" />\
            <span class="input-group-addon" id="aria-time">\
                <input id="uploaderInput" class="weui-uploader__input"  data-bind="event:{change:function(data,event){$root.selectImgChange($index,data,event)}}" type="file" accept="image/*"/>\
                选择文件</span>\
        </div>\
    </div>`
});
 
 //附件
 ko.components.register('cellAttachCpt', {//\"http://kingofdinner.realsun.me:8081/rispweb/upfiles/552058584375.png\"
    viewModel: function(params) {
        this.srcs = params && params.srcs || '';
    },
    template:"<div class='form-group'>\
        <div class='weui-uploader__bd'>\
            <ul class='weui-uploader__files' id='uploaderFiles' data-bind='foreach:srcs'>\
                 <li class='weui-uploader__file' data-bind='style:{backgroundImage:\"url(\"+ $data + \")\"},click:function(){$root.imgClick($index)}'></li>\
            </ul>\
        </div>\
    </div>"
});
 



 //退回
  ko.components.register('cellRefuseCpt', {
    viewModel: function(params) {
        this.title = params && params.title || '';
        this.subTitle = params && params.subTitle || '';
        this.reason = params && params.reason || '';
    },
    template:"<div class='form-group'>\
        <label class='col-sm-2 col-md-2 col-lg-2 control-label'>退回操作</label>\
        <div class='col-sm-10 col-md-10 col-lg-10 input-group padding-lf-12'>\
            <select  class='form-control' data-bind='options: title, value: subTitle'>\
            </select>\
            <span class='input-group-addon' id='aria-time' data-bind='click:$root.refuseClick'>\
                退回\
                </span>\
         </div>\
        </div>\
        <div class='form-group' data-bind='visible:subTitle() == \"其他\"'>\
            <label for='' class='col-sm-2 col-md-2 col-lg-2 control-label'>退回理由</label>\
            <div class=' col-sm-10 col-md-10 col-lg-10 input-group padding-lf-12'>\
                <input type='text' class='form-control' data-bind='textInput:reason' />\
            </div>\
        </div>"
});


//保存提交按钮
ko.components.register('cellSubmitBtnCpt', {
    viewModel: function(params) {
        // this.srcs = params && params.srcs || '';
    },
    template:`<div class="from-group">
          <button class="form-control w45 tjb lf" data-bind="click:function(){$root.saveOrsubmitClick('submit')}">提交</button>
          <button class="form-control w45 ccg rf" data-bind="click:function(){$root.saveOrsubmitClick('save')}">保存</button> 
    </div>`
});

//撤销按钮
ko.components.register('cellCancelBtnCpt', {
    viewModel: function(params) {
        // this.srcs = params && params.srcs || '';
    },
    template:`<div class="from-group">
        <button class="form-control w45 ccg rf" data-bind="click:$root.cancelClick">撤销</button>
    </div>`
});

//浏览图片
ko.components.register('cellPictureCpt', {
    viewModel: function(params) {
        this.src = params && params.src || '';
    },
    template:`<div class="weui-gallery" id="gallery" data-bind="click:$root.galleryClick">
            <span class="weui-gallery__img" id="galleryImg" data-bind="style:{backgroundImage:'url('+ src + ')'}" >
            </span>
</div><div class="weui-gallery" id="gallery" data-bind="click:$root.galleryClick">
            <span class="weui-gallery__img" id="galleryImg" data-bind="style:{backgroundImage:'url('+ src + ')'}" >
            </span>
</div>`
});

//审批流
ko.components.register('cellPendPersonCpt', {
    viewModel: function(params) {
        this.item = params && params.item || '';
    },
    template:`<div class="form-group">
        <label for="" class="col-sm-2 col-md-2 col-lg-2 control-label">审批流</label>
        <div class="col-sm-10 col-md-10 col-lg-10" data-bind="foreach:item">
        <div class="pendend-cell">
            <image data-bind="attr:{src:C3_543790707188}" class="pended-process"></image>
            <div class="pended-process-person" data-bind="text:C3_541450392920"></div>
            <image data-bind="attr:{src:C3_541450438440}" class="pended-process-state"></image>
            <div class="pended-process-date" data-bind="text:C3_541450449702 ? C3_541450449702 : '未审核'"></div>
        </div>
        </div>
    </div>`
});

