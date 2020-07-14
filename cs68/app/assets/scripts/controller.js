'use strict';

app.controller('mainController', ['$scope', '$state', '$translate', '$document', '$localStorage', '$http', '$interval', '$timeout', '$mdDialog', 'myInfo', 'bowser', function ($scope, $state, $translate, $document, $localStorage, $http, $interval, $timeout, $mdDialog, myInfo, bowser) {
    var storageDefaultLang = localStorage[$translate.storageKey()];
    var browserDefaultLang = $translate.preferredLanguage();

    $scope.browser = bowser.name;
    
    $scope.isLogin = false;
    $scope.isActive = 0;
    $scope.mapActive = 0;
    
    $scope.awpPriceActive = 0;
    $scope.awpActive = true;
    $scope.awpAngle = 0;

    $scope.fmgPriceActive = 0;
    $scope.fmgAngle = 0;

    $scope.ak47PriceActive = 0;
    $scope.ak47Angle = 0;

    $scope.katanaPriceActive = 0;
    $scope.katanaAngle = 0;

    $scope.enfieldPriceActive = 0;
    $scope.enfieldAngle = 0;

    $scope.awpBuyStatus = false;
    $scope.fmgBuyStatus = false;
    $scope.ak47BuyStatus = false;
    $scope.katanaBuyStatus = false;
    $scope.enfieldBuyStatus = false;

    var myInfo = myInfo.getMyInfo();
    myInfo.then(function (res) {
        if (res.data.ResultCode[0].Code === '10000') {
            $scope.isLogin = true;
            $scope.myInfo = res.data.UserInfo[0];

            $http({
                method: 'jsonp',
                url: 'http://io.papayaplay.com/json.do?callback=JSON_CALLBACK',
                params : { cm: 'Billing.Shop.GetUserBalance', serviceid: 1 }
            }).then(function successCallback(res) {
                $scope.balance = res.data.UserBalance[0].Amount;
            }, function errorCallback(res) {
                console.log('error');
            });
        } 
    });

    var itemInterval;
    itemInterval = $interval(function() {
        if ($scope.isActive === 0) {
            $scope.isActive = 1;    
        } else if ($scope.isActive === 1){
            $scope.isActive = 2;
        } else if ($scope.isActive === 2){
            $scope.isActive = 3;
        } else if ($scope.isActive === 3){
            $scope.isActive = 4;
        } else if ($scope.isActive === 4){
            $scope.isActive = 5;
        } else if ($scope.isActive === 5){
            $scope.isActive = 6;
        } else if ($scope.isActive === 6){
            $scope.isActive = 7;
        } else if ($scope.isActive === 7){
            $scope.isActive = 8;
        } else if ($scope.isActive === 8){
            $scope.isActive = 9;
        } else if ($scope.isActive === 9){
            $scope.isActive = 10;
        } else if ($scope.isActive === 10){
            $scope.isActive = 11;
        } else if ($scope.isActive === 11){
            $scope.isActive = 0;
        }
    }, 5000);

    $scope.stopItemInterval = function() {
        $interval.cancel(itemInterval);
    }

    var itemInterval2;
    itemInterval2 = $interval(function() {
        if ($scope.mapActive === 0) {
            $scope.mapActive = 1;    
        } else if ($scope.mapActive === 1){
            $scope.mapActive = 2;
        } else if ($scope.mapActive === 2){
            $scope.mapActive = 3;
        } else if ($scope.mapActive === 3){
            $scope.mapActive = 4;
        } else if ($scope.mapActive === 4){
            $scope.mapActive = 0;
        }
    }, 3000);

    $scope.confirm = function(code, name, duration, amount, event) {
        var data = {
            code: code,
            name: name, 
            duration: duration, 
            amount: amount, 
            balance: $scope.balance
        }
        if ($scope.isLogin === true) {
            if ($scope.balance < amount) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '../views/add.html',
                    clickOutsideToClose: true,
                    targetEvent: event,
                    locals: data
                })
                .then(function() {
                    console.log('dialog closed');
                }, function() {
                    console.log('cancelled');
                });
            } else {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '../views/buy.html',
                    clickOutsideToClose: true,
                    targetEvent: event,
                    locals: data
                })
                .then(function(data) {
                    $scope.balance = data.UserBalance[0].Amount;
                    if (data.ResultCode[0].Code === '10000') {
                        if (data.TransactionInfo[0].ItemID === '1012') {
                            $scope.awpBuyStatus = true;
                        } else if (data.TransactionInfo[0].ItemID === '935') {
                            $scope.fmgBuyStatus = true;
                        }  else if (data.TransactionInfo[0].ItemID === '582') {
                            $scope.ak47BuyStatus = true;
                        }  else if (data.TransactionInfo[0].ItemID === '988') {
                            $scope.katanaBuyStatus = true;
                        }  else if (data.TransactionInfo[0].ItemID === '890') {
                            $scope.enfieldBuyStatus = true;
                        }
                    }
                    
                }, function() {
                    console.log('cancelled');
                });
            }
        }
    }

    function DialogController($scope, $mdDialog, locals) {
        $scope.close = function() {
            $mdDialog.cancel();
        };

        $scope.showBuyBtn = true;

        $scope.balance = locals.balance;
        $scope.name = locals.name;
        $scope.duration = locals.duration;
        $scope.amount = locals.amount;

        var code = locals.code.toString();
        
        $scope.buyItem = function() {
            $scope.showBuyBtn = false;
            $http({
                method: 'jsonp',
                url: 'http://io.papayaplay.com/secured/json.do?callback=JSON_CALLBACK',
                //url: 'http://test.papayaplay.com:8080/io/secured/json.do?callback=JSON_CALLBACK', //for error tracking
                params: { cm: 'Billing.Shop.SetPurchaseItem_BSCS68', itemcode: code, itemexpiry: locals.duration }
            }).then(function successCallback(res) {
                console.log(res);
                $mdDialog.hide(res.data);
            }, function errorCallback(res) {
                $mdDialog.cancel();
                console.log('error');
            });
        }
    }

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
}]);