'use strict';

app.controller('mainController', ['$scope', '$state', '$translate', '$document', '$localStorage', '$http', '$interval', 'bowser', function ($scope, $state, $translate, $document, $localStorage, $http, $interval, bowser) {
    var storageDefaultLang = localStorage[$translate.storageKey()];
    var browserDefaultLang = $translate.preferredLanguage();

    $scope.browser = bowser.name;
    $scope.isToggle1 = false;
    $scope.isToggle2 = false;
    $scope.isActive = 0;
    $scope.isActive2 = 0;
    $scope.section7BG = 'slide1';

    $interval(function() {
        if ($scope.isActive === 0) {
            $scope.isActive = 1;    
        } else {
            $scope.isActive = 0;
        }
    }, 3000);

    if ($state.params.language == 'en') {
        this.flag = "uk";
        this.lang = "English";
    } else if ($state.params.language == 'de') {
        this.flag = "germany";
        this.lang = "Deutsche";
    } else if ($state.params.language == "fr") {
        this.flag = "france";
        this.lang = "Français";
    } else if ($state.params.language == "pt") {
        this.flag = "brazil";
        this.lang = "Português";
    } else {
        if (browserDefaultLang != storageDefaultLang) {
            if (storageDefaultLang == 'en') {
                this.flag = "uk";
                this.lang = "English";
            } else if (storageDefaultLang == 'de') {
                this.flag = "germany";
                this.lang = "Deutsche"; 
            } else if (storageDefaultLang == 'fr') {
                this.flag = "france";
                this.lang = "Français";
            } else if (storageDefaultLang == 'pt') {
                this.flag = "brazil";
                this.lang = "Português";
            }
        } else {
            if (browserDefaultLang == 'en') {
                this.flag = "uk";
                this.lang = "English";
            } else if (browserDefaultLang == 'de') {
                this.flag = "germany";
                this.lang = "Deutsche";
            } else if (browserDefaultLang == 'fr') {
                this.flag = "france";
                this.lang = "Français";
            } else if (browserDefaultLang == 'pt') {
                this.flag = "brazil";
                this.lang = "Português";
            }
        }
    }

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $translate.use(toParams.language);
    }); 

    this.switchLanguage = function (language) {
        $state.go($state.current.name, {language: language});
        $translate.use(language);
        
        if (language == 'en') {
            this.flag = "uk";
            this.lang = "English";
        } else if (language == "de") {
            this.flag = "germany";
            this.lang = "Deutsche";
        } else if (language == "fr") {
            this.flag = "france";
            this.lang = "Français";
        } else if (language == "pt") {
            this.flag = "brazil";
            this.lang = "Português";
        }
    };
}]);