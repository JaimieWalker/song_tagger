var app = angular.module("SongTag")
	.controller("editCtrl", function($scope,musicService,$window){
		$scope.song = JSON.parse(localStorage.data).song
		$scope.song_id = JSON.parse(localStorage.data).song_id
		$scope.tags = JSON.parse(localStorage.data).tags.split(',')
		$scope.tag_ids = JSON.parse(localStorage.data).tag_ids

	    $scope.params = JSON.parse(localStorage.data)

		$scope.submit = function(){
			var tags = []
			for (var i = 0; i < $(".tag").length; i++) {
				tags.push($(".tag")[i].value)
			}
			$scope.tags = tags
			var params = {
				"song": $scope.song,
				"song_id": $scope.song_id,
				"tags": $scope.tags,
				"tag_ids": $scope.tag_ids
			}

			musicService.updateSong(params).then(function success(res){
				localStorage.setItem("data",angular.toJson(res.data)) 
				$window.location.href = "/"
			},
			function error(res){

			})



		}

		$scope.check = function($event) {
				musicService.checkSong($scope.params).then(function success(res){
						$scope.bool = $scope.song === res.data[0].song 

					},
					function fail(err){

					});
				
			
		}



		$scope.numsAndDigits_tag = function($event){
			var pattern = /[a-z]|[0-9]|\s/i;
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