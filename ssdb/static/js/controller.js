moviesApp.controller("moviesCtrl", function($scope, $rootScope, $cookies, $window, $location, moviesFactory, genreFactory, AuthService){
	$scope.loading=0;
	$scope.userType = $cookies.get('isSuperUser');

	moviesFactory.getMoviesList().then(function(response){
		$scope.moviesList = response.data;

	})

	
	genreFactory.getGenre().then(function(response){
		$scope.genrefilter = {}		
		genre_list = response.data
		for (var i=0; i< genre_list.length; i++){
				$scope.genrefilter[genre_list[i].id] =  genre_list[i].genre
			
		}		
		// $scope.gList = response.data;		
	});

	$scope.showMovieData = function(movie){
		$scope.loading++;
		$scope.movies = movie;
		genreFactory.getGenre().then(function(response){
			$scope.loading--;
			$scope.genreListDatas = response.data
		})		
		$scope.genreSelections = movie.genre;
		
	}

	$scope.updateMovie = function(){		

		$scope.loading++;
		$scope.movies.name = $scope.movies.name;
		$scope.movies.director = $scope.movies.director;
		$scope.movies.stars = $scope.movies.stars;
		$scope.movies.ssdb_score = $scope.movies.ssdb_score;
		$scope.movies.popularity = $scope.movies.popularity;
		$scope.movies.description = $scope.movies.description;
		$scope.movies.genre = $scope.genreSelections;

		moviesFactory.updateMovie($scope.movies).then(function(response){
			$scope.loading--;
			moviesFactory.getMoviesList().then(function(response){
				$scope.moviesList = response.data;				
				$scope.movies = {}
			})				
			$location.path('/dashboard');
		})
	}

	$scope.removeMovie = function(movie){
		$scope.loading++;
		moviesFactory.deleteLeave(movie).then(function(response){

			$scope.loading--;
			moviesFactory.getMoviesList().then(function(response){
				$scope.moviesList = response.data;				
			})

		})
	}

	$scope.generList = function(){		
		$location.path('/genre');
		// });
	
	}


	$scope.logout = function () {
		
	  AuthService.logout().then(
	    function(response) {
	      $location.path('');
	    },
	    function (error) {
	      $scope.error = error;
	    }
	  );
	};


	$scope.username = $window.localStorage.username;
	$scope.title = "SSDB";
});


moviesApp.controller("newMovieCtrl", function($scope, $location, moviesFactory, genreFactory){	
	$scope.loading=0;
	$scope.saveMovie = function(){
		$scope.loading++;
		$scope.moviesdata.name = $scope.moviesdata.name;
		$scope.moviesdata.director = $scope.moviesdata.director;
		$scope.moviesdata.stars = $scope.moviesdata.stars;
		$scope.moviesdata.ssdb_score = $scope.moviesdata.ssdb_score;
		$scope.moviesdata.popularity = $scope.moviesdata.popularity;
		$scope.moviesdata.description = $scope.moviesdata.description;
		$scope.moviesdata.genre = $scope.genreSelection;

		moviesFactory.creaeMovie($scope.moviesdata).then(function(response){
			$scope.loading--;					
			$location.path('/dashboard');
		})
	}


	genreFactory.getGenreList().then(function(response){
		$scope.genreListData = response.data;
	});

	

});

moviesApp.controller("AuthCtrl" , function($scope, $location, $rootScope, $window, AuthService, $cookies){
	$scope.loading=0;
	$scope.login = function(){
		
	  	var username = $scope.username;
	  	var password = $scope.password;
	  	$scope.loading++;
	  	if (username && password) {	  		
	  		AuthService.login(username, password).then(
	  			function(response){
	  				$scope.loading--;
	  				// $rootScope.isSuperUser = response.data['isSuperUser'];
	  				$cookies.put('isSuperUser', response.data['isSuperUser']);	  				
	  				
	  			 $location.path('/dashboard');
	  			 $window.location.reload();
		      },
		      function(error){
		        $scope.error = 'Username and password required';
		      });
		} else {
		$scope.error = 'Username and password required';
		}
	}



  // $scope.register = function(){
  // 	alert("register...");
  //   var username = $scope.registerUsername;
  //   var password = $scope.registerPassword;

  //   if (username && password) {
  //     console.log("Username",username);
  //     AuthService.register(username, password).then(
  //       function () {
  //         $location.path('/dashboard');
  //       },
  //       function (error) {
  //         $scope.registerError = error;
  //       }
  //     );
  //   } else {
  //     $scope.registerError = 'Username and password required';
  //   }
  // }
});


moviesApp.controller("newUserCtrl", function($scope, $location, AuthService, $cookies, $window){
	$scope.loading=0;
	$scope.register = function(){	
		$scope.loading++;	
	    var username = $scope.newUsername;
	    var password = $scope.newPassword;
	    var email = $scope.emailId;

	    userData = {'username': username, 'password': password, 'emailid': email};
	    
	    if (username && password) {
	      
	      AuthService.register(userData).then(
	        function () {
	        	$cookies.put('isSuperUser', false);
	          $location.path('/dashboard');
	          $window.location.reload();
	        },
	        function (error) {
	          $scope.registerError = error;
	        }
	      );
	    } else {
	      $scope.registerError = 'Username and password required';
	    }
	    $scope.loading--;
	  }

	$scope.cancel = function () {
	   	console.log("cancel");
	  };


});


moviesApp.controller("genreCtrl" , function($scope, $location, AuthService, genreFactory){
	$scope.loading=0;
	genreFactory.getGenreList().then(function(response){
		$scope.genreListData = response.data;		
		// $scope.leave.category = $scope.leaveTypes[0].value;
		
	});

	$scope.removeGenre = function(genre){
		$scope.loading++;		
		genreFactory.deleteGenre(genre).then(function(response){			
			$scope.loading--;
			genreFactory.getGenreList().then(function(response){
				$scope.genreListData = response.data;							
			});

		})
	}

	$scope.title = "Genre";
});


moviesApp.controller("newGenreCtrl", function($scope, $location, genreFactory){	
	$scope.loading=0;
	$scope.saveGenre = function(){
		$scope.loading++;
		var genre_name = $scope.genre;		
		genre_data = {'genre': genre_name}
		var dupl_genre = false
		$scope.genreError=""
		genreFactory.getGenreList().then(function(response){
			$scope.loading--;
			$scope.genreListData = response.data;
			// console.log("genre",genre_name);
			// console.log(response.data);
			for (var genre in response.data){
				console.log(genre_name, response.data[genre].genre);
				if (genre_name == response.data[genre].genre){

					dupl_genre = true;
				}
			}
			if (!dupl_genre){
				genreFactory.creaeGenre(genre_data).then(function(response){					
					// $scope.genre = "";	
					$location.path('/genre');
				})
			}else{
				$scope.genreError = "Already exist!";

			}
		});

	$scope.cancel = function(){
		
		$location.path('/genre');
	}
		

		// genreFactory.creaeGenre(genre_data).then(function(response){
		// 	console.log(response.data);		
		// 	$scope.genre = "";	
		// 	$location.path('/genre');
		// })
	}
});
