(function() {
    'use strict';

    angular
        .module('app.query', [])
        .controller('QueryCtrl', QueryCtrl);

    QueryCtrl.$inject = ['dataService', 'defaultDate'];
    function QueryCtrl(dataService, defaultDate) {
        var vm = this;
        vm.loading = true;
        vm.query_type = '';
        vm.query_word = '';
        vm.songs = [];
        vm.refresh = refresh;
        activate();

        ////////////
        function activate() {
            vm.query_type = 'stream_date';
            vm.query_word = defaultDate;
            vm.refresh();
        }

        function refresh() {
            vm.loading = true;
            vm.songs = [];
            dataService.songList(vm.query_type, vm.query_word).then(successCallback, errorCallback);
        }

        function successCallback(res) {
            vm.songs = res.data.songs;
            vm.query_type = res.data.query_type;
            vm.query_word = res.data.query_word;
            vm.loading = false;
        }

        function errorCallback() {
            vm.songs = [];
            vm.query_type = 'stream_date';
            vm.query_word = '';
            vm.loading = false;
        }
    }
})();
