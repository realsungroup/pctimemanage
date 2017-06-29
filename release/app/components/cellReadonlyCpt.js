var ko = require('knockout');

ko.components.register('cellCategoryReadonly', {
    viewModel: function(params) {
        // this.text = ko.observable(params && params.initialText || '');
        this.title = params && params.title || '';
    },
    template:`<div class="form-group">
        <label for="" class="col-sm-2 col-md-2 col-lg-2 control-label">申请类别</label>
        <div class=" col-sm-10 col-md-10 col-lg-10 dropdown">
            <input type="text" data-bind="value:title" readonly class="form-control" />
        </div>
    </div>`
});
 

 ko.components.register('cellStartTimeReadonlyCpt', {
    viewModel: function(params) {
        this.title = params && params.title || '';
    },
    template:`<div class="form-group">
        <label for="" class="col-sm-2 col-md-2 col-lg-2 control-label">开始时间</label>
        <div class=" col-sm-10 col-md-10 col-lg-10">
            <input type="text" data-bind="value:title" readonly class="form-control" />
        </div>
    </div>`
});
 
ko.components.register('cellEndTimeReadonlyCpt', {
    viewModel: function(params) {
        this.title = params && params.title || '';
    },
    template:`<div class="form-group">
        <label for="" class="col-sm-2 col-md-2 col-lg-2 control-label">结束时间</label>
        <div class=" col-sm-10 col-md-10 col-lg-10">
            <input type="text" data-bind="value:title" class="form-control" readonly/>
        </div>
    </div>`
});
 
ko.components.register('cellNoticeCpt', {
    viewModel: function(params) {
        this.title = params && params.title || '';
    },
    template:`<div class="form-group">
        <label for="" class="col-sm-2 col-md-2 col-lg-2 control-label">注意事项</label>
        <div class=" col-sm-10 col-md-10 col-lg-10">
            <p class="form-control height-auto" data-bind="text:title"></p>
        </div>
    </div>`
});

ko.components.register('cellApprovePersonCpt', {
    viewModel: function(params) {
        this.title = params && params.title || '';
    },
    template:`<div class="form-group">
        <label for="" class="col-sm-2 col-md-2 col-lg-2 control-label">审批人</label>
        <div class=" col-sm-10 col-md-10 col-lg-10">
            <input type="text" class="form-control" data-bind="value:title" readonly/>
        </div>
    </div>`
});
 
ko.components.register('cellTimeLenghtReadonlyCpt', {
    viewModel: function(params) {
        this.title = params && params.title || '';
    },
    template:`<div class="form-group" data-bind="visible:!model.isCard()">
        <label for="" class="col-sm-2 col-md-2 col-lg-2 control-label">时长</label>
        <div class=" col-sm-10 col-md-10 col-lg-10 input-group padding-lf-12">
             <input type="text" class="form-control" data-bind="value:title" readonly/>
        </div>
    </div>
    </div>`
});
 
 