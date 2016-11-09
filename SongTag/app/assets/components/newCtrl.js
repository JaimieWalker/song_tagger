var app = angular.module("SongTag")
	.controller("newCtrl", function($scope,musicService){
		$scope.submit = function(){
			if (!$scope.tagQuery) {
				alert("Songs must have at least one tag with 3 or more characters")
				return ""
			}

			if ($scope.songs && $scope.songs.length > 0) {
				alert("No Duplicates Allowed!")
				return ""
			}
				
			musicService.createSong($scope.params).then(function success(res){
				$scope.songs = res.data 
			},
			function error(res){

			})



		}

		$scope.check = function() {
			 $scope.params = {}
			if($scope.songQuery){
				$scope.params["song"] = $scope.songQuery
			}
			if ($scope.tagQuery) {
				$scope.params["tags"] = $scope.tagQuery.split(',')
			}
			if ($scope.params.song){
				musicService.checkSong($scope.params).then(function success(res){
						$scope.songs = res.data
					},
					function fail(err){

					});
				}
			
		}



		$scope.numsAndDigits_tag = function($event){
			var pattern = /[a-z]|[0-9]|\s|,/i;
			if (!pattern.test($event.key)) {
				$event.preventDefault();
				return ""
			}
		}

		$scope.numsAndDigits_song = function($event){
			var pattern = /[a-z]|[0-9]|\s/i;
			if (!pattern.test($event.key)) {
				$event.preventDefault();
				return ""
			}
		}

	})