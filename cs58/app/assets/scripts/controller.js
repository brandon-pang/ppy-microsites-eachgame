'use strict';

app.controller('mainController', ['$scope', '$state', '$translate', '$document', '$timeout', '$log', function ($scope, $state, $translate, $document, $timeout, $log) {
    // $scope.showSpinner = true; usSpinnerService
    var main = angular.element(document.getElementById('main'));
    // angular.element(document).ready(function () {
    //     main.css('visibility', 'visible');
    // });
        
    // $timeout(function() {
    //     main.css('visibility', 'visible');
    //     // $scope.showSpinner = false;
    // }, 3000);
    var storageDefaultLang = localStorage[$translate.storageKey()];
    var browserDefaultLang = $translate.preferredLanguage();
    // console.log("localStorage: " + storageDefaultLang + "browserLang: " + browserDefaultLang);

    console.log($state.params.language);

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

    var section1 = angular.element(document.getElementById('section-one')),
        section2 = angular.element(document.getElementById('section-two')),
        section3 = angular.element(document.getElementById('section-three')),
        section4 = angular.element(document.getElementById('section-four')),
        section5 = angular.element(document.getElementById('section-five')),
        section6 = angular.element(document.getElementById('section-six')),
        section7 = angular.element(document.getElementById('section-seven')),
        section8 = angular.element(document.getElementById('section-eight')),
        section9 = angular.element(document.getElementById('section-nine'));

    this.prev = function() {
        var tabs = angular.element(document.getElementsByClassName('tabs'));
        
        if (tabs[1].className == "tabs active") {
            $document.scrollToElementAnimated(section1);
        } else if (tabs[2].className == "tabs active") {
            $document.scrollToElementAnimated(section2);
        } else if (tabs[3].className == "tabs active") {
            $document.scrollToElementAnimated(section3);
        } else if (tabs[4].className == "tabs active") {
            $document.scrollToElementAnimated(section4);
        } else if (tabs[5].className == "tabs active") {
            $document.scrollToElementAnimated(section5);
        } else if (tabs[6].className == "tabs active") {
            $document.scrollToElementAnimated(section6);
        } else if (tabs[7].className == "tabs active") {
            $document.scrollToElementAnimated(section7);
        } else if (tabs[8].className == "tabs active") {
            $document.scrollToElementAnimated(section8);
        }
    }

    this.next = function() {
        var tabs = angular.element(document.getElementsByClassName('tabs'));
        
        if (tabs[0].className == "tabs active") {
            $document.scrollToElementAnimated(section2);
        } else if (tabs[1].className == "tabs active") {
            $document.scrollToElementAnimated(section3);
        } else if (tabs[2].className == "tabs active") {
            $document.scrollToElementAnimated(section4);
        } else if (tabs[3].className == "tabs active") {
            $document.scrollToElementAnimated(section5);
        } else if (tabs[4].className == "tabs active") {
            $document.scrollToElementAnimated(section6);
        } else if (tabs[5].className == "tabs active") {
            $document.scrollToElementAnimated(section7);
        } else if (tabs[6].className == "tabs active") {
            $document.scrollToElementAnimated(section8);
        } else if (tabs[7].className == "tabs active") {
            $document.scrollToElementAnimated(section9);
        }
    }
}]);