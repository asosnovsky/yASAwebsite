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
	$('meta[property="og:image"]')[0].content = 'images/banner.jpg';
	$('meta[property="og:description"]')[0].content = 'the Actuarial Student Association Club at YorkU main page.';
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
