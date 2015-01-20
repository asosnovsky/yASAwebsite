'use strict';

/**
 * @ngdoc function
 * @name yuAsaApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the yuAsaApp
 */
angular.module('yuAsaApp')
	.controller('HeaderCtrl', function ($scope, $location, $york) {
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
