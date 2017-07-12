
define(['knockout','plugins/router','until','photoswipe/photoswipe-ui-default.min', 'photoswipe/photoswipe.min'],
function (ko,router,ut,PhotoSwipeUI_Default, PhotoSwipe) {

    return function () {
        var self = this;
        this.model = {
            title: '我的审批',
            subTitle: '已审批',
            data: ko.observableArray(),
            vacationCategory: [],
            selectedCategory: '',
            inputVal: ko.observable(''),
            pageIndex: 0,
            noMore: false
        }

        this.activate = function (e) {
            self.init();

            //配置所有类型
            var allVacationCategory = ['全部'];
            allVacationCategory = allVacationCategory.concat(appConfig.app.vacationCategory)
            self.model.vacationCategory = ko.observable(allVacationCategory);
            self.model.selectedCategory = ko.observable(allVacationCategory[0])


            self.getData(0);
        }

        this.attached = function () {

        }


        this.deactivate = function () {
            
        }

        this.init = function () {
            self.model.noMore = false;
            self.model.pageIndex = 0;
            self.model.data([]);
        }

        //附件
        this.showAttach = function (index) {
            index = index();
            var tmpData = self.model.data()[index];

            var imgUrlArr = [tmpData.C3_541450276993, tmpData.C3_545771156108, tmpData.C3_545771157350, tmpData.C3_545771158420];
            attachShow(imgUrlArr, PhotoSwipe, PhotoSwipeUI_Default);
        }

        //类型筛选
        this.categoryFilterClick = function (index) {
            self.model.selectedCategory(self.model.vacationCategory()[index()]);
            self.getData(0);
        }

        this.goToApplyDetailPage = function (index) {
            var tmpData = self.model.data()[index()];
            var tmpJsonData = JSON.stringify(tmpData);
            router.navigate("#applyDetail?data=" + tmpJsonData);
        }

        this.kvoInput = function () {
            self.getData(0);
        }

        this.pageUp = function () {
            if (self.model.pageIndex <= 0) self.model.pageIndex = 0
            else self.model.pageIndex--;
            self.getData(1);
        }

        this.pageDown = function () {
            // var self = this;
            if (self.model.noMore) return;
            self.model.pageIndex++;
            self.getData(1);
        }

    }

});