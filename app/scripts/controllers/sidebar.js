'use strict';
/**
 * @ngdoc function
 * @name yuAsaApp.controller:SideBarCtrl
 * @description
 * # SideBarCtrl
 * Controller of the yuAsaApp
 */
angular.module('yuAsaApp')
	.controller('SideBarCtrl', function ($scope, $york) {
	$scope.goTo = $york.goTo;
	$scope.sidebar = {current_posts: []};
	//-----------------------------------------
	//	Loading Tumblr Posts
	//-----------------------------------------
	$york.tumblr.get(function(err, tumblr){
		if(!err) {
			$scope.sidebar.current_posts = tumblr.partialposts.slice(0,5);
		}else{
			$scope.sidebar.current_posts.push(tumblr);
		}
	});
});
