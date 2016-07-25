'use strict';

angular.module('bucket-list')
	.factory('ItemFactory', ["$http", function($http) {
  var factory = {};
  factory.add = function(new_item, callback) {
    $http.post('/add/item', new_item)
      .then(
        function (response) {callback();},
        function (error) {throw error;}
      );
  }
  factory.done = function(data, callback) {
    $http.post('/update/item/' + data.item_id, data)
      .then(
        function (response) {callback();},
        function (error) {throw error;}
      );
  }
  return factory;
}]);