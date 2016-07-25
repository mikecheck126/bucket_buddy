'use strict';

angular.module('bucket-list')
	.controller('NavbarController', 
		[
							 "jwtHelper", "UserFactory", "$scope", "$state", "store", 
			function (jwtHelper,   UserFactory,   $scope,   $state,   store) {
	      $( document ).ready(function(){
					$(".button-collapse").sideNav();
	      })

	      UserFactory.navbar_get_one(jwtHelper.decodeToken(store.get("jwt"))._id, function (data) {
	        UserFactory.me = $scope.me = data;
	      });

	      $scope.logout = function() {
	        store.remove('jwt');
	        $state.go('root');
	      }

			}
		]
	);