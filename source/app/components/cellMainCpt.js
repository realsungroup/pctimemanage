var ko = require('knockout');

ko.components.register('cellMainCategory', {
    template:"<thead>\
				<tr>\
					<th>类型</th>\
					<th>开始时间</th>\
					<th>结束时间</th>\
					<th>时长</th>\
					<th>状态</th>\
					<th colspan='2'>操作</th>\
				</tr>\
			</thead>"
});

 ko.components.register('cellMainFilter', {
    viewModel: function(params) {
        this.title = params && params.title || '';
        this.subTitle = params && params.subTitle || '';
        this.isAdd = params && params.isAdd || '';
    },
    template:'<thead>\
				<tr>\
					<th>\
						<!-- Single button -->\
						<div class="btn-group">\
							<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
    <!-- ko text:title --> <!-- /ko --> <span class="caret"></span>\
  </button>\
							<ul class="dropdown-menu" data-bind="foreach:subTitle">\
								<li><a href="#" data-bind="text:$data,click:function(){$root.categoryFilterClick($index)}"></a></li>\
							</ul>\
						</div>\
					</th>\
					<th></th>\
					<th></th>\
					<th></th>\
					<th></th>\
					<th></th>\
					<th><button type="button" class="btn btn-default btn-block" data-bind="click:$root.goToAddApplying,visible:isAdd">新增</button></th>\
				</tr>\
			</thead>'
});
 
 //data主体
 ko.components.register('cellMainData', {
    viewModel: function(params) {
        this.item = params && params.item || '';
    },
    template:"<td data-bind='text:item.C3_533398158705'>1</td>\
					<td data-bind='text:item.C3_541449959569 + \"日\" + item.C3_541450006047 + item.C3_541450072499 + \":\" + item.C3_541450107087'></td>\
					<td data-bind='text:item.C3_541449974021 + \"日\" + item.C3_541450008801 + item.C3_541450084259 + \":\" + item.C3_541450125786'></td>\
					<td data-bind='text:item.C3_541449935726'></td>\
					<td data-bind='text:item.C3_533407351131'></td>"
});

 ko.components.register('cellMainSubmitBtn', {
    viewModel: function(params) {
        this.item = params && params.item || '';
    },
    template:"<td>\
						<button class='btn btn-primary btn-block' data-bind='visible:((!(item.C3_541449606438==\"Y\")&&item.C3_541449538456==\"Y\") && item.C3_545927244809 == \"Y\" ),click:function(){$root.showAttach($index)}'>附件</button>\
                            <button class='btn btn-primary btn-block' data-bind='visible:(item.C3_541449606438==\"Y\"||(item.C3_541449538456==null||item.C3_541449538456==\"N\")),click:function(){$root.submit($index)}'>提交</button>\
						</td>\
					<td>\
						<button class='btn btn-primary btn-block' data-bind='visible:(!(item.C3_541449606438==\"Y\")&&item.C3_541449538456==\"Y\"),click:function(){$root.goToApplyDetailPage($index)}'>详情</button>\
                            <button class='btn btn-primary btn-block' data-bind='visible:(item.C3_541449606438==\"Y\"||(item.C3_541449538456==null||item.C3_541449538456==\"N\")),click:function(){$root.goToEditPage($index)}'>修改</button>\
					</td>"
});

// 附件详情
 ko.components.register('cellMainAttachBtn', {
    viewModel: function(params) {
        this.item = params && params.item || '';
    },
    template:"<td>\
						<button class='btn btn-primary btn-block' data-bind='visible:((!(item.C3_541449606438==\"Y\")&&item.C3_541449538456==\"Y\") && item.C3_545927244809 == \"Y\" ),click:function(){$root.showAttach($index)}'>附件</button>\
						</td>\
					<td>\
						<button class='btn btn-primary btn-block' data-bind='click:function(){$root.goToApplyDetailPage($index)}'>详情</button>\
					</td>"
});

// 修改并提交
 ko.components.register('cellMainFixSubmitBtn', {
    viewModel: function(params) {
        this.item = params && params.item || '';
    },
    template:"<td>\
						<button class='btn btn-primary btn-block' data-bind='click:function(){$root.goToFixSubmitPage($index)}'>修改</button>\
					</td>"
});

// 历史记录状态
 ko.components.register('cellMainHistoryState', {
    viewModel: function(params) {
        this.item = params && params.item || '';
    },
    template:"<td data-bind='text:item.C3_545948501137'>\
					</td>"
});

// 审批中搜索栏
 ko.components.register('cellMainFilterSearch', {
    viewModel: function(params) {
        this.title = params && params.title || '';
        this.subTitle = params && params.subTitle || '';
        this.inputVal = params && params.inputVal || '';
        this.allSelected = params && params.allSelected || '';
        this.isPend = params && params.isPend || '';
    },
    template:'<thead>\
				<tr>\
					<th>\
						<!-- Single button -->\
						<div class="btn-group">\
							<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
    <!-- ko text:title --> <!-- /ko --> <span class="caret"></span>\
  </button>\
							<ul class="dropdown-menu" data-bind="foreach:subTitle">\
								<li><a href="#" data-bind="text:$data,click:function(){$root.categoryFilterClick($index)}"></a></li>\
							</ul>\
						</div>\
					</th>\
					<th><input data-bind="textInput:inputVal,event:{change:$root.kvoInput}" class="form-control" /></th>\
					<th><input type="checkbox" data-bind="checked:allSelected,event:{change:$root.selectAllChange},visible:isPend" /></th>\
					<th></th>\
					<th></th>\
					<th></th>\
					<th><button class="btn btn-primary btn-block" data-bind="click:$root.approve,visible:isPend">审批</button></th>\
				</tr>\
			</thead>'
});

// 审判中退回按钮组
 ko.components.register('cellMainRefuseBtn', {
    viewModel: function(params) {
        this.item = params && params.item || '';
    },
    template:"<td>\
                <button class='btn btn-primary btn-block' data-bind='visible:((!(item.C3_541449606438==\"Y\")&&item.C3_541449538456==\"Y\") && item.C3_545927244809 == \"Y\" ),click:$root.newp'>附件</button>\
                </td>\
            <td>\
                <button class='btn btn-primary btn-block' data-bind='click:function(){$root.goToApplyDetailPage($index)}'>退回</button>\
            </td>\
            <td>\
                <input type='checkbox' data-bind='checked:item.selected' />\
            </td>"
});



//分页
 ko.components.register('pageSelectCpt', {
    viewModel: function(params) {
        this.item = params && params.item || '';
    },
    template:'<nav aria-label="Page navigation">\
  <ul class="pagination">\
    <li data-bind="click:$root.pageUp">\
      <a href="#" onclick="return false;" aria-label="Previous">\
        <span aria-hidden="true">&laquo;</span>\
      </a>\
    </li>\
    <li data-bind="click:$root.pageDown">\
      <a href="#" onclick="return false;"  aria-label="Next">\
        <span aria-hidden="true">&raquo;</span>\
      </a>\
    </li>\
  </ul>\
</nav>'
});
