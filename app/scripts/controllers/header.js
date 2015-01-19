'use strict';

/**
 * @ngdoc function
 * @name yuAsaApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the yuAsaApp
 */
angular.module('yuAsaApp')
	.controller('HeaderCtrl', function ($scope, $location) {

	/**
	 * Go to Address
	 * 
	 * @param  {String} address
	 * 
	 */
	$scope.goTo = function goTo (address) {
		$location.path(address).replace();
		window.scrollTo(0,0);
	};
	
});
