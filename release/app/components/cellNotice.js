var ko = require('knockout');

ko.components.register('cellCategoryReadonly', {
    viewModel: function(params) {
        // this.text = ko.observable(params && params.initialText || '');
        this.title = ko.observable(params && params.title || '');
    },
    template:`<div class="form-group">
        <label for="" class="col-sm-2 col-md-2 col-lg-2 control-label">申请类别</label>
        <div class=" col-sm-10 col-md-10 col-lg-10 dropdown">
            <input type="text" data-bind="value:title" readonly class="form-control" />
        </div>
    </div>`
});
 

 