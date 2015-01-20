'use strict';
/**
 * @ngdoc function
 * @name yuAsaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yuAsaApp
 */
angular.module('yuAsaApp')
	.controller('MainCtrl', function ($scope, $york) {
	//-----------------------------------------
	//	Loading Tumblr Posts
	//-----------------------------------------
	$york.tumblr.get(function(err, tumblr){
		if(!err) {
			$scope.tumblr = tumblr.partialposts;
		}else{
			$scope.tumblr = [tumblr];
		}
	});

	/**
	 * Go to Address
	 * 
	 * @param  {String} address
	 * 
	 * @param  {String} hash
	 * 
	 */
	$scope.goTo = $york.goTo;
});
