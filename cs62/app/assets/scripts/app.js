var app = angular.module('cs62', [
    'ngCookies',
    'ngAnimate',
    'ngMaterial',
    'ngStorage',
    'ui.router',
    'duScroll',
    'angularMoment',
    'pascalprecht.translate',
    'angular-preload-image'
]);

app.value('duScrollGreedy', true);

app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy(null);
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
            template: '<div ui-view></div>'
        })
        .state('lang.home', {
            url: '',
            templateUrl: 'views/home.html',
            controller: 'mainController as main'
        })

        // $locationProvider.html5Mode(true);
}]);

app.constant('angularMomentConfig', {
    timezone: 'Europe/Berlin' // e.g. 'Europe/London'
});

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
        sectionFive = $('#side-nav li:nth-child(5) a')
     
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
        }

    });
}]);