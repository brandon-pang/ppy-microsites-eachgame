var app = angular.module('cs64', [
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
    
    $urlRouterProvider.otherwise('/en/week1');
    
    $stateProvider
        .state('lang', {
            url: '/:language',
            abstract: true,
            template: '<div ui-view></div>'
        })
        .state('lang.week1', {
            url: '/week1',
            templateUrl: 'views/week1.html',
            controller: 'mainController as main'
        })
        .state('lang.week2', {
            url: '/week2',
            templateUrl: 'views/week2.html',
            controller: 'mainController as main'
        })

        // $locationProvider.html5Mode(true);
}]);

app.run(['$rootScope', '$state', '$stateParams', '$timeout', function ($rootScope, $state, $stateParams, $timeout) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
}]);