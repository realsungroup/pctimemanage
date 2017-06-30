var ko = require('knockout');

ko.components.register('headerCpt', {
    viewModel: function(params) {
        // this.text = ko.observable(params && params.initialText || '');
        this.title = ko.observable(params && params.title || '');
		this.subTitle = ko.observable(params && params.subTitle || '');
    },
    template:"<div class='row'>\
	<div class='col-xs-12 col-sm-7 col-md-7 col-lg-4'>\
		<h1 class='page-title txt-color-blueDark'><i class='fa-fw fa fa-home'></i>\
			<!-- ko text:title-->\
			<!-- /ko -->\
		  <span data-bind='text:'>' + subTitle()'></span></h1>\
	</div>\
</div>"
});
 

 