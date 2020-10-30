'use strict';

app.service('myInfo', function($http, $q) {
	var deferred = $q.defer();
	$http.jsonp('http://io.papayaplay.com/auth/user.do?callback=JSON_CALLBACK').then(function(res) {
		deferred.resolve(res);
	});
	
	this.getMyInfo = function() {
		return deferred.promise;
	}
});