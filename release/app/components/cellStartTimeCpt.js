var ko = require('knockout');

ko.components.register('cellStartTimeCpt', {
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
 

 