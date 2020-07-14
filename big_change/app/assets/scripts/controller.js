app.controller('mainController', function ($scope, $interval, $state, $translate,
                                           $document, $localStorage, bowser, moment) {

	$scope.browser = bowser.name;

	var storageDefaultLang = $localStorage[$translate.storageKey()];
	var browserDefaultLang = $translate.preferredLanguage();

	$translate.use($state.params.language);

	if ($state.params.language === 'en') {
		$scope.flag = "uk";
		$scope.lang = "English";

	} else if ($state.params.language === 'de') {
		$scope.flag = "germany";
		$scope.lang = "Deutsche";

	} else if ($state.params.language === "fr") {
		$scope.flag = "france";
		$scope.lang = "Français";

	} else if ($state.params.language === "pt") {
		$scope.flag = "brazil";
		$scope.lang = "Português";

	} else if ($state.params.language === "ms") {
		$scope.flag = "malay";
		$scope.lang = "Malay";

	} else {
		if (browserDefaultLang != storageDefaultLang) {
			if (storageDefaultLang === 'en') {
				$scope.flag = "uk";
				$scope.lang = "English";
			} else if (storageDefaultLang === 'de') {
				$scope.flag = "germany";
				$scope.lang = "Deutsche";
			} else if (storageDefaultLang === 'fr') {
				$scope.flag = "france";
				$scope.lang = "Français";
			} else if (storageDefaultLang === 'pt') {
				$scope.flag = "brazil";
				$scope.lang = "Português";
			} else if ($state.params.language === "ms") {
				$scope.flag = "malay";
				$scope.lang = "Malay";
			}
		} else {
			if (browserDefaultLang === 'en') {
				$scope.flag = "uk";
				$scope.lang = "English";
			} else if (browserDefaultLang === 'de') {
				$scope.flag = "germany";
				$scope.lang = "Deutsche";
			} else if (browserDefaultLang === 'fr') {
				$scope.flag = "france";
				$scope.lang = "Français";
			} else if (browserDefaultLang === 'pt') {
				$scope.flag = "brazil";
				$scope.lang = "Português";
			} else if ($state.params.language === "ms") {
				$scope.flag = "malay";
				$scope.lang = "Malay";
			}
		}
	}

	$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		$translate.use(toParams.language);

		console.log('param change',toParams.language)
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
		} else if (language == "ms") {
			$scope.flag = "malay";
			$scope.lang = "Português";
		}
	};

	$scope.setCountDown = function() {
		var timeSpan = moment().tz('America/Los_Angeles').countdown("2018-03-11 17:00");
		var day = timeSpan.days;
		var hour = timeSpan.hours;
		var min = timeSpan.minutes;
		var sec = timeSpan.seconds;
		var value=timeSpan.value;

		console.log('value',value);


		if (day < 10) day = '0' + day;

		if (hour < 10) hour = '0' + hour;

		if (min < 10) min = '0' + min;

		if (sec < 10) sec = '0' + sec;

		$scope.rday = day;
		$scope.rhour = hour;
		$scope.rmin = min;
		$scope.rsec = sec;


		if (value < 0) {
			console.log('val',value)
			$scope.rday = '00';
			$scope.rhour = '00';
			$scope.rmin = '00';
			$scope.rsec = '00';
			$interval.cancel($scope.IntervalId);
			return
		}
	}

	$scope.IntervalId = $interval($scope.setCountDown, 1000);


	//https://stactic.papayapla.com/static/event/blackshot/big_change/
	//../assets/images/

	//$scope.imgUrl = "https://static.papayaplay.com/static/event/blackshot/big_change/assets/images/";
	$scope.imgUrl = "../assets/images/";
	$scope.pathUrl = [
		{name: "goback", loc: "https://blackshot.papayaplay.com/blackshot.do"},
		{name: "sec1-seemore", loc: "https://blackshot.papayaplay.com/blackshot.do?tp=news.view&postid=1565"},
		{name: "sec5-goldbox", loc: "https://blackshot.papayaplay.com/blackshot.do?tp=news.view&postid=1557"},
		{name: "see-gm", loc: "http://forum.papayaplay.com/index.php?p=/discussion/363130/bs-glb-event-gm-lunar-bash"},
		{name: "portal-url", loc: "https://www.papayaplay.com/portal.do"},
		{name: "vertigo-url", loc: "http://www.vertigogames.com/"}
	];
});