'use strict';

angular.module('bucket-list')
	.factory('UserFactory', ["$http", function($http) {
  var factory = {};

  factory.all = function(user_id, callback) {
    $http.get('/users/' + user_id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }

  factory.get_one = function(user_id, callback) {
    $http.get('/user/' + user_id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }

  factory.navbar_get_one = function(user_id, callback) {
    $http.get('/user/nav/' + user_id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }

  factory.login = function(user, callback) {
    $http.post('/login', user)
      .then(function (response) {
        callback(response);
      }, function (error) {
        throw error;
      });
  }

  factory.register = function(user, callback) {
    $http.post('/register', user)
      .then(function (response) {
        callback(response);
      }, function (error) {
        throw error;
      });
  }

  return factory;
}]);