var ko = require('knockout');

ko.components.register('message-editor', {
    viewModel: function(params) {
        this.text = ko.observable(params && params.initialText || '');
        console.log("data------------------->" + params)
        this.data = params && params.data || ''
    },
    template: 'Message: <input data-bind="value: text" /> '
            + '(length: <span data-bind="text: text().length"></span>)'
            +'<span data-bind="text:data()[0].C3_533398158705"> </span>'
});
 