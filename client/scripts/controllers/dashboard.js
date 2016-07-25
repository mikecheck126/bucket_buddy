'use strict';

angular.module('bucket-list')
  .controller('DashboardController', ["jwtHelper", "$scope", "store", "ItemFactory", "UserFactory", function (jwtHelper, $scope, store, ItemFactory, UserFactory) {

    UserFactory.get_one(jwtHelper.decodeToken(store.get("jwt"))._id, function (data) {
      UserFactory.me = $scope.me = data;
      UserFactory.all($scope.me._id, function (data) {
        $scope.users = data;
      });
    });

    $scope.add = function() {
      var data = $scope.new_item;
      if (data) {
        data.user_id = $scope.me._id;
        ItemFactory.add(data, function() {
          UserFactory.get_one($scope.me._id, function (data) {
            $scope.me = data;
          });
          $scope.new_item = null;
        });
      };
    }
    $scope.done = function(item, completed) {
      var data = {}
      data.completed = completed;
      data.item_id = item;
      ItemFactory.done(data, function() {
        UserFactory.get_one($scope.me._id, function (data) {
          $scope.me = data;
        });
        $scope.new_item = null;
      });
    }
}]);