!function(e,i){"undefined"!=typeof module&&module.exports?module.exports=i():"function"==typeof define&&define.amd?define(i):this[e]=i()}("angular-bowser",function(){angular.module("jlareau.bowser",[]).factory("bowser",function(){function e(e){function s(i){var s=e.match(i);return s&&s.length>1&&s[1]||""}function o(i){var s=e.match(i);return s&&s.length>1&&s[2]||""}var n=s(/(ipod|iphone|ipad)/i).toLowerCase(),r=/like android/i.test(e),t=!r&&/android/i.test(e),a=/nexus\s*[0-6]\s*/i.test(e),d=!a&&/nexus\s*[0-9]+/i.test(e),m=/CrOS/.test(e),l=/silk/i.test(e),v=/sailfish/i.test(e),p=/tizen/i.test(e),b=/(web|hpw)os/i.test(e),c=/windows phone/i.test(e),f=!c&&/windows/i.test(e),h=!n&&!l&&/macintosh/i.test(e),u=!t&&!v&&!p&&!b&&/linux/i.test(e),w=s(/edge\/(\d+(\.\d+)?)/i),k=s(/version\/(\d+(\.\d+)?)/i),x=/tablet/i.test(e),g=!x&&/[^-]mobi/i.test(e),y=/xbox/i.test(e),z;/opera|opr|opios/i.test(e)?z={name:"Opera",opera:i,version:k||s(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)}:/coast/i.test(e)?z={name:"Opera Coast",coast:i,version:k||s(/(?:coast)[\s\/](\d+(\.\d+)?)/i)}:/yabrowser/i.test(e)?z={name:"Yandex Browser",yandexbrowser:i,version:k||s(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)}:/ucbrowser/i.test(e)?z={name:"UC Browser",ucbrowser:i,version:s(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)}:/mxios/i.test(e)?z={name:"Maxthon",maxthon:i,version:s(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)}:/epiphany/i.test(e)?z={name:"Epiphany",epiphany:i,version:s(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)}:/puffin/i.test(e)?z={name:"Puffin",puffin:i,version:s(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)}:/sleipnir/i.test(e)?z={name:"Sleipnir",sleipnir:i,version:s(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)}:/k-meleon/i.test(e)?z={name:"K-Meleon",kMeleon:i,version:s(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)}:c?(z={name:"Windows Phone",windowsphone:i},w?(z.msedge=i,z.version=w):(z.msie=i,z.version=s(/iemobile\/(\d+(\.\d+)?)/i))):/msie|trident/i.test(e)?z={name:"Internet Explorer",msie:i,version:s(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:m?z={name:"Chrome",chromeos:i,chromeBook:i,chrome:i,version:s(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:/chrome.+? edge/i.test(e)?z={name:"Microsoft Edge",msedge:i,version:w}:/vivaldi/i.test(e)?z={name:"Vivaldi",vivaldi:i,version:s(/vivaldi\/(\d+(\.\d+)?)/i)||k}:v?z={name:"Sailfish",sailfish:i,version:s(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}:/seamonkey\//i.test(e)?z={name:"SeaMonkey",seamonkey:i,version:s(/seamonkey\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel|fxios/i.test(e)?(z={name:"Firefox",firefox:i,version:s(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)},/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(e)&&(z.firefoxos=i)):l?z={name:"Amazon Silk",silk:i,version:s(/silk\/(\d+(\.\d+)?)/i)}:/phantom/i.test(e)?z={name:"PhantomJS",phantom:i,version:s(/phantomjs\/(\d+(\.\d+)?)/i)}:/slimerjs/i.test(e)?z={name:"SlimerJS",slimer:i,version:s(/slimerjs\/(\d+(\.\d+)?)/i)}:/blackberry|\bbb\d+/i.test(e)||/rim\stablet/i.test(e)?z={name:"BlackBerry",blackberry:i,version:k||s(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}:b?(z={name:"WebOS",webos:i,version:k||s(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)},/touchpad\//i.test(e)&&(z.touchpad=i)):/bada/i.test(e)?z={name:"Bada",bada:i,version:s(/dolfin\/(\d+(\.\d+)?)/i)}:p?z={name:"Tizen",tizen:i,version:s(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||k}:/qupzilla/i.test(e)?z={name:"QupZilla",qupzilla:i,version:s(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i)||k}:/chromium/i.test(e)?z={name:"Chromium",chromium:i,version:s(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i)||k}:/chrome|crios|crmo/i.test(e)?z={name:"Chrome",chrome:i,version:s(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:t?z={name:"Android",version:k}:/safari|applewebkit/i.test(e)?(z={name:"Safari",safari:i},k&&(z.version=k)):n?(z={name:"iphone"==n?"iPhone":"ipad"==n?"iPad":"iPod"},k&&(z.version=k)):z=/googlebot/i.test(e)?{name:"Googlebot",googlebot:i,version:s(/googlebot\/(\d+(\.\d+))/i)||k}:{name:s(/^(.*)\/(.*) /),version:o(/^(.*)\/(.*) /)},!z.msedge&&/(apple)?webkit/i.test(e)?(/(apple)?webkit\/537\.36/i.test(e)?(z.name=z.name||"Blink",z.blink=i):(z.name=z.name||"Webkit",z.webkit=i),!z.version&&k&&(z.version=k)):!z.opera&&/gecko\//i.test(e)&&(z.name=z.name||"Gecko",z.gecko=i,z.version=z.version||s(/gecko\/(\d+(\.\d+)?)/i)),z.msedge||!t&&!z.silk?n?(z[n]=i,z.ios=i):h?z.mac=i:y?z.xbox=i:f?z.windows=i:u&&(z.linux=i):z.android=i;var S="";z.windowsphone?S=s(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i):n?(S=s(/os (\d+([_\s]\d+)*) like mac os x/i),S=S.replace(/[_\s]/g,".")):t?S=s(/android[ \/-](\d+(\.\d+)*)/i):z.webos?S=s(/(?:web|hpw)os\/(\d+(\.\d+)*)/i):z.blackberry?S=s(/rim\stablet\sos\s(\d+(\.\d+)*)/i):z.bada?S=s(/bada\/(\d+(\.\d+)*)/i):z.tizen&&(S=s(/tizen[\/\s](\d+(\.\d+)*)/i)),S&&(z.osversion=S);var B=S.split(".")[0];return x||d||"ipad"==n||t&&(3==B||B>=4&&!g)||z.silk?z.tablet=i:(g||"iphone"==n||"ipod"==n||t||a||z.blackberry||z.webos||z.bada)&&(z.mobile=i),z.msedge||z.msie&&z.version>=10||z.yandexbrowser&&z.version>=15||z.vivaldi&&z.version>=1||z.chrome&&z.version>=20||z.firefox&&z.version>=20||z.safari&&z.version>=6||z.opera&&z.version>=10||z.ios&&z.osversion&&z.osversion.split(".")[0]>=6||z.blackberry&&z.version>=10.1?z.a=i:z.msie&&z.version<10||z.chrome&&z.version<20||z.firefox&&z.version<20||z.safari&&z.version<6||z.opera&&z.version<10||z.ios&&z.osversion&&z.osversion.split(".")[0]<6?z.c=i:z.x=i,z}var i=!0,s=e("undefined"!=typeof navigator?navigator.userAgent:"");return s.test=function(e){for(var i=0;i<e.length;++i){var o=e[i];if("string"==typeof o&&o in s)return!0}return!1},s._detect=e,s})});