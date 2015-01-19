'use strict';

/**
 * @ngdoc function
 * @name yuAsaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yuAsaApp
 */
angular.module('yuAsaApp')
	.controller('MainCtrl', function ($scope,$http,$sce) {
	$scope.tumblr = {posts:[]};
	$http.jsonp('http://api.tumblr.com/v2/blog/asayorku.tumblr.com/posts?api_key=9JEt1AQMzS7zhaLwn9I9kRlyq0MHzW7SkGxyjg3PIGmGKbC1Ek&callback=JSON_CALLBACK')
		.success(function (data) {
			data.response.posts.forEach(function (value) {
				var img = value.body.substring((value.body.indexOf('<img')),(value.body.indexOf('"/>')+3));
				console.log(img);
				$scope.tumblr.posts.push({
					title:value.title,
					body:value.body.replace(/<[^>]*>/g, '').substr(0,200)+'...',
					/*jshint camelcase: false */link:value.post_url,/*jshint camelcase: true */
					time:value.date,
					img: $sce.trustAsHtml(img)
				});
			});
		});
});
