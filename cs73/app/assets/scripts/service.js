"use strict";

app.service("LoginService", function($http, $q) {
  var self = {
    userid: null,
    unid: null,
    photo: null,
    isLogin: false,
    load: function() {
      var d = $q.defer();

      $http
        .jsonp("https://io.papayaplay.com/auth/user.do?callback=JSON_CALLBACK")
        .success(function(res) {
          console.log(res);
          if (res.ResultCode[0].Code == 10000) {
            self.unid = res.UserInfo[0].UNID;
            self.userid = res.UserInfo[0].UserID;
            self.photo = res.UserInfo[0].PIPath;
            self.isLogin = true;
            d.resolve(res);
          }
        })
        .error(function() {
          self.isLogin = false;
          d.reject(res);
        });

      return d.promise;
    }
  };
  self.load();
  return self;
});

app.service("EventService", function($http, $q, LoginService) {
  var self = {
    serverTime: null,
    missions: [],
    missionCompleted: 0,

    getServerTime: function() {
      var d = $q.defer();

      $http({
        method: "jsonp",
        url: "https://io.papayaplay.com/json.do?callback=JSON_CALLBACK",
        params: { cm: "Service.Board.GetServerTime" }
      })
        .success(function(res) {
          if (res.ResultCode[0].Code == 10000) {
            self.serverTime = res.ServerTime[0].ServerTime;
            console.log(self.serverTime);
            d.resolve(self.serverTime);
          }
        })
        .error(function() {
          d.reject(res);
        });

      return d.promise;
    },

    getEventResult: function() {
      var d = $q.defer();

      $http({
        method: "jsonp",
        url: "https://io.papayaplay.com/secured/json.do?callback=JSON_CALLBACK",
        params: { cm: "Service.Event.GetEventResult_BSCS73" }
      })
        .success(function(res) {
          if (res.ResultCode[0].Code == 10000) {
            var startDates = [
              moment("2017-05-18 00:00"),
              moment("2017-05-19 00:00"),
              moment("2017-05-20 00:00"),
              moment("2017-05-21 00:00"),
              moment("2017-05-22 00:00"),
              moment("2017-05-23 00:00"),
              moment("2017-05-24 00:00"),
              moment("2017-05-25 00:00"),
              moment("2017-05-26 00:00"),
              moment("2017-05-27 00:00"),
              moment("2017-05-28 00:00"),
              moment("2017-05-29 00:00"),
              moment("2017-05-30 00:00"),
              moment("2017-05-31 00:00")
            ];

            var index = 0;
            var nextDayIndex = 0;

            angular.forEach(res.EventResult, function(value, key) {
              value.date = startDates[index];
              value.next = false;

              var afterStartDate = moment(self.serverTime).isAfter(
                startDates[index]
              );
              var beforeNextStartDate = moment(self.serverTime).isBefore(
                startDates[index + 1]
              );

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

              if ((value.Mission1 == 1) & (value.Mission2 == 1)) {
                value.cleared = true;
                self.missionCompleted++;
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
            self.missions[nextDayIndex].countdown =
              diff.hours + ":" + diff.minutes + ":" + diff.seconds;

            //console.log(self.missions);

            d.resolve(self.missions);
          }
        })
        .error(function() {
          d.reject(res);
        });

      return d.promise;
    }
  };

  self.getServerTime().then(function() {
    self.getEventResult(LoginService.unid);
  });

  return self;
});
