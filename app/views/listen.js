(function() {
    'use strict';

    angular
        .module('app.listen', [
            "com.2fdevs.videogular",
            "com.2fdevs.videogular.plugins.controls",
            "com.2fdevs.videogular.plugins.overlayplay"
        ])
        .controller('ListenCtrl', ListenCtrl);

    ListenCtrl.$inject = ['$sce'];
    function ListenCtrl($sce) {
        var vm = this;
        vm.config = {
            preload: "none",
            sources: [
                { src: $sce.trustAsResourceUrl("https://dmwcar.club/audio/cover.mp3"), type: "audio/mpeg" },
            ],
            theme: {
                url: "https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css"
            }
        };
    }
})();
