var app = angular.module('cs66', [
    'ngCookies',
    'ngAnimate',
    'ngMaterial',
    'ngStorage',
    'ui.router',
    'duScroll',
    'angularMoment',
    'pascalprecht.translate',
    'angular-preload-image',
    'angular-svg-round-progressbar',
    'jlareau.bowser'
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
}])