var app = angular.module("myApp", []);
//app.controller('mycntrl',function($scope){
	//$scope.name = 'selva';
//});

/**
* 30 build in services available
* Ex : $location
app.controller('mycntrl',function($scope,$location){
	$scope.myurl = $location.absUrl();
});
**/

/*
* get without service
*
app.controller('mycntrl',function($scope, $http){
	$http.get('http://localhost/Html/myfirstService.php').then(
		function(response) {
			
			console.log(response.data);
			$scope.myfirstService = response.data;
	});
});

app.controller('mycntrl',function($scope,$http){
	$http({
		method : "GET",
		url : "http://localhost/Html/myfirstService.php"
	}).then(function mySuccess(response){
		$scope.myfirstService = response.data;
	}, function myFailure(response){
		$scope.myfirstService = response.data;
	});
});
*/

/*
* get with service
*
app.service('myService',function($http){
	var myService;
	var serve = function(){
		return $http.get('http://localhost/Html/myfirstService.php').then(
		function(response){
			return response;
		});
	}

	myService = {
		serve : serve,
	};

	return myService;
});

app.controller('mycntrl',function($scope,myService){
	
	$scope.mymethod = function(){
		 myService.serve().then(function( response ){
			$scope.myfirstService = response.data;
		});
	}

	$scope.mymethod();
});*/

/*
* post with service
*
app.service('myService',function($http){

	var myService;
	var serve = function(){
		var data = JSON.stringify({type:"user"});
		var config = { header : {'content-Type' : 'application/x-www-form-urlencoded;charset=utf-8;'}}
		return $http.post('http://localhost/Html/myfirstService.php',data,config)
		.success(function(data,status,headers,config){
			return data;
		})
		.error(function(data,status,headers,config){
			return data;
		});
	}
	myService = { serve : serve };
	return myService;
});

app.controller('mycntrl',function($scope,myService){
	$scope.mymethod = function(){
		myService.serve().then(function( response ){
			$scope.myfirstService = response.data;
		},
		function(response){
			$scope.myfirstService = response.data;
		});
	}
	$scope.mymethod();
});
*/

/*
* post with factory and service
*
app.factory('myfactory',function($http){
	var factory;

	fact = function(){
		return $http.get('http://localhost/Html/myfirstService.php').then(
		function(response){
			return response;
		});
	}
	factory = { fact : fact };
	return factory;
});

app.service('myService',function(myfactory){
	
	this.serve = function(){
		return myfactory.fact().then(function(response){
			return response;
		});
	}
	
});

app.controller('mycntrl',function($scope,myService){
	//$scope.mymethod = function(){
		myService.serve().then(function( response ){
			$scope.myfirstService = response.data;
		},
		function(response){
			$scope.myfirstService = response.data;
		});
	//}
	//$scope.mymethod();
});
*/
app.factory('myfactory',function($http,$httpParamSerializerJQLike){

	var param = {  apiKey:'bd9731343632cfd9fde68e2956425bb7',
     sessionToken:{tokenID:'453a28f99387a674be2a3cb650c3e8b4'},
     appGUID:'25e8884c750bf2a9af2a131a0886bd9b',
     udfData:''}

    var getInfo = function(){
    	return $http.post('http://localhost/Html/myfirstService.php',
    		$httpParamSerializerJQLike({requestData : param}),
			{'header' : { 'Content-Type': 'application/x-www-form-urlencoded' }}).
    	then(function(response){
    		console.log(response);
    		return response;
    	});
    }

    var resultSet = { getInfo : getInfo };

    return resultSet;
});

app.controller('mycntrl',function($scope,myfactory){

	$scope.mymethod = function(){
		myfactory.getInfo().then(function( response ){
			$scope.myfirstService = response.data;
		},
		function(response){
			$scope.myfirstService = response .data;
		});
	}
	$scope.mymethod();
});
