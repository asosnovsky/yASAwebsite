'use strict';

/**
 * @ngdoc function
 * @name yuAsaApp.service:$york
 * @description
 * # $york
 * service of the yuAsaApp
 */
angular.module('yuAsaApp')
	.service('$york', function ($location) {
	/**
	 * Go to Address
	 * 
	 * @param  {String} address
	 *
	 * @param  {String} hash
	 * 
	 */
	this.goTo = function goTo (address, hash) {
		if(!hash) {
			hash = '';
		}
		$location.path(address).replace();
		$location.hash(hash);
		window.scrollTo(0,0);
	};
});