'use strict';

var app = angular.module('cs80', ['ngCookies', 'ngStorage', 'ngAnimate', 'ui.router', 'jlareau.bowser', 'angular-preload-image', 'pascalprecht.translate', 'angularMoment', 'slickCarousel', 'duScroll', 'angular-svg-round-progressbar']);

app.value('duScrollGreedy', true);
app.value('duScrollBottomSpy', true);

app.config(['$translateProvider', function ($translateProvider) {
	$translateProvider.useSanitizeValueStrategy(null);
	$translateProvider.useStaticFilesLoader({
		prefix: 'assets/locale/',
		suffix: '.json'
	});
	$translateProvider.useLocalStorage();
	$translateProvider.registerAvailableLanguageKeys(['en', 'de', 'fr', 'pt'], {
		'en*': 'en',
		'de*': 'de',
		'fr*': 'fr',
		'pt*': 'pt',
		'*': 'en' // must be last!
	});
	$translateProvider.fallbackLanguage('en');
	$translateProvider.determinePreferredLanguage();
}]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider.state('lang', {
		url: '/:language',
		abstract: true,
		template: '<div ui-view></div>'
	}).state('lang.home', {
		url: '',
		templateUrl: 'views/home.html',
		controller: 'mainController'
	});

	$urlRouterProvider.otherwise('/');
	// $locationProvider.html5Mode(true);
});
//# sourceMappingURL=app.js.map
