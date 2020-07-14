'use strict';

app.service('LoginService', function($http, $q) {
	var self = {
		userid: null,
		unid: null,
		photo: null,
		isLogin: false,
		load: function() {
			var d = $q.defer();

			$http.jsonp('http://io.papayaplay.com/auth/user.do?callback=JSON_CALLBACK')
			.success(function (res) {
				//console.log(res);
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
	self.load();
	return self;
});

app.service('EventService', function($http, $q, LoginService) {
	var self = {
		serverTime: null,
		missions: [],
		missionCompleted: 0,

		getServerTime: function () {
			var d = $q.defer();

			$http({
				method: 'jsonp',
				url: 'http://io.papayaplay.com/json.do?callback=JSON_CALLBACK',
				params: { cm: 'Service.Board.GetServerTime' }
			})
			.success(function(res) {
				//console.log(res);
				if (res.ResultCode[0].Code == 10000) {
					//'2017-09-15 00:00:00.017'
					//res.ServerTime[0].ServerTime;
					self.serverTime = res.ServerTime[0].ServerTime;
					//console.log(self.serverTime);
					d.resolve(self.serverTime);
				}
			})
			.error(function () {
				d.reject(res);
			});

			return d.promise;
		},

		getEventResult: function() {
			var d = $q.defer();

			$http({
				method: 'jsonp',
				url: 'http://io.papayaplay.com/json.do?callback=JSON_CALLBACK',
				params : { cm: 'Service.Event.GetEventResult_BSCS76' },
			})
			.success(function(res) {
				self.teamType='N';
				self.teamPointA=0;
				self.teamPointB=0;
				if (res.ResultCode[0].Code == 10000) {

					//TeamType: A, B, N
					var type=res.EventResult[0].TeamType;
					var pointA=res.EventResult[0].TeamAPoint;
					var pointB=res.EventResult[0].TeamBPoint;

					self.teamType=type;
					self.teamPointA=pointA;
					self.teamPointB=pointB;

					var perA=0;
					var perB=0;

					if(pointA>pointB){
						perB=(Math.floor((self.teamPointB/self.teamPointA)*50));
						perA=(100-perB);
					}else if(pointB>pointA){
						perA=(Math.floor((self.teamPointA/self.teamPointB)*50));
						perB=(100-perA);
					}else{
						perA=50;
						perB=50;
					}
					self.teamPerA=perA+'%';
					self.teamPerB=perB+'%';
					self.teamPosA=(perA-7)+'%';
					self.teamPosB=(perB-7)+'%';
				}
			})
			.error(function() {
				d.reject(res);
			});

			return d.promise;
		},

		setEventResult:function(req){
			self.teamSelectMsg = 'Waiting...'
			var d = $q.defer();

			$http({
				method: 'jsonp',
				url: 'http://io.papayaplay.com/json.do?callback=JSON_CALLBACK',
				params : { cm: 'Service.Event.SetTeamType_BSCS76', teamtype:req },
			})
			.success(function(res) {
				//console.log(res);
				var code=res.ResultCode[0].Code
				if (code == 10000) {
					self.teamSelectMsg = 'Team '+req+' Picked!'
					setTimeout(function () {
						self.teamSelectWindow=false;
						self.getEventResult();
					}, 1000)
				}else{
					self.teamSelectMsg = 'Request Error';
					setTimeout(function () {
						self.teamSelectWindow=false;
						location.reload();
					}, 2000)
				}
			})
			.error(function() {
				d.reject(res);
			});

			return d.promise;
		}
	};

	self.getServerTime().then(function () {
		self.getEventResult(LoginService.unid);
	});

	return self;
});
