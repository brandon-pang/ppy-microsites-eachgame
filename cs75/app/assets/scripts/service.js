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
				url: 'http://io.papayaplay.com/secured/json.do?callback=JSON_CALLBACK',
				params : { cm: 'Service.Event.GetEventResult_BSCS75' },
			})
			.success(function(res) {
				//console.log(res);
				if (res.ResultCode[0].Code == 10000) {
					var startDates = [
						moment('2017-08-30 00:00'),
						moment('2017-09-02 00:00'),
						moment('2017-09-05 00:00'),
						moment('2017-09-08 00:00'),
						moment('2017-09-11 00:00'),
						moment('2017-09-14 00:00'),
						moment('2017-09-16 23:59')
					];

					var index = 0;
					var nextDayIndex = 0;

					angular.forEach(res.EventResult, function (value, key) {

						value.date = startDates[index];
						value.next = false;

						//value.Mission1=Math.floor((Math.random() * 2));
						//value.Mission2=Math.floor((Math.random() * 2));
						//value.Mission3=Math.floor((Math.random() * 2));

						var afterStartDate = moment(self.serverTime).isAfter(startDates[index]);
						var beforeNextStartDate = moment(self.serverTime).isBefore(startDates[index+1]);

						if (afterStartDate && beforeNextStartDate) {
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

						if (value.Mission1 == 1 && value.Mission2 == 1 && value.Mission3 == 1) {
							value.cleared = true;
							//self.missionCompleted++;
						} else {
							value.cleared = false;
						}

						self.missions.push(value);
						index++;
					});

					var startDate = moment(self.serverTime);
					var endDate = self.missions[nextDayIndex].date;
					self.missions[nextDayIndex].next = true;
					var diff = startDate.countdown(endDate);
					self.missions[nextDayIndex].countdown = diff.hours + ':' + diff.minutes + ':' + diff.seconds;

					console.log(self.missions);
					d.resolve(self.missions);
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
