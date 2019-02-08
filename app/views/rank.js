(function() {
    'use strict';

    angular
        .module('app.rank', [])
        .controller('RankCtrl', RankCtrl);

    RankCtrl.$inject = ['$routeParams', '$location', 'dataService'];
    function RankCtrl($routeParams, $location, dataService) {
        var vm = this;
        vm.loading = true;
        vm.years = ['2015', '2016', '2017', '2018', '2019'];
        vm.query_period = '';
        vm.artist_stats = [];
        vm.title_stats = [];
        vm.refresh = refresh;
        activate();

        ////////////
        function activate() {
            vm.query_period = (angular.isDefined($routeParams.year))?$routeParams.year:'all';
            if (vm.query_period!='all' && vm.years.indexOf(vm.query_period)<0) {
                $location.path('/rank');
            }
            else {
                vm.refresh();
            }
        }

        function refresh() {
            vm.loading = true;
            vm.songs = [];
            dataService.statList(vm.query_period).then(successCallback, errorCallback);
        }

        function successCallback(res) {
            vm.artist_stats = res.data.artist_stats;
            vm.title_stats = res.data.title_stats;
            vm.query_period = res.data.query_period;
            vm.loading = false;
        }

        function errorCallback() {
            vm.artist_stats = [];
            vm.title_stats = [];
            vm.query_period = 'all';
            vm.loading = false;
        }
    }
})();
