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
			$.each(tumblr.partialposts, function (index, value) {
				$scope.sidebar.current_posts.push(value);
			});
		}else{
			$scope.sidebar.current_posts.push(tumblr);
		}
	});
});
