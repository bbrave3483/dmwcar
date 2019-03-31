(function() {
    'use strict';

    angular
        .module('app')
        .filter('translate', translate)
        .filter('timeformat', timeformat);

    function translate() {
        return function(input) {
            return (input=='all')?'不限時間':(input+'年');
        };
    }

    function timeformat() {
        return function(input) {
            var f = '00:00';
            if (!isNaN(input)) {
                var m = Math.floor(input/60);
                var s = Math.floor(input%60);
                f = (m<10?'0':'')+m+':'+(s<10?'0':'')+s;
            }
            return f;
        };
    }
})();
