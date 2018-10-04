(function() {
    'use strict';

    angular
    .module('app')
    .directive('dmwFooter', dmwFooter);

    function dmwFooter() {
        var directive = {
            restrict: 'E',
            scope: {},
            template: '<footer><div>Last update on {{ vm.last_modify_date }}.</div><div>Copyright © 2018 by bbrave3483</div></footer>',
            controller: FooterController,
            controllerAs: 'vm'
        };
        return directive;
    }

    FooterController.$inject = ['dataService'];
    function FooterController(dataService) {
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
