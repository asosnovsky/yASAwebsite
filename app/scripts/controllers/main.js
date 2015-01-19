'use strict';
/*global $:false*/

/**
 * @ngdoc function
 * @name yuAsaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yuAsaApp
 */
angular.module('yuAsaApp')
	.controller('MainCtrl', function ($scope, $http, $sce, $location) {
	window.__scope = $scope;
	//-----------------------------------------
	//	Loading Tumblr Posts
	//-----------------------------------------
	$scope.tumblr = {posts:[]};
	$http.jsonp('http://api.tumblr.com/v2/blog/asayorku.tumblr.com/posts?api_key=9JEt1AQMzS7zhaLwn9I9kRlyq0MHzW7SkGxyjg3PIGmGKbC1Ek&callback=JSON_CALLBACK')
		.success(function (data) {
			data.response.posts.forEach(function (value) {
				var imgtext = value.body.substring(
					(value.body.indexOf('<img')),
					(value.body.indexOf('"/>')+3)
				);
				var img = $(imgtext)[0].src;
				$scope.tumblr.posts.push({
					title:value.title,
					body:value.body.replace(/<[^>]*>/g, '').substr(0,210)+'...',
					link:value.post_url,
					time:value.date,
					img: img
				});
			});
		});
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
