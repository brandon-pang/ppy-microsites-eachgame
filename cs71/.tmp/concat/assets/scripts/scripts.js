!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else this[name] = definition()
}('angular-bowser', function () {

  angular.module('jlareau.bowser', []).factory('bowser', function(){

      /*!
       * Bowser - a browser detector
       * https://github.com/ded/bowser
       * MIT License | (c) Dustin Diaz 2015
       */

      var t = true

      function detect(ua) {

        function getFirstMatch(regex) {
          var match = ua.match(regex);
          return (match && match.length > 1 && match[1]) || '';
        }

        function getSecondMatch(regex) {
          var match = ua.match(regex);
          return (match && match.length > 1 && match[2]) || '';
        }

        var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
            , likeAndroid = /like android/i.test(ua)
            , android = !likeAndroid && /android/i.test(ua)
            , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
            , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
            , chromeos = /CrOS/.test(ua)
            , silk = /silk/i.test(ua)
            , sailfish = /sailfish/i.test(ua)
            , tizen = /tizen/i.test(ua)
            , webos = /(web|hpw)os/i.test(ua)
            , windowsphone = /windows phone/i.test(ua)
            , windows = !windowsphone && /windows/i.test(ua)
            , mac = !iosdevice && !silk && /macintosh/i.test(ua)
            , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
            , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
            , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
            , tablet = /tablet/i.test(ua)
            , mobile = !tablet && /[^-]mobi/i.test(ua)
            , xbox = /xbox/i.test(ua)
            , result

        if (/opera|opr|opios/i.test(ua)) {
          result = {
            name: 'Opera'
            , opera: t
            , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
          }
        }
        else if (/coast/i.test(ua)) {
          result = {
            name: 'Opera Coast'
            , coast: t
            , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
          }
        }
        else if (/yabrowser/i.test(ua)) {
          result = {
            name: 'Yandex Browser'
            , yandexbrowser: t
            , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
          }
        }
        else if (/ucbrowser/i.test(ua)) {
          result = {
            name: 'UC Browser'
            , ucbrowser: t
            , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
          }
        }
        else if (/mxios/i.test(ua)) {
          result = {
            name: 'Maxthon'
            , maxthon: t
            , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
          }
        }
        else if (/epiphany/i.test(ua)) {
          result = {
            name: 'Epiphany'
            , epiphany: t
            , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
          }
        }
        else if (/puffin/i.test(ua)) {
          result = {
            name: 'Puffin'
            , puffin: t
            , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
          }
        }
        else if (/sleipnir/i.test(ua)) {
          result = {
            name: 'Sleipnir'
            , sleipnir: t
            , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
          }
        }
        else if (/k-meleon/i.test(ua)) {
          result = {
            name: 'K-Meleon'
            , kMeleon: t
            , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
          }
        }
        else if (windowsphone) {
          result = {
            name: 'Windows Phone'
            , windowsphone: t
          }
          if (edgeVersion) {
            result.msedge = t
            result.version = edgeVersion
          }
          else {
            result.msie = t
            result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
          }
        }
        else if (/msie|trident/i.test(ua)) {
          result = {
            name: 'Internet Explorer'
            , msie: t
            , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
          }
        } else if (chromeos) {
          result = {
            name: 'Chrome'
            , chromeos: t
            , chromeBook: t
            , chrome: t
            , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
          }
        } else if (/chrome.+? edge/i.test(ua)) {
          result = {
            name: 'Microsoft Edge'
            , msedge: t
            , version: edgeVersion
          }
        }
        else if (/vivaldi/i.test(ua)) {
          result = {
            name: 'Vivaldi'
            , vivaldi: t
            , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
          }
        }
        else if (sailfish) {
          result = {
            name: 'Sailfish'
            , sailfish: t
            , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
          }
        }
        else if (/seamonkey\//i.test(ua)) {
          result = {
            name: 'SeaMonkey'
            , seamonkey: t
            , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
          }
        }
        else if (/firefox|iceweasel|fxios/i.test(ua)) {
          result = {
            name: 'Firefox'
            , firefox: t
            , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
          }
          if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
            result.firefoxos = t
          }
        }
        else if (silk) {
          result =  {
            name: 'Amazon Silk'
            , silk: t
            , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
          }
        }
        else if (/phantom/i.test(ua)) {
          result = {
            name: 'PhantomJS'
            , phantom: t
            , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
          }
        }
        else if (/slimerjs/i.test(ua)) {
          result = {
            name: 'SlimerJS'
            , slimer: t
            , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
          }
        }
        else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
          result = {
            name: 'BlackBerry'
            , blackberry: t
            , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
          }
        }
        else if (webos) {
          result = {
            name: 'WebOS'
            , webos: t
            , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
          };
          /touchpad\//i.test(ua) && (result.touchpad = t)
        }
        else if (/bada/i.test(ua)) {
          result = {
            name: 'Bada'
            , bada: t
            , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
          };
        }
        else if (tizen) {
          result = {
            name: 'Tizen'
            , tizen: t
            , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
          };
        }
        else if (/qupzilla/i.test(ua)) {
          result = {
            name: 'QupZilla'
            , qupzilla: t
            , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
          }
        }
        else if (/chromium/i.test(ua)) {
          result = {
            name: 'Chromium'
            , chromium: t
            , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
          }
        }
        else if (/chrome|crios|crmo/i.test(ua)) {
          result = {
            name: 'Chrome'
            , chrome: t
            , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
          }
        }
        else if (android) {
          result = {
            name: 'Android'
            , version: versionIdentifier
          }
        }
        else if (/safari|applewebkit/i.test(ua)) {
          result = {
            name: 'Safari'
            , safari: t
          }
          if (versionIdentifier) {
            result.version = versionIdentifier
          }
        }
        else if (iosdevice) {
          result = {
            name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
          }
          // WTF: version is not part of user agent in web apps
          if (versionIdentifier) {
            result.version = versionIdentifier
          }
        }
        else if(/googlebot/i.test(ua)) {
          result = {
            name: 'Googlebot'
            , googlebot: t
            , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
          }
        }
        else {
          result = {
            name: getFirstMatch(/^(.*)\/(.*) /),
            version: getSecondMatch(/^(.*)\/(.*) /)
          };
        }

        // set webkit or gecko flag for browsers based on these engines
        if (!result.msedge && /(apple)?webkit/i.test(ua)) {
          if (/(apple)?webkit\/537\.36/i.test(ua)) {
            result.name = result.name || "Blink"
            result.blink = t
          } else {
            result.name = result.name || "Webkit"
            result.webkit = t
          }
          if (!result.version && versionIdentifier) {
            result.version = versionIdentifier
          }
        } else if (!result.opera && /gecko\//i.test(ua)) {
          result.name = result.name || "Gecko"
          result.gecko = t
          result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
        }

        // set OS flags for platforms that have multiple browsers
        if (!result.msedge && (android || result.silk)) {
          result.android = t
        } else if (iosdevice) {
          result[iosdevice] = t
          result.ios = t
        } else if (mac) {
          result.mac = t
        } else if (xbox) {
          result.xbox = t
        } else if (windows) {
          result.windows = t
        } else if (linux) {
          result.linux = t
        }

        // OS version extraction
        var osVersion = '';
        if (result.windowsphone) {
          osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
        } else if (iosdevice) {
          osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
          osVersion = osVersion.replace(/[_\s]/g, '.');
        } else if (android) {
          osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
        } else if (result.webos) {
          osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
        } else if (result.blackberry) {
          osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
        } else if (result.bada) {
          osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
        } else if (result.tizen) {
          osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
        }
        if (osVersion) {
          result.osversion = osVersion;
        }

        // device type extraction
        var osMajorVersion = osVersion.split('.')[0];
        if (
            tablet
            || nexusTablet
            || iosdevice == 'ipad'
            || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
            || result.silk
        ) {
          result.tablet = t
        } else if (
            mobile
            || iosdevice == 'iphone'
            || iosdevice == 'ipod'
            || android
            || nexusMobile
            || result.blackberry
            || result.webos
            || result.bada
        ) {
          result.mobile = t
        }

        // Graded Browser Support
        // http://developer.yahoo.com/yui/articles/gbs
        if (result.msedge ||
            (result.msie && result.version >= 10) ||
            (result.yandexbrowser && result.version >= 15) ||
            (result.vivaldi && result.version >= 1.0) ||
            (result.chrome && result.version >= 20) ||
            (result.firefox && result.version >= 20.0) ||
            (result.safari && result.version >= 6) ||
            (result.opera && result.version >= 10.0) ||
            (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
            (result.blackberry && result.version >= 10.1)
        ) {
          result.a = t;
        }
        else if ((result.msie && result.version < 10) ||
            (result.chrome && result.version < 20) ||
            (result.firefox && result.version < 20.0) ||
            (result.safari && result.version < 6) ||
            (result.opera && result.version < 10.0) ||
            (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        ) {
          result.c = t
        } else result.x = t

        return result
      }

      var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

      bowser.test = function (browserList) {
        for (var i = 0; i < browserList.length; ++i) {
          var browserItem = browserList[i];
          if (typeof browserItem=== 'string') {
            if (browserItem in bowser) {
              return true;
            }
          }
        }
        return false;
      }

      /*
       * Set our detect method to the main bowser object so we can
       * reuse it to test other user agents.
       * This is needed to implement future tests.
       */
      bowser._detect = detect;

      return bowser
    });

});

