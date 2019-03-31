(function() {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'app.home',
            'app.query',
            'app.rank'
        ])
        .config(config);

    config.$inject = ['$locationProvider', '$routeProvider'];
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/home', {
                templateUrl: '/views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/query', {
                templateUrl: '/views/query.html',
                controller: 'QueryCtrl',
                controllerAs: 'vm',
                resolve: {
                    defaultDate: defaultDate
                }
            })
            .when('/rank', {
                templateUrl: '/views/rank.html',
                controller: 'RankCtrl',
                controllerAs: 'vm'
            })
            .when('/rank/:year', {
                templateUrl: '/views/rank.html',
                controller: 'RankCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }

    function defaultDate(dataService) {
        return dataService.lastStreamDate().then(successCallback, errorCallback);

        function successCallback(res) {
            return res.data;
        }

        function errorCallback() {
            var today = new Date().toISOString().substring(0,10);
            return today;
        }
    }
})();
