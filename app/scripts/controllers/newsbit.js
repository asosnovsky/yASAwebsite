'use strict';
/**
 * @ngdoc function
 * @name yuAsaApp.controller:NewsbitCtrl
 * @description
 * # NewsbitCtrl
 * Controller of the yuAsaApp
 */
angular.module('yuAsaApp')
	.controller('NewsbitCtrl', function ($scope, $york, $routeParams) {
	$scope.tumblr = {newsbit: {}};
	//-----------------------------------------
	//	Loading Tumblr Posts
	//-----------------------------------------
	if($routeParams.id === 'ASA'){
		$york.tumblr.request($routeParams.tid, function (err, data) {
			if(!err) {
				$scope.tumblr.newsbit = data;
			}else{
				$scope.tumblr.newsbit = data;
			}
			$('meta[property="og:image"]')[0].content = $scope.tumblr.newsbit.img;
			$('meta[property="og:description"]')[0].content = $scope.tumblr.newsbit.title;
		});
	}else{
		$york.tumblr.get(function(err, tumblr){
			if(!err) {
				$scope.tumblr.newsbit = tumblr.posts[$routeParams.id];
			}else{
				$scope.tumblr.newsbit = tumblr;
			}
			$('meta[property="og:image"]')[0].content = $scope.tumblr.newsbit.img;
			$('meta[property="og:description"]')[0].content = $scope.tumblr.newsbit.title;
		});
	}
});
