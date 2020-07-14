var app = angular.module('cs71', [
    'ngCookies',
    'ngStorage',
    'ui.router',
    'jlareau.bowser',
    'angular-preload-image',
    'pascalprecht.translate',
    'angularMoment'
]);

app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useStaticFilesLoader({
        prefix: 'http://d3mrh9k3iunait.cloudfront.net/static/event/cs71/assets/locale/',
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

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $stateProvider
        .state('lang', {
            url: '/:language',
            abstract: true,
            template: '<div ui-view></div>'
        })
        .state('lang.home', {
            url: '',
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })

        $urlRouterProvider.otherwise('/');
        // $locationProvider.html5Mode(true);
})
