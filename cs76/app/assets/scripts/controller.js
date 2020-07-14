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
		$scope.fontSize1='20px';
		$scope.fontSize2='20px';
	} else if ($state.params.language == 'de') {
		$scope.flag = "germany";
		$scope.lang = "Deutsche";
		$scope.fontSize1='18px';
		$scope.fontSize2='16px';
	} else if ($state.params.language == "fr") {
		$scope.flag = "france";
		$scope.lang = "Français";
		$scope.fontSize1='20px';
		$scope.fontSize2='20px';
	} else if ($state.params.language == "pt") {
		$scope.flag = "brazil";
		$scope.lang = "Português";
		$scope.fontSize1='20px';
		$scope.fontSize2='20px';
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

	$scope.user = LoginService;
	$scope.event = EventService;
	$scope.event.teamSelectWindow=false;
	$scope.teamType='';
	$scope.isClick=false;

	$scope.selectTeam=function(team){
		$scope.event.teamSelectWindow=true;
		$scope.teamType=team;
		$scope.event.teamSelectMsg='do yo want to pick this team?'
	};

	$scope.reqTeam=function(team){
		EventService.setEventResult(team);
	};

	$scope.slickIndex0 = 1;
	$scope.slickIndex1 = 1;

	$scope.slickConfig = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		speed:1000,
		autoplay: true,
		autoplaySpeed:4000,
		dots: true,
		prevArrow: '<span class="icon-arrow1"></span>',
		nextArrow: '<span class="icon-arrow2"></span>',
		customPaging:function(slider,i){
			//console.log(slider);
			return '<span class="dot"></span>';
		},
		event: {
			afterChange: function (event, slick, currentSlide, nextSlide) {
				//console.log(event.target.id);
				if(event.target.id=="slick0"){
					$scope.slickIndex0 = (currentSlide+1);
				}
				if(event.target.id=="slick1"){
					$scope.slickIndex1 = (currentSlide+1);
				}

			}
		}
	};

	//https://papayacdn.s3.amazonaws.com/cs76/assets/images/flag-brazil.svg
	//../assets/images/
	$scope.imgUrl="https://papayacdn.s3.amazonaws.com/cs76/assets/images/";

	$scope.pathUrl=[
		{name:"top0",loc:"https://blackshot.papayaplay.com/blackshot.do"},
		{name:"patch-note",loc:"http://forum.papayaplay.com/index.php?p=/discussion/356703/event-mastering-zone-control"},
		{name:"goldbox",loc:"https://blackshot.papayaplay.com/blackshot.do?tp=news.view&postid=1397"},
		{name:"see-map",loc:"https://blackshot.papayaplay.com/blackshot.do?tp=news.view&postid=1396"},
		{name:"see-polizei",loc:"http://forum.papayaplay.com/index.php?p=/discussion/358608/event-defeat-the-polizei"},
		{name:"see-gm",loc:"http://forum.papayaplay.com/index.php?p=/discussion/358684/event-gms-brawl"},
		{name:"portal-url",loc:"https://www.papayaplay.com/portal.do"},
		{name:"vertigo-url",loc:"http://www.vertigogames.com/"}
	];
});