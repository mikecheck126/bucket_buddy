'use strict';

angular.module('bucket-list', [
	"angular-jwt",
  "angular-storage",
	"ui.router",
	"ui.router.stateHelper"
])

.config(
	[
							"$stateProvider", "$urlRouterProvider", "jwtInterceptorProvider", "$httpProvider", "stateHelperProvider",
		function ( $stateProvider,   $urlRouterProvider,   jwtInterceptorProvider, 	 $httpProvider, 	stateHelperProvider) {
			$urlRouterProvider.otherwise("/");

			stateHelperProvider
				.state({
					name: "root",
					url: "/",
					data: {
						requiresLogin: false
					},
					views: {
						"header" : {
							templateUrl: 'partials/navbar.html'
						},
						"content" : {
							templateUrl: 'partials/login.html',
							controller: 'LoginController'
						}
					}
				})
			  .state({
			  	name: "dashboard",
			  	url: "/dashboard",
			  	data: {
			  		requiresLogin: true
			  	},
			  	views: {
						"header@" : {
							templateUrl: 'partials/navbar_internal.html',
							controller: 'NavbarController'
						},
						"content@" : {
					    templateUrl: 'partials/dashboard.html',
					    controller: 'DashboardController'
						}
					},
					children: [
					  {
					  	name: "user",
					  	url: "^/user/:id",
					  	views: {
					  		"content@" : {
					  			templateUrl: 'partials/user.html',
					  			controller: 'UserController'
					  		}	
					  	}
					  }
					]
			  })
			  ;
		}
	]
)
.run(
	[
						 "$rootScope", "$state", "store", "jwtHelper", 
		function ($rootScope,   $state,		store, 	 jwtHelper) {
		  $rootScope.$on('$stateChangeStart', function(e, to) {
		  	var token = store.get("jwt")
		    if (to.data && to.data.requiresLogin) {
		      if (!token || jwtHelper.isTokenExpired(token)) {
		        e.preventDefault();
		        $state.go('root');
		      }
		    }
		    if (to.data && !to.data.requiresLogin) {
		    	if (token && !jwtHelper.isTokenExpired(token)) {
		        e.preventDefault();
		        $state.go('dashboard');
		      }
		    }
		  });
		}
  ]
)

;