angular.module('angular-preload-image', []);
angular.module('angular-preload-image').factory('preLoader', function(){
    return function (url, successCallback, errorCallback) {
        //Thank you Adriaan for this little snippet: http://www.bennadel.com/members/11887-adriaan.htm
        angular.element(new Image()).bind('load', function(){
            successCallback();
        }).bind('error', function(){
            errorCallback();
        }).attr('src', url);
    }
});
angular.module('angular-preload-image').directive('preloadImage', ['preLoader', function(preLoader){
    return {
        restrict: 'A',
        terminal: true,
        priority: 100,
        link: function(scope, element, attrs) {
            var url = attrs.ngSrc;
            scope.default = attrs.defaultImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=";
            attrs.$set('src', scope.default);
            preLoader(url, function(){
                attrs.$set('src', url);
            }, function(){
                if (attrs.fallbackImage != undefined) {
                    attrs.$set('src', attrs.fallbackImage);
                }
            });
        }
    };
}]);
angular.module('angular-preload-image').directive('preloadBgImage', ['preLoader', function(preLoader){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (attrs.preloadBgImage != undefined) {
                //Define default image
                scope.default = attrs.defaultImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=";
                element.css({
                    'background-image': 'url("' + scope.default + '")'
                });
                preLoader(attrs.preloadBgImage, function(){
                    element.css({
                        'background-image': 'url("' + attrs.preloadBgImage + '")'
                    });
                }, function(){
                    if (attrs.fallbackImage != undefined) {
                        element.css({
                            'background-image': 'url("' + attrs.fallbackImage + '")'
                        });
                    }
                });
            }
        }
    };
}]);
var app = angular.module('cs71', [
    'ngCookies',
    'ngStorage',
    'ui.router',
    'jlareau.bowser',
    'angular-preload-image',
    'pascalprecht.translate',
    'angularMoment'
]);

app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useStaticFilesLoader({
        prefix: 'http://d3mrh9k3iunait.cloudfront.net/static/event/cs71/assets/locale/',
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
