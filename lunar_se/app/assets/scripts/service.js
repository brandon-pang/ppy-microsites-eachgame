app.service('LoginService', function($http, $q) {
	var self = {
		userid: null,
		unid: null,
		photo: null,
		isLogin: false,
		getLoginResult: function() {
			var d = $q.defer();
			$http.jsonp('http://io.papayaplay.com/auth/user.do?callback=JSON_CALLBACK')
			.success(function (res) {
				console.log("loginService",res);
				if (res.ResultCode[0].Code == 10000) {
					self.unid = res.UserInfo[0].UNID;
					self.userid = res.UserInfo[0].UserID;
					self.photo = res.UserInfo[0].PIPath;
					self.isLogin = true;
					d.resolve(res);
				}
			})
			.error(function () {
				self.isLogin = false;
				d.reject(res);
			});
			return d.promise;
		}
	};
	self.getLoginResult();
	return self;
});

app.service('EventService', function($http, $q, LoginService) {
	var self = {
		serverTime: null,
		missions: [],
		missionCompleted: 0,
		isJoin:false,
		isJoinPopup:false,
		getServerTime: function () {
			var d = $q.defer();
			$http({
				method: 'jsonp',
				url: 'http://io.papayaplay.com/json.do?callback=JSON_CALLBACK',
				params: { cm: 'Service.Board.GetServerTime' }
			})
			.success(function(res) {
				console.log("servertime",res);
				if (res.ResultCode[0].Code == 10000) {
					self.serverTime = res.ServerTime[0].ServerTime;
					d.resolve(self.serverTime);
				}
			})
			.error(function () {
				d.reject(res);
			});

			return d.promise;
		},

		setJoinCountry:function(unid, code) {
			$http({
				method: 'jsonp',
				url: 'http://io.sea.papayaplay.com/secured/json.do?callback=JSON_CALLBACK',
				params : { cm: 'Service.Event.SetUser_BSSEACS80', unid: unid, countrycode: code },
			}).then(function successCallback(res) {
				console.log(res);
				location.reload();
			}, function errorCallback(response) {
				console.log('error');
			});
		},
		getEventUserEvent:function(unid){
			var d = $q.defer();
			$http({
				method: 'jsonp',
				url: 'http://io.sea.papayaplay.com/json.do?callback=JSON_CALLBACK',
				params : { cm: 'Service.Event.GetEventResult_BSSEACS80', unid: unid },
			})
			.success(function(res) {
				console.log("user", res);
				self.userData = res;
				if (res.UserData.length === 0 || res.UserData[0].Playtime === 0) {
					self.playTime = 3600;
				} else {
					self.playTime = 3600 - res.UserData[0].Playtime;
				}
				d.resolve(self.userData);
				console.log("self.userData ", self.userData );
			})
			.error(function() {
				d.reject(res);
			});
			return d.promise;
		}
	};

	self.getServerTime().then(function () {
		self.getEventUserEvent(LoginService.unid);
	});

	return self;
});


