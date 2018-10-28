(function() {
    'use strict';

    angular
    .module('app')
    .directive('dmwFooter', dmwFooter);

    function dmwFooter() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'directives/footer.html',
            controller: FooterCtrl,
            controllerAs: 'vm'
        };
        return directive;
    }

    FooterCtrl.$inject = ['dataService'];
    function FooterCtrl(dataService) {
        var vm = this;
        vm.last_modify_date = '';
        dataService.lastModifyDate().then(successCallback, errorCallback);

        ////////////
        function successCallback(res) {
            vm.last_modify_date = res.data;
        }

        function errorCallback() {
            var today = new Date();
            vm.last_modify_date = today.toISOString().substring(0,10);
        }
    }
})();
