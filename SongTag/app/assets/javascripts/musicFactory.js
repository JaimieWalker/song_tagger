angular.module("SongTag")
	.factory("musicService", function($http){
		var musicService = {
			requestSongs : function(){
				return $http({
					method: "GET",
					url : "/song",
					responseType: "json",
					headers: {
						"Content-Type": "json",
						"accept" : "application/json"
					}
				}).then(function(response){
					return response;
				},
				function(error){
					return error;
				})
			}
		}

		return musicService;
	})