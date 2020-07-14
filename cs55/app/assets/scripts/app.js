var app = angular.module('cs55', [
    'ngCookies',
    'ngAnimate',
    'ui.router',
    'pascalprecht.translate',
    'angular-loading-bar',
    'duScroll'
]);

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

app.run(['$rootScope', '$state', '$stateParams', '$document', '$timeout', 'cfpLoadingBar', function ($rootScope, $state, $stateParams, $document, $timeout, cfpLoadingBar) {
    // for debugging purposes
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    cfpLoadingBar.start();

    var e = angular.element(document.getElementById('top-divider'));
    $timeout(function(){
        e.css('visibility', 'visible'); 
    }, 3000);

}]);