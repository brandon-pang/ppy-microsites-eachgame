'use strict';

app.controller('mainController', function ($scope, $interval, $state, $translate,
                                           $document, $localStorage, bowser, moment,
                                           LoginService, EventService) {

	$scope.browser = bowser.name;

	var storageDefaultLang = localStorage[$translate.storageKey()];
	var browserDefaultLang = $translate.preferredLanguage();

	if ($state.params.language == 'en') {
		$scope.flag = "uk";
		$scope.lang = "English";
		$scope.fontSize1 = '20px';
		$scope.fontSize2 = '20px';
	} else if ($state.params.language == 'ms') {
		$scope.flag = "ms";
		$scope.lang = "Malay";
		$scope.fontSize1 = '18px';
		$scope.fontSize2 = '16px';
	} else {
		if (browserDefaultLang != storageDefaultLang) {
			if (storageDefaultLang == 'en') {
				$scope.flag = "uk";
				$scope.lang = "English";
			} else if (storageDefaultLang == 'ms') {
				$scope.flag = "ms";
				$scope.lang = "Malay";
			}
		} else {
			if (browserDefaultLang == 'en') {
				$scope.flag = "uk";
				$scope.lang = "English";
			} else if (browserDefaultLang == 'ms') {
				$scope.flag = "ms";
				$scope.lang = "Malay";
			}
		}
	}

	$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		$translate.use(toParams.language);
	});

	$scope.switchLanguage = function (language) {
		$state.go($state.current.name, {language: language});
		$translate.use(language);

		if (language == 'en') {
			$scope.flag = "uk";
			$scope.lang = "English";
		} else if (language == "ms") {
			$scope.flag = "ms";
			$scope.lang = "Malay";
		}
	};

	$scope.user = LoginService;
	$scope.event = EventService;
	$scope.s7tabIndex = [1, 0, 0, 0, 0];
	$scope.s7tabClick = function (index) {
		for (let i = 0; i < $scope.s7tabIndex.length; i++) {
			if (i == index) {
				$scope.s7tabIndex[i] = 1;
			} else {
				$scope.s7tabIndex[i] = 0;
			}
		}
	};

	$scope.slickIndex0 = 1;
	$scope.slickIndex1 = 1;

	$scope.slickConfig = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 4000,
		dots: true,
		prevArrow: '<span class="cs79-icon-arrow1"></span>',
		nextArrow: '<span class="cs79-icon-arrow2"></span>',
		customPaging: function (slider, i) {
			//console.log(slider);
			return '<span class="dot"></span>';
		},
		event: {
			afterChange: function (event, slick, currentSlide, nextSlide) {
				//console.log(event.target.id);
				if (event.target.id == "slick0") {
					$scope.slickIndex0 = (currentSlide + 1) ;
				}
				if (event.target.id == "slick1") {
					$scope.slickIndex1 = (currentSlide + 1);
				}

			}
		}
	};

	$scope.setJoinState=function(unid){
		EventService.getJoinResult(unid);
	}
	//https://papayacdn.s3.amazonaws.com/static/event/blackshot/cs79_se/assets/
	//../assets/images/
	$scope.imgUrl = "https://papayacdn.s3.amazonaws.com/static/event/blackshot/cs79_se/assets/images/";
	$scope.pathUrl = [
		{name: "goback", loc: "https://bs.sea.papayaplay.com/blackshotsea.do"},
		{name: "sec1-seemore", loc: "https://bs.sea.papayaplay.com/blackshotsea.do?tp=news.view&postid=1532"},
		{name: "sec5-goldbox", loc: "https://bs.sea.papayaplay.com/blackshotsea.do?tp=news.view&postid=1478"},
		{name: "see-gm", loc: "http://forum.papayaplay.com/index.php?p=/discussion/362712/event-protect-the-gm-sea#latest"},
		{name: "portal-url", loc: "https://www.papayaplay.com/portal.do"},
		{name: "vertigo-url", loc: "http://www.vertigogames.com/"}
	];
});