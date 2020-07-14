var app = angular.module('cs75', [
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

app.value('duScrollGreedy', true);
app.value('duScrollBottomSpy', true);

app.config(['$translateProvider', function ($translateProvider) {
	$translateProvider.useSanitizeValueStrategy(null);
	$translateProvider.useStaticFilesLoader({
		//https://blackshot.s3.amazonaws.com/static/event/cs75/
		prefix: '../../assets/locale/',
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

app.run(function ($rootScope, $state, $stateParams, $timeout) {
	// for debugging purposes
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;

	$rootScope.$on('duScrollspy:becameActive', function($event, $element, $target) {

		var section1 = $('#side-nav li:nth-child(1)'),
		    section2 = $('#side-nav li:nth-child(2)'),
		    section3 = $('#side-nav li:nth-child(3)'),
		    section4 = $('#side-nav li:nth-child(4)'),
		    section5 = $('#side-nav li:nth-child(5)'),
		    section6 = $('#side-nav li:nth-child(6)'),
		    section7 = $('#side-nav li:nth-child(7)'),
		    section8 = $('#side-nav li:nth-child(8)')

		var hash = $element.prop('hash');
		// console.log(hash);

		if (hash == '#section1') {
			$('#side-nav li').removeClass();
			section1.addClass('active');
		} else if (hash == '#section2') {
			$('#side-nav li').removeClass('active');
			section2.addClass('active');
		} else if (hash == '#section3') {
			$('#side-nav li').removeClass('active');
			section3.addClass('active');
		} else if (hash == '#section4') {
			$('#side-nav li').removeClass('active');
			section4.addClass('active');
		} else if (hash == '#section5') {
			$('#side-nav li').removeClass('active');
			section5.addClass('active');
		} else if (hash == '#section6') {
			$('#side-nav li').removeClass('active');
			section6.addClass('active');
		} else if (hash == '#section7') {
			$('#side-nav li').removeClass('active');
			section7.addClass('active');
		} else if (hash == '#section8') {
			$('#side-nav li').removeClass('active');
			section8.addClass('active');
		}
	});
});