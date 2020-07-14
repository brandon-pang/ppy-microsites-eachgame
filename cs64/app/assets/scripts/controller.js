'use strict';

app.controller('mainController', ['$scope', '$state', '$translate', '$document', '$localStorage', '$http', 'myInfo', function ($scope, $state, $translate, $document, $localStorage, $http, myInfo) {
    var storageDefaultLang = localStorage[$translate.storageKey()];
    var browserDefaultLang = $translate.preferredLanguage();

    $scope.$storage = $localStorage;

    console.log($state.params.language);

    this.data = {
        cb1: $scope.$storage.cb1,
        cb2: $scope.$storage.cb2,
        cb3: $scope.$storage.cb3,
        cb4: $scope.$storage.cb4,
        cb5: $scope.$storage.cb5,
        cb6: $scope.$storage.cb6,
        cb7: $scope.$storage.cb7,
        cb8: $scope.$storage.cb8,
        cb9: $scope.$storage.cb9
    };

    if ($state.params.language == 'en') {
        this.flag = "uk";
        this.lang = "English";
    } else if ($state.params.language == 'de') {
        this.flag = "germany";
        this.lang = "Deutsche";
    } else if ($state.params.language == "fr") {
        this.flag = "france";
        this.lang = "Français";
    } else if ($state.params.language == "pt") {
        this.flag = "brazil";
        this.lang = "Português";
    } else {
        if (browserDefaultLang != storageDefaultLang) {
            if (storageDefaultLang == 'en') {
                this.flag = "uk";
                this.lang = "English";
            } else if (storageDefaultLang == 'de') {
                this.flag = "germany";
                this.lang = "Deutsche"; 
            } else if (storageDefaultLang == 'fr') {
                this.flag = "france";
                this.lang = "Français";
            } else if (storageDefaultLang == 'pt') {
                this.flag = "brazil";
                this.lang = "Português";
            }
        } else {
            if (browserDefaultLang == 'en') {
                this.flag = "uk";
                this.lang = "English";
            } else if (browserDefaultLang == 'de') {
                this.flag = "germany";
                this.lang = "Deutsche";
            } else if (browserDefaultLang == 'fr') {
                this.flag = "france";
                this.lang = "Français";
            } else if (browserDefaultLang == 'pt') {
                this.flag = "brazil";
                this.lang = "Português";
            }
        }
    }

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $translate.use(toParams.language);
    }); 

    this.switchLanguage = function (language) {
        $state.go($state.current.name, {language: language});
        $translate.use(language);
        
        if (language == 'en') {
            this.flag = "uk";
            this.lang = "English";
        } else if (language == "de") {
            this.flag = "germany";
            this.lang = "Deutsche";
        } else if (language == "fr") {
            this.flag = "france";
            this.lang = "Français";
        } else if (language == "pt") {
            this.flag = "brazil";
            this.lang = "Português";
        }
    };
    
    $scope.isLogin = false;

    var myInfo = myInfo.getMyInfo();
    myInfo.then(function (res) {
        console.log(res);

        if (res.data.ResultCode[0].Code === '10000') {
            var unid = res.data.UserInfo[0].UNID;
            $scope.isLogin = true;
            $scope.myInfo = res.data.UserInfo[0];

            $http({
                method: 'jsonp',
                url: 'http://io.papayaplay.com/secured/json.do?callback=JSON_CALLBACK',
                params : { cm: 'Service.Event.GetEventResultBSCS64', unid: unid },
            }).then(function successCallback(res) {
                console.log(res);
                $scope.eventData = res.data.EventResult;
            }, function errorCallback(res) {
                console.log('error');
            });
        } 
    });

    var serverTime = moment.tz(new Date(), "Europe/Berlin");
    var day1 = moment.tz("2016-07-20 00:00:00", "Europe/Berlin");
    var day2 = moment.tz("2016-07-21 00:00:00", "Europe/Berlin");
    var day3 = moment.tz("2016-07-22 00:00:00", "Europe/Berlin");
    var day4 = moment.tz("2016-07-23 00:00:00", "Europe/Berlin");
    var day5 = moment.tz("2016-07-24 00:00:00", "Europe/Berlin");
    var day6 = moment.tz("2016-07-25 00:00:00", "Europe/Berlin");
    var day7 = moment.tz("2016-07-26 00:00:00", "Europe/Berlin");
    var day8 = moment.tz("2016-07-27 00:00:00", "Europe/Berlin");
    var day9 = moment.tz("2016-07-28 00:00:00", "Europe/Berlin");
    var day10 = moment.tz("2016-07-29 00:00:00", "Europe/Berlin");
    var day11 = moment.tz("2016-07-30 00:00:00", "Europe/Berlin");
    var day12 = moment.tz("2016-07-31 00:00:00", "Europe/Berlin");
    var day13 = moment.tz("2016-08-01 00:00:00", "Europe/Berlin");
    var day14 = moment.tz("2016-08-02 00:00:00", "Europe/Berlin");
    var day15 = moment.tz("2016-08-03 00:00:00", "Europe/Berlin");

    $scope.day1TimeLeft = moment.duration(day2.diff(serverTime)).hours() + 'h' + moment.duration(day2.diff(serverTime)).minutes() + 'm';
    $scope.day2TimeLeft = moment.duration(day3.diff(serverTime)).hours() + 'h' + moment.duration(day3.diff(serverTime)).minutes() + 'm';
    $scope.day3TimeLeft = moment.duration(day4.diff(serverTime)).hours() + 'h' + moment.duration(day4.diff(serverTime)).minutes() + 'm';
    $scope.day4TimeLeft = moment.duration(day5.diff(serverTime)).hours() + 'h' + moment.duration(day5.diff(serverTime)).minutes() + 'm';
    $scope.day5TimeLeft = moment.duration(day6.diff(serverTime)).hours() + 'h' + moment.duration(day6.diff(serverTime)).minutes() + 'm';
    $scope.day6TimeLeft = moment.duration(day7.diff(serverTime)).hours() + 'h' + moment.duration(day7.diff(serverTime)).minutes() + 'm';
    $scope.day7TimeLeft = moment.duration(day8.diff(serverTime)).hours() + 'h' + moment.duration(day8.diff(serverTime)).minutes() + 'm';
    $scope.day8TimeLeft = moment.duration(day9.diff(serverTime)).hours() + 'h' + moment.duration(day9.diff(serverTime)).minutes() + 'm';
    $scope.day9TimeLeft = moment.duration(day10.diff(serverTime)).hours() + 'h' + moment.duration(day10.diff(serverTime)).minutes() + 'm';
    $scope.day10TimeLeft = moment.duration(day11.diff(serverTime)).hours() + 'h' + moment.duration(day11.diff(serverTime)).minutes() + 'm';
    $scope.day11TimeLeft = moment.duration(day12.diff(serverTime)).hours() + 'h' + moment.duration(day12.diff(serverTime)).minutes() + 'm';
    $scope.day12TimeLeft = moment.duration(day13.diff(serverTime)).hours() + 'h' + moment.duration(day13.diff(serverTime)).minutes() + 'm';
    $scope.day13TimeLeft = moment.duration(day14.diff(serverTime)).hours() + 'h' + moment.duration(day14.diff(serverTime)).minutes() + 'm';
    $scope.day14TimeLeft = moment.duration(day15.diff(serverTime)).hours() + 'h' + moment.duration(day15.diff(serverTime)).minutes() + 'm';

    if (day1.diff(serverTime) < 0 && day2.diff(serverTime) > 0) {
        console.log('day 1 open');
        $('.day1 .tile-locked').hide();
    } else if (day2.diff(serverTime) < 0 && day3.diff(serverTime) > 0) {
        console.log('day 2 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
    } else if (day3.diff(serverTime) < 0 && day4.diff(serverTime) > 0) {
        console.log('day 3 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
        $('.day2').css('opacity', 0.3);
    } else if (day4.diff(serverTime) < 0 && day5.diff(serverTime) > 0) {
        console.log('day 4 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day3 .time-left').hide();
        $('.day3 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day4 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
        $('.day2').css('opacity', 0.3);
        $('.day3').css('opacity', 0.3);
    } else if (day5.diff(serverTime) < 0 && day6.diff(serverTime) > 0) {
        console.log('day 5 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day3 .time-left').hide();
        $('.day3 .finished').css('display', 'inline-block');
        $('.day4 .time-left').hide();
        $('.day4 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day4 .tile-locked').hide();
        $('.day5 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
        $('.day2').css('opacity', 0.3);
        $('.day3').css('opacity', 0.3);
        $('.day4').css('opacity', 0.3);
    } else if (day6.diff(serverTime) < 0 && day7.diff(serverTime) > 0) {
        console.log('day 6 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day3 .time-left').hide();
        $('.day3 .finished').css('display', 'inline-block');
        $('.day4 .time-left').hide();
        $('.day4 .finished').css('display', 'inline-block');
        $('.day5 .time-left').hide();
        $('.day5 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day4 .tile-locked').hide();
        $('.day5 .tile-locked').hide();
        $('.day6 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
        $('.day2').css('opacity', 0.3);
        $('.day3').css('opacity', 0.3);
        $('.day4').css('opacity', 0.3);
        $('.day5').css('opacity', 0.3);
    } else if (day7.diff(serverTime) < 0 && day8.diff(serverTime) > 0) {
        console.log('day 7 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day3 .time-left').hide();
        $('.day3 .finished').css('display', 'inline-block');
        $('.day4 .time-left').hide();
        $('.day4 .finished').css('display', 'inline-block');
        $('.day5 .time-left').hide();
        $('.day5 .finished').css('display', 'inline-block');
        $('.day6 .time-left').hide();
        $('.day6 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day4 .tile-locked').hide();
        $('.day5 .tile-locked').hide();
        $('.day6 .tile-locked').hide();
        $('.day7 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
        $('.day2').css('opacity', 0.3);
        $('.day3').css('opacity', 0.3);
        $('.day4').css('opacity', 0.3);
        $('.day5').css('opacity', 0.3);
        $('.day6').css('opacity', 0.3);
    } else if (day8.diff(serverTime) < 0 && day9.diff(serverTime) > 0) {
        console.log('day 8 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day3 .time-left').hide();
        $('.day3 .finished').css('display', 'inline-block');
        $('.day4 .time-left').hide();
        $('.day4 .finished').css('display', 'inline-block');
        $('.day5 .time-left').hide();
        $('.day5 .finished').css('display', 'inline-block');
        $('.day6 .time-left').hide();
        $('.day6 .finished').css('display', 'inline-block');
        $('.day7 .time-left').hide();
        $('.day7 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day4 .tile-locked').hide();
        $('.day5 .tile-locked').hide();
        $('.day6 .tile-locked').hide();
        $('.day7 .tile-locked').hide();
        $('.day8 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
        $('.day2').css('opacity', 0.3);
        $('.day3').css('opacity', 0.3);
        $('.day4').css('opacity', 0.3);
        $('.day5').css('opacity', 0.3);
        $('.day6').css('opacity', 0.3);
        $('.day7').css('opacity', 0.3);
    } else if (day9.diff(serverTime) < 0 && day10.diff(serverTime) > 0) {
        console.log('day 9 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day3 .time-left').hide();
        $('.day3 .finished').css('display', 'inline-block');
        $('.day4 .time-left').hide();
        $('.day4 .finished').css('display', 'inline-block');
        $('.day5 .time-left').hide();
        $('.day5 .finished').css('display', 'inline-block');
        $('.day6 .time-left').hide();
        $('.day6 .finished').css('display', 'inline-block');
        $('.day7 .time-left').hide();
        $('.day7 .finished').css('display', 'inline-block');
        $('.day8 .time-left').hide();
        $('.day8 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day4 .tile-locked').hide();
        $('.day5 .tile-locked').hide();
        $('.day6 .tile-locked').hide();
        $('.day7 .tile-locked').hide();
        $('.day8 .tile-locked').hide();
        $('.day9 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
        $('.day2').css('opacity', 0.3);
        $('.day3').css('opacity', 0.3);
        $('.day4').css('opacity', 0.3);
        $('.day5').css('opacity', 0.3);
        $('.day6').css('opacity', 0.3);
        $('.day7').css('opacity', 0.3);
        $('.day8').css('opacity', 0.3);
    } else if (day10.diff(serverTime) < 0 && day11.diff(serverTime) > 0) {
        console.log('day 10 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day3 .time-left').hide();
        $('.day3 .finished').css('display', 'inline-block');
        $('.day4 .time-left').hide();
        $('.day4 .finished').css('display', 'inline-block');
        $('.day5 .time-left').hide();
        $('.day5 .finished').css('display', 'inline-block');
        $('.day6 .time-left').hide();
        $('.day6 .finished').css('display', 'inline-block');
        $('.day7 .time-left').hide();
        $('.day7 .finished').css('display', 'inline-block');
        $('.day8 .time-left').hide();
        $('.day8 .finished').css('display', 'inline-block');
        $('.day9 .time-left').hide();
        $('.day9 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day4 .tile-locked').hide();
        $('.day5 .tile-locked').hide();
        $('.day6 .tile-locked').hide();
        $('.day7 .tile-locked').hide();
        $('.day8 .tile-locked').hide();
        $('.day9 .tile-locked').hide();
        $('.day10 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
        $('.day2').css('opacity', 0.3);
        $('.day3').css('opacity', 0.3);
        $('.day4').css('opacity', 0.3);
        $('.day5').css('opacity', 0.3);
        $('.day6').css('opacity', 0.3);
        $('.day7').css('opacity', 0.3);
        $('.day8').css('opacity', 0.3);
        $('.day9').css('opacity', 0.3);
    } else if (day11.diff(serverTime) < 0 && day12.diff(serverTime) > 0) {
        console.log('day 11 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day3 .time-left').hide();
        $('.day3 .finished').css('display', 'inline-block');
        $('.day4 .time-left').hide();
        $('.day4 .finished').css('display', 'inline-block');
        $('.day5 .time-left').hide();
        $('.day5 .finished').css('display', 'inline-block');
        $('.day6 .time-left').hide();
        $('.day6 .finished').css('display', 'inline-block');
        $('.day7 .time-left').hide();
        $('.day7 .finished').css('display', 'inline-block');
        $('.day8 .time-left').hide();
        $('.day8 .finished').css('display', 'inline-block');
        $('.day9 .time-left').hide();
        $('.day9 .finished').css('display', 'inline-block');
        $('.day10 .time-left').hide();
        $('.day10 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day4 .tile-locked').hide();
        $('.day5 .tile-locked').hide();
        $('.day6 .tile-locked').hide();
        $('.day7 .tile-locked').hide();
        $('.day8 .tile-locked').hide();
        $('.day9 .tile-locked').hide();
        $('.day10 .tile-locked').hide();
        $('.day11 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
        $('.day2').css('opacity', 0.3);
        $('.day3').css('opacity', 0.3);
        $('.day4').css('opacity', 0.3);
        $('.day5').css('opacity', 0.3);
        $('.day6').css('opacity', 0.3);
        $('.day7').css('opacity', 0.3);
        $('.day8').css('opacity', 0.3);
        $('.day9').css('opacity', 0.3);
        $('.day10').css('opacity', 0.3);
    } else if (day12.diff(serverTime) < 0 && day13.diff(serverTime) > 0) {
        console.log('day 12 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day3 .time-left').hide();
        $('.day3 .finished').css('display', 'inline-block');
        $('.day4 .time-left').hide();
        $('.day4 .finished').css('display', 'inline-block');
        $('.day5 .time-left').hide();
        $('.day5 .finished').css('display', 'inline-block');
        $('.day6 .time-left').hide();
        $('.day6 .finished').css('display', 'inline-block');
        $('.day7 .time-left').hide();
        $('.day7 .finished').css('display', 'inline-block');
        $('.day8 .time-left').hide();
        $('.day8 .finished').css('display', 'inline-block');
        $('.day9 .time-left').hide();
        $('.day9 .finished').css('display', 'inline-block');
        $('.day10 .time-left').hide();
        $('.day10 .finished').css('display', 'inline-block');
        $('.day11 .time-left').hide();
        $('.day11 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day4 .tile-locked').hide();
        $('.day5 .tile-locked').hide();
        $('.day6 .tile-locked').hide();
        $('.day7 .tile-locked').hide();
        $('.day8 .tile-locked').hide();
        $('.day9 .tile-locked').hide();
        $('.day10 .tile-locked').hide();
        $('.day11 .tile-locked').hide();
        $('.day12 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
        $('.day2').css('opacity', 0.3);
        $('.day3').css('opacity', 0.3);
        $('.day4').css('opacity', 0.3);
        $('.day5').css('opacity', 0.3);
        $('.day6').css('opacity', 0.3);
        $('.day7').css('opacity', 0.3);
        $('.day8').css('opacity', 0.3);
        $('.day9').css('opacity', 0.3);
        $('.day10').css('opacity', 0.3);
        $('.day11').css('opacity', 0.3);
    } else if (day13.diff(serverTime) < 0 && day14.diff(serverTime) > 0) {
        console.log('day 13 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day3 .time-left').hide();
        $('.day3 .finished').css('display', 'inline-block');
        $('.day4 .time-left').hide();
        $('.day4 .finished').css('display', 'inline-block');
        $('.day5 .time-left').hide();
        $('.day5 .finished').css('display', 'inline-block');
        $('.day6 .time-left').hide();
        $('.day6 .finished').css('display', 'inline-block');
        $('.day7 .time-left').hide();
        $('.day7 .finished').css('display', 'inline-block');
        $('.day8 .time-left').hide();
        $('.day8 .finished').css('display', 'inline-block');
        $('.day9 .time-left').hide();
        $('.day9 .finished').css('display', 'inline-block');
        $('.day10 .time-left').hide();
        $('.day10 .finished').css('display', 'inline-block');
        $('.day11 .time-left').hide();
        $('.day11 .finished').css('display', 'inline-block');
        $('.day12 .time-left').hide();
        $('.day12 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day4 .tile-locked').hide();
        $('.day5 .tile-locked').hide();
        $('.day6 .tile-locked').hide();
        $('.day7 .tile-locked').hide();
        $('.day8 .tile-locked').hide();
        $('.day9 .tile-locked').hide();
        $('.day10 .tile-locked').hide();
        $('.day11 .tile-locked').hide();
        $('.day12 .tile-locked').hide();
        $('.day13 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
        $('.day2').css('opacity', 0.3);
        $('.day3').css('opacity', 0.3);
        $('.day4').css('opacity', 0.3);
        $('.day5').css('opacity', 0.3);
        $('.day6').css('opacity', 0.3);
        $('.day7').css('opacity', 0.3);
        $('.day8').css('opacity', 0.3);
        $('.day9').css('opacity', 0.3);
        $('.day10').css('opacity', 0.3);
        $('.day11').css('opacity', 0.3);
        $('.day12').css('opacity', 0.3);
    } else if (day14.diff(serverTime) < 0 && day15.diff(serverTime) > 0) {
        console.log('day 14 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day3 .time-left').hide();
        $('.day3 .finished').css('display', 'inline-block');
        $('.day4 .time-left').hide();
        $('.day4 .finished').css('display', 'inline-block');
        $('.day5 .time-left').hide();
        $('.day5 .finished').css('display', 'inline-block');
        $('.day6 .time-left').hide();
        $('.day6 .finished').css('display', 'inline-block');
        $('.day7 .time-left').hide();
        $('.day7 .finished').css('display', 'inline-block');
        $('.day8 .time-left').hide();
        $('.day8 .finished').css('display', 'inline-block');
        $('.day9 .time-left').hide();
        $('.day9 .finished').css('display', 'inline-block');
        $('.day10 .time-left').hide();
        $('.day10 .finished').css('display', 'inline-block');
        $('.day11 .time-left').hide();
        $('.day11 .finished').css('display', 'inline-block');
        $('.day12 .time-left').hide();
        $('.day12 .finished').css('display', 'inline-block');
        $('.day13 .time-left').hide();
        $('.day13 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day4 .tile-locked').hide();
        $('.day5 .tile-locked').hide();
        $('.day6 .tile-locked').hide();
        $('.day7 .tile-locked').hide();
        $('.day8 .tile-locked').hide();
        $('.day9 .tile-locked').hide();
        $('.day10 .tile-locked').hide();
        $('.day11 .tile-locked').hide();
        $('.day12 .tile-locked').hide();
        $('.day13 .tile-locked').hide();
        $('.day14 .tile-locked').hide();
        $('.day1').css('opacity', 0.3);
        $('.day2').css('opacity', 0.3);
        $('.day3').css('opacity', 0.3);
        $('.day4').css('opacity', 0.3);
        $('.day5').css('opacity', 0.3);
        $('.day6').css('opacity', 0.3);
        $('.day7').css('opacity', 0.3);
        $('.day8').css('opacity', 0.3);
        $('.day9').css('opacity', 0.3);
        $('.day10').css('opacity', 0.3);
        $('.day11').css('opacity', 0.3);
        $('.day12').css('opacity', 0.3);
        $('.day13').css('opacity', 0.3);
    } else if (day15.diff(serverTime) < 0) {
        console.log('day 14 open');
        $('.day1 .time-left').hide();
        $('.day1 .finished').css('display', 'inline-block');
        $('.day2 .time-left').hide();
        $('.day2 .finished').css('display', 'inline-block');
        $('.day3 .time-left').hide();
        $('.day3 .finished').css('display', 'inline-block');
        $('.day4 .time-left').hide();
        $('.day4 .finished').css('display', 'inline-block');
        $('.day5 .time-left').hide();
        $('.day5 .finished').css('display', 'inline-block');
        $('.day6 .time-left').hide();
        $('.day6 .finished').css('display', 'inline-block');
        $('.day7 .time-left').hide();
        $('.day7 .finished').css('display', 'inline-block');
        $('.day8 .time-left').hide();
        $('.day8 .finished').css('display', 'inline-block');
        $('.day9 .time-left').hide();
        $('.day9 .finished').css('display', 'inline-block');
        $('.day10 .time-left').hide();
        $('.day10 .finished').css('display', 'inline-block');
        $('.day11 .time-left').hide();
        $('.day11 .finished').css('display', 'inline-block');
        $('.day12 .time-left').hide();
        $('.day12 .finished').css('display', 'inline-block');
        $('.day13 .time-left').hide();
        $('.day13 .finished').css('display', 'inline-block');
        $('.day14 .time-left').hide();
        $('.day14 .finished').css('display', 'inline-block');
        $('.day1 .tile-locked').hide();
        $('.day2 .tile-locked').hide();
        $('.day3 .tile-locked').hide();
        $('.day4 .tile-locked').hide();
        $('.day5 .tile-locked').hide();
        $('.day6 .tile-locked').hide();
        $('.day7 .tile-locked').hide();
        $('.day8 .tile-locked').hide();
        $('.day9 .tile-locked').hide();
        $('.day10 .tile-locked').hide();
        $('.day11 .tile-locked').hide();
        $('.day12 .tile-locked').hide();
        $('.day13 .tile-locked').hide();
        $('.day14 .tile-locked').hide();
        $('.tile').css('opacity', 0.3);
    }

}]);