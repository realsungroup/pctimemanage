var ko = require('knockout');

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
 

 