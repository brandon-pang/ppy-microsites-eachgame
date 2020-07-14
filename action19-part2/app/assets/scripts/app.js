var app = angular.module('dk19', [
    'ngCookies',
    'ngStorage',
    'ngAnimate',
    'ui.router',
    'jlareau.bowser',
    'angular-preload-image',
    'pascalprecht.translate',
    'angularMoment',
    'slickCarousel',
    'duScroll'
]);
//https://papayacdn.s3.amazonaws.com/static/dekaron/update/part2
app.value('duScrollGreedy', true);
app.value('duScrollBottomSpy', true);
//https://papayacdn.s3.amazonaws.com/static/dekaron/update/part2
app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useStaticFilesLoader({
        suffix: ".json",
        prefix: "https://papayacdn.s3.amazonaws.com/static/dekaron/update/part2/assets/locale/"
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
        });

        $urlRouterProvider.otherwise('/');
        // $locationProvider.html5Mode(true);
});
