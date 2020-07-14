'use strict';

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
	}
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
				//console.log("servertime",res);
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
		getEventResult: function(unid) {
			var d = $q.defer();
			$http({
				method: 'jsonp',
				url: 'http://io.papayaplay.com/secured/json.do?callback=JSON_CALLBACK',
				params : { cm: 'Service.Event.GetEventResult_BSCS79' },
			})
			.success(function(res) {
				//console.log("EventService",res.EventAttendance[0].Status);
				//console.log("servertime",res);
				if(res.EventAttendance[0].Status =='Y'){
					self.isJoin=true
					self.isJoinPopup=false
				}else{
					self.isJoin=false;
					self.isJoinPopup=true;
				}
				if (res.ResultCode[0].Code == 10000) {
					var startDates = [
						moment('2018-01-10 00:00'),
						moment('2018-01-11 00:00'),
						moment('2018-01-12 00:00'),
						moment('2018-01-13 00:00'),
						moment('2018-01-14 00:00'),
						moment('2018-01-15 00:00'),
						moment('2018-01-16 00:00'),
						moment('2018-01-17 00:00'),
						moment('2018-01-18 00:00'),
						moment('2018-01-19 00:00'),
						moment('2018-01-20 00:00'),
						moment('2018-01-21 00:00'),
						moment('2018-01-22 00:00'),
						moment('2018-01-23 00:00'),
						moment('2018-01-24 00:00'),
						moment('2018-01-25 00:00'),
						moment('2018-01-26 00:00'),
						moment('2018-01-27 00:00'),
						moment('2018-01-28 00:00'),
						moment('2018-01-29 00:00'),
						moment('2018-01-30 00:00'),
						moment('2018-01-31 00:00')
					]

					var index = 0;
					var nextDayIndex = 0;

					angular.forEach(res.EventResult, function (value, key) {

						value.date = startDates[index];
						value.next = false;

						var afterStartDate = moment(self.serverTime).isAfter(startDates[index]);
						var beforeNextStartDate = moment(self.serverTime).isBefore(startDates[index+1]);

						if (afterStartDate && beforeNextStartDate) {
							// is it between?
							value.ongoing = true;
							value.finished = false;
							nextDayIndex = index + 1;
						} else if (afterStartDate) {
							value.ongoing = false;
							value.finished = true;
						} else {
							// days afterNextStartDate
							value.ongoing = false;
							value.finished = false;
						}

						if (value.Mission1 == 1 & value.Mission2 == 1) {
							value.cleared = true;
							self.missionCompleted++;
						} else {
							value.cleared = false;
						}

						self.missions.push(value);
						index++;
					});

					var startDate = moment(self.serverTime);
					var endDate = self.missions[nextDayIndex+1].date;

					self.missions[nextDayIndex].next = true;
					var diff = startDate.countdown(endDate);
					self.missions[nextDayIndex].countdown = diff.hours + 'h ' + diff.minutes + 'm ' + diff.seconds + 's';
					// console.log(self.missions);
					console.log(self.missions)
					d.resolve(self.missions);
				}
			})
			.error(function() {
				d.reject(res);
			})
			return d.promise;
		},
		getJoinResult: function(unid) {
			console.log("getJoinResult",unid);
			var d = $q.defer();
			$http({
				method: 'jsonp',
				url: 'http://io.papayaplay.com/secured/json.do?callback=JSON_CALLBACK',
				params : { cm: 'Service.Event.SetEventLog_BSCS79' },
			})
			.success(function(res) {
				console.log("joinRequest", res);
				var code=res.ResultCode[0].Code;
				if (code == 10000) {
					self.isJoin=true;
					self.isJoinPopup=false;
				}else{
					self.isJoin=false;
					self.isJoinPopup=true;
				}
			})
			.error(function() {
				d.reject(res);
			})

			return d.promise;
		}
	}

	self.getServerTime().then(function () {
		self.getEventResult(LoginService.unid);
	});

	return self;
});