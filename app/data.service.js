(function() {
    'use strict';

    angular
        .module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$http'];
    function dataService($http) {
        var service = {
            lastModifyDate: lastModifyDate,
            lastStreamDate: lastStreamDate,
            songList: songList,
            statList: statList
        };
        return service;

        ////////////
        function lastModifyDate() {
            var req = {
                method: 'GET',
                url: '/api/v1/last_modify_date.php'
            };
            return $http(req);
        }

        function lastStreamDate() {
            var req = {
                method: 'GET',
                url: '/api/v1/last_stream_date.php'
            };
            return $http(req);
        }

        function songList(query_type, query_word) {
            var req = {
                method: 'POST',
                url: '/api/v1/song_list.php',
                headers: {
                'Content-Type': 'application/json'
                },
                data: {
                    'query_type': query_type,
                    'query_word': query_word
                }
            };
            return $http(req);
        }

        function statList(query_period) {
            var req = {
                method: 'POST',
                url: '/api/v1/stat_list.php',
                headers: {
                'Content-Type': 'application/json'
                },
                data: {
                    'query_period': query_period,
                }
            };
            return $http(req);
        }
    }
})();
