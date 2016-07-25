'use strict';

angular.module('bucket-list')
	.controller('LoginController', ["$state", "$scope", "store", "UserFactory", function($state, $scope, store, UserFactory) {
      $scope.login = function() {
        UserFactory.login($scope.user, function(res) {
          store.set('jwt', res.data.id_token);
          $state.go('dashboard');
        });
      }
      $scope.register = function() {
        UserFactory.register($scope.new_user, function(res) {
          store.set('jwt', res.data.id_token);
          $state.go('dashboard');
        });
      }
}]);