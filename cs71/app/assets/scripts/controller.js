'use strict';

app.controller('mainController', function ($scope, $state, $translate, $localStorage, $http, bowser, moment) {

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

    function getServerTime () {
        $http({
            method: 'jsonp',
            url: 'http://io.papayaplay.com/json.do?callback=JSON_CALLBACK',
            params: { cm: 'Service.Board.GetServerTime' }
        })
        .success(function(res) {
            
            if (res.ResultCode[0].Code == 10000) {
                $scope.serverTime = res.ServerTime[0].ServerTime;
                $scope.now = moment($scope.serverTime).format('YYYY-MM-DD');
                // $scope.now = moment('2017-02-08').format('YYYY-MM-DD');
            }
        })
        .error(function () {
            console.log('error')
        });
    }

    getServerTime();

    $scope.prizes = [
        { date: moment('2017-02-08').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-09').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-10').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-11').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-12').format('YYYY-MM-DD'), quantity: 2 },
        { date: moment('2017-02-13').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-14').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-15').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-16').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-17').format('YYYY-MM-DD'), quantity: 3 },
        { date: moment('2017-02-18').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-19').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-20').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-21').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-22').format('YYYY-MM-DD'), quantity: 4 },
        { date: moment('2017-02-23').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-24').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-25').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-26').format('YYYY-MM-DD'), quantity: 1 },
        { date: moment('2017-02-27').format('YYYY-MM-DD'), quantity: 5 }
    ];
});
