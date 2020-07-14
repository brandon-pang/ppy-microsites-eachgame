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
					// console.log(res);
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
				// console.log(res);
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
                params : { cm: 'Service.Event.GetEventResult_BSCS70' },
            })
            .success(function(res) {
            	// console.log(res);
            	if (res.ResultCode[0].Code == 10000) {
            		// var startDates = [
            		// 	moment.tz('2017-01-18 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-19 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-20 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-21 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-22 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-23 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-24 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-25 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-26 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-27 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-28 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-29 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-30 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-01-31 00:00', 'Europe/Berlin'),
            		// 	moment.tz('2017-02-01 00:00', 'Europe/Berlin')
            		// ]

            		var startDates = [
            			moment('2017-01-18 00:00'),
            			moment('2017-01-19 00:00'),
            			moment('2017-01-20 00:00'),
            			moment('2017-01-21 00:00'),
            			moment('2017-01-22 00:00'),
            			moment('2017-01-23 00:00'),
            			moment('2017-01-24 00:00'),
            			moment('2017-01-25 00:00'),
            			moment('2017-01-26 00:00'),
            			moment('2017-01-27 00:00'),
            			moment('2017-01-28 00:00'),
            			moment('2017-01-29 00:00'),
            			moment('2017-01-30 00:00'),
            			moment('2017-01-31 00:00'),
            			moment('2017-02-01 00:00')
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

		                if (value.DayNum == 3 || value.DayNum == 4 || value.DayNum == 11 || value.DayNum == 14) {
		                    value.special = true;
		                } else {
		                    value.special = false;
		                }

		                //test code
		                // if (value.DayNum == 1 || value.DayNum == 2) {
		                // 	value.Mission1 = 1;
		                // 	value.Mission2 = 1;
		                // 	value.Mission3 = 1;
		                // } else if (value.DayNum == 3) {
		                // 	value.Mission1 = 1;
		                // }

		                // if (value.DayNum == 14) {
		                // 	value.Mission1 = 1;
		                // 	value.Mission2 = 1;
		                // 	value.Mission3 = 1;
		                // }

		                // value.Mission1 = 1;
		                // value.Mission2 = 1;
		                // value.Mission3 = 1;

		                if (value.Mission1 == 1 & value.Mission2 == 1 & value.Mission3 == 1) {
		                    value.cleared = true;
		                    self.missionCompleted++;
		                } else {
		                    value.cleared = false;
		                }

		                self.missions.push(value);
		                index++;
		            });

            		var startDate = moment(self.serverTime);
            		var endDate = self.missions[nextDayIndex-1].date;

		            self.missions[nextDayIndex-1].next = true;
		            var diff = startDate.countdown(endDate);
		            self.missions[nextDayIndex-1].countdown = diff.hours + 'h ' + diff.minutes + 'm ' + diff.seconds + 's';
		            // console.log(self.missions);
		            console.log(self.missions)

            		d.resolve(self.missions);
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
