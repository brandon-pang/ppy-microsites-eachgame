const app = angular.module('big_change', [
  'ngCookies',
  'ngStorage',
  'ngAnimate',
  'ui.router',
  'jlareau.bowser',
  'angular-preload-image',
  'pascalprecht.translate',
  'angularMoment',
]);

app.config(['$translateProvider', function ($translateProvider) {
	$translateProvider.useSanitizeValueStrategy(null);
	$translateProvider.useStaticFilesLoader({
		prefix: 'assets/locale/',
		suffix: '.json'
	});
	$translateProvider.useLocalStorage();
	$translateProvider.registerAvailableLanguageKeys(
		['en', 'de', 'fr', 'pt', 'ms'],
		{
			'en*': 'en',
			'de*': 'de',
			'fr*': 'fr',
			'pt*': 'pt',
			'ms*': 'ms',
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