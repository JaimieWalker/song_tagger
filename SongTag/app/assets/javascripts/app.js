var app = angular.module("SongTag",
	["ngResource","ui.router","templates","ui.bootstrap"]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	$stateProvider
		.state("home", {
			url: '/',
			templateUrl: "index.html",
			controller: "indexCtrl"
		})

})