var app = angular.module('cs60', [
    'ngCookies',
    'ngAnimate',
    'ngMaterial',
    'ngStorage',
    'ui.router',
    'duScroll',
    'pascalprecht.translate',
    'angular-preload-image'
]);

app.value('duScrollGreedy', true);

app.config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/locale/',
        suffix: '.json'
    });
    $translateProvider.useLocalStorage();
    $translateProvider.registerAvailableLanguageKeys(
        ['en', 'de', 'fr', 'pt'],
        {
            'en*': 'en',
            'de*': 'de',
            'fr*': 'fr',
            'pt*': 'pt',
            '*': 'en' // must be last!
        }
    );
    $translateProvider.fallbackLanguage('en');
    $translateProvider.determinePreferredLanguage();
}]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('lang', {
            url: '/:language',
            abstract: true,
            template: '<div ui-view></div>',
            controller: 'mainController as main'
        })
        .state('lang.home', {
            url: '',
            templateUrl: 'views/home.html',
            controller: 'mainController as main'
        })

        // $locationProvider.html5Mode(true);
}]);

app.run(['$rootScope', '$state', '$stateParams', '$timeout', function ($rootScope, $state, $stateParams, $timeout) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('duScrollspy:becameActive', function($event, $element, $target){
        // //Automaticly update location
        // var hash = $element.prop('hash');
        // if (hash) {
        //   history.replaceState(null, null, hash);
        // }
        var sectionOne = $('#side-nav li:nth-child(1) a'),
        sectionTwo = $('#side-nav li:nth-child(2) a'),
        sectionThree = $('#side-nav li:nth-child(3) a'),
        sectionFour = $('#side-nav li:nth-child(4) a'),
        sectionFive = $('#side-nav li:nth-child(5) a'),
        sectionSix = $('#side-nav li:nth-child(6) a'),
        sectionSeven = $('#side-nav li:nth-child(7) a'),
        sectionEight = $('#side-nav li:nth-child(8) a'),
        sectionNine = $('#side-nav li:nth-child(9) a')
        sectionTen = $('#side-nav li:nth-child(10) a')
        sectionEleven = $('#side-nav li:nth-child(11) a')
     
        var hash = $element.prop('hash');
        // console.log(hash);

        if (hash == '#section-one') {
            sectionOne.tooltip('show');
            $timeout(function(){
                sectionOne.tooltip('hide');
            }, 1200);
        } else if (hash == '#section-two') {
            sectionTwo.tooltip('show');
            $timeout(function(){
                sectionTwo.tooltip('hide');
            }, 1200);
        } else if (hash == '#section-three') {
            sectionThree.tooltip('show');
            $timeout(function(){
                sectionThree.tooltip('hide');
            }, 1200);
        } else if (hash == '#section-four') {
            sectionFour.tooltip('show');
            $timeout(function(){
                sectionFour.tooltip('hide');
            }, 1200);
        } else if (hash == '#section-five') {
            sectionFive.tooltip('show');
            $timeout(function(){
                sectionFive.tooltip('hide');
            }, 1200);
        } else if (hash == '#section-six') {
            sectionSix.tooltip('show');
            $timeout(function(){
                sectionSix.tooltip('hide');
            }, 1200);
        } else if (hash == '#section-seven') {
            sectionSeven.tooltip('show');
            $timeout(function(){
                sectionSeven.tooltip('hide');
            }, 1200);
        } else if (hash == '#section-eight') {
            sectionEight.tooltip("show");
            $timeout(function(){
                sectionEight.tooltip('hide');
            }, 1200);
        } else if (hash == '#section-nine') {
            sectionNine.tooltip("show");
            $timeout(function(){
                sectionNine.tooltip('hide');
            }, 1200);
        } else if (hash == '#section-ten') {
            sectionTen.tooltip("show");
            $timeout(function(){
                sectionTen.tooltip('hide');
            }, 1200);
        } else if (hash == '#section-eleven') {
            sectionEleven.tooltip("show");
            $timeout(function(){
                sectionEleven.tooltip('eleven');
            }, 1200);
        } 

    });
}]);