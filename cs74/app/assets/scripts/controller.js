'use strict';

app.controller('mainController', function ($scope, $state, $translate, $localStorage, $document, bowser) {

	$scope.browser = bowser.name;

	var storageDefaultLang = localStorage[$translate.storageKey()];
	var browserDefaultLang = $translate.preferredLanguage();

	if ($state.params.language == 'en') {
		$scope.flag = "uk";
		$scope.lang = "English";
	} else if ($state.params.language == 'de') {
		$scope.flag = "germany";
		$scope.lang = "Deutsche";
	} else if ($state.params.language == "fr") {
		$scope.flag = "france";
		$scope.lang = "Français";
	} else if ($state.params.language == "pt") {
		$scope.flag = "brazil";
		$scope.lang = "Português";
	} else {
		if (browserDefaultLang != storageDefaultLang) {
			if (storageDefaultLang == 'en') {
				$scope.flag = "uk";
				$scope.lang = "English";
			} else if (storageDefaultLang == 'de') {
				$scope.flag = "germany";
				$scope.lang = "Deutsche";
			} else if (storageDefaultLang == 'fr') {
				$scope.flag = "france";
				$scope.lang = "Français";
			} else if (storageDefaultLang == 'pt') {
				$scope.flag = "brazil";
				$scope.lang = "Português";
			}
		} else {
			if (browserDefaultLang == 'en') {
				$scope.flag = "uk";
				$scope.lang = "English";
			} else if (browserDefaultLang == 'de') {
				$scope.flag = "germany";
				$scope.lang = "Deutsche";
			} else if (browserDefaultLang == 'fr') {
				$scope.flag = "france";
				$scope.lang = "Français";
			} else if (browserDefaultLang == 'pt') {
				$scope.flag = "brazil";
				$scope.lang = "Português";
			}
		}
	}

	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		$translate.use(toParams.language);
	});

	$scope.switchLanguage = function (language) {
		$state.go($state.current.name, {language: language});
		$translate.use(language);

		if (language == 'en') {
			$scope.flag = "uk";
			$scope.lang = "English";
		} else if (language == "de") {
			$scope.flag = "germany";
			$scope.lang = "Deutsche";
		} else if (language == "fr") {
			$scope.flag = "france";
			$scope.lang = "Français";
		} else if (language == "pt") {
			$scope.flag = "brazil";
			$scope.lang = "Português";
		}
	};

	$scope.slickIndex = 0;

	$scope.slickConfig = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		dots: false,
		prevArrow: '<span class="icon-arrow1"></span>',
		nextArrow: '<span class="icon-arrow2"></span>',
		event: {
			afterChange: function (event, slick, currentSlide, nextSlide) {
				$scope.slickIndex = (currentSlide+1);
			}
		}
	};

	//https://blackshot.s3.amazonaws.com/static/event/cs74/assets/images/
	$scope.imgUrl="./assets/images/";

	$scope.pathUrl=[
		{name:"top0",loc:"https://blackshot.papayaplay.com/blackshot.do"},
		{name:"see-more",loc:"http://forum.papayaplay.com/index.php?p=/discussion/356703/event-mastering-zone-control"},
		{name:"footer-logo0",loc:"https://www.papayaplay.com/portal.do"},
		{name:"footer-logo1",loc:"http://www.vertigogames.com/"}
	];
	//

	$scope.shopSlicks=[
		{text:"HK416 N",image:'slide1.png'},
		{text:"AWP Arc Reactor",image:'slide2.png'},
		{text:"New Arctic Package",image:'slide3.png'},
		{text:"M4 Super 90 Metal",image:'slide4.png'},
		{text:"Paratrooper",image:'slide5.png'}
	];
});