'use strict';

angular.module('bucket-list')
	.controller('UserController', ["$scope", "$stateParams", "UserFactory", function($scope, $stateParams, UserFactory) {
    UserFactory.get_one($stateParams.id, function(data) {
      $scope.user = data;
    });
}]);