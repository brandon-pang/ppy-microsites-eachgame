'use strict';

app.controller('mainController', function ($scope, $interval,
                                           $state, $translate, $document, $localStorage,
                                           bowser, moment, LoginService, EventService) {

	$scope.browser = bowser.name;

	var storageDefaultLang = localStorage[$translate.storageKey()];
	var browserDefaultLang = $translate.preferredLanguage();

	if ($state.params.language == 'en') {
		$scope.flag = "uk";
		$scope.lang = "English";
		$scope.fontSize1 = '20px';
		$scope.fontSize2 = '20px';
	} else if ($state.params.language == 'de') {
		$scope.flag = "germany";
		$scope.lang = "Deutsche";
		$scope.fontSize1 = '18px';
		$scope.fontSize2 = '16px';
	} else if ($state.params.language == "fr") {
		$scope.flag = "france";
		$scope.lang = "Français";
		$scope.fontSize1 = '20px';
		$scope.fontSize2 = '20px';
	} else if ($state.params.language == "pt") {
		$scope.flag = "brazil";
		$scope.lang = "Português";
		$scope.fontSize1 = '20px';
		$scope.fontSize2 = '20px';
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

	$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
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
	$scope.leftVal = {'left': '100px', 'transition': 'all .5s ease-in'};
	$scope.nowPos = 100
	$scope.user = LoginService;
	$scope.event = EventService;
	$scope.matchTabIndex = [1, 0, 0];
	$scope.matchTabClick = function (index) {
		let width = window.innerWidth;
		if (index == 0) {
			$scope.nowPos = 100
			$scope.leftVal = {'left': '100px', 'transition': 'all .5s ease-in'};
		} else if (index == 1) {
			var rightPos = (width - (3565 + 100))
			$scope.nowPos = rightPos
			$scope.leftVal = {'left': rightPos + 'px', 'transition': 'all .5s ease-in'};
		} else if (index == 2) {
			var centerPos = (width / 2) - (3565 / 2)
			$scope.nowPos = centerPos
			$scope.leftVal = {'left': centerPos + 'px', 'transition': 'all .5s ease-in'};
		}

		$scope.activeTab(index)
	};

	$scope.activeTab=function(index){
		for (let i = 0; i < $scope.matchTabIndex.length; i++) {
			if (i == index) {
				$scope.matchTabIndex[i] = 1;
			} else {
				$scope.matchTabIndex[i] = 0;
			}
		}
	}

	$scope.matchArrow = function (index) {
		let width = window.innerWidth;
		let nowpos = $scope.nowPos
		let calPos = $scope.nowPos
		if (index == 0) {
			if(calPos > -99){
				$scope.activeTab(0)
				console.log("start");
			}
			if(calPos > -1299 && calPos < -949){
				$scope.activeTab(2)
				console.log("center");
			}
			if(calPos < -2499){
				$scope.activeTab(1)
				console.log("end");
			}
			if (calPos > 0) {
				calPos = -2500
			} else {
				calPos = nowpos + 300
			}
			$scope.leftVal = {'left': calPos + 'px', 'transition': 'all .3s ease-in'};
			$scope.nowPos = calPos;
			console.log(calPos)
			console.log((width-(nowpos+300)))
		}
		if (index == 1) {
			if(calPos > -99){
				$scope.activeTab(0)
				console.log("start");
			}
			if(calPos > -1299 && calPos < -949){
				$scope.activeTab(2)
				console.log("center");
			}
			if(calPos < -2330){
				$scope.activeTab(1)
				console.log("end");
			}
			if (nowpos < -2499) {
				calPos = 100
			} else {
				calPos = nowpos - 300
			}
			$scope.leftVal = {'left': calPos + 'px', 'transition': 'all .3s ease-in'};
			$scope.nowPos = calPos;
		}
	}

	$scope.slickIndex0 = 1;
	$scope.slickIndex1 = 1;

	$scope.slickConfig = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		speed: 1000,
		autoplay: false,
		autoplaySpeed: 4000,
		dots: true,
		prevArrow: '<span class="icon-arrow1"></span>',
		nextArrow: '<span class="icon-arrow2"></span>',
		customPaging: function (slider, i) {
			//console.log(slider);
			return '<span class="dot"></span>';
		},
		event: {
			afterChange: function (event, slick, currentSlide, nextSlide) {
				//console.log(event.target.id);
				if (event.target.id == "slick0") {
					$scope.slickIndex0 = (currentSlide + 1);
				}
				if (event.target.id == "slick1") {
					$scope.slickIndex1 = (currentSlide + 1);
				}

			}
		}
	};

	$scope.slickConfig0 = {
		infinite: true,
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 3,
		arrows: true,
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 4000,
		dots: true,
		prevArrow: '<span class="icon-arrow1"></span>',
		nextArrow: '<span class="icon-arrow2"></span>',
		customPaging: function (slider, i) {
			//console.log(slider);
			return '<span class="dot"></span>';
		},
		event: {
			afterChange: function (event, slick, currentSlide, nextSlide) {
				//console.log(event.target.id);
				if (event.target.id == "slick0") {
					$scope.slickIndex0 = (currentSlide + 1);
				}
				if (event.target.id == "slick1") {
					$scope.slickIndex1 = (currentSlide + 1);
				}

			}
		}
	};

	//https://papayacdn.s3.amazonaws.com/cs77/assets/images/
	//../assets/images/
	$scope.imgUrl = "../assets/images/";

	$scope.pathUrl = [
		{name: "top0", loc: "https://blackshot.papayaplay.com/blackshot.do"},
		{name: "patch-note", loc: "http://forum.papayaplay.com/index.php?p=/discussion/360003/bgat-blackshot-global-anniversary-tournament-index#latest"},
		{name: "pickem", loc: "http://forum.papayaplay.com/index.php?p=/discussion/358607/event-bet-to-win"},
		{name: "goldbox", loc: "https://blackshot.papayaplay.com/blackshot.do?tp=news.view&postid=1450"},
		{name: "see-gm", loc: "http://forum.papayaplay.com/index.php?p=/discussion/360682/event-blackshot-10th-anniversary-video-contest"},
		{name: "portal-url", loc: "https://www.papayaplay.com/portal.do"},
		{name: "vertigo-url", loc: "http://www.vertigogames.com/"}
	];
});