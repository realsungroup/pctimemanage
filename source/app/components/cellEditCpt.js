var ko = require('knockout');

ko.components.register('cellReasonEdit', {
    viewModel: function(params) {
        this.title = params && params.title || '';
    },
    template:"<div class='form-group'>\
        <label for='' class='col-sm-2 col-md-2 col-lg-2 control-label'>事由</label>\
        <div class=' col-sm-10 col-md-10 col-lg-10'>\
            <!--<input type='text' class='form-control' />-->\
            <textarea class='form-control' data-bind='value:title' rows='3'></textarea>\
        </div>\
    </div>"
});