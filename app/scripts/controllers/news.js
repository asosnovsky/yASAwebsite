'use strict';

/**
 * @ngdoc function
 * @name yuAsaApp.controller:NewsCtrl
 * @description
 * # NewsCtrl
 * Controller of the yuAsaApp
 */
angular.module('yuAsaApp')
	.controller('NewsCtrl', function ($scope, $york, $routeParams, $location) {
		
		$scope.goTo = $york.goTo;
		//-----------------------------------------
		//	Define our container
		//-----------------------------------------
		$scope.tumblr = {requested_posts:[]};
		
		//-----------------------------------------
		//	Load Tumblr Data
		//-----------------------------------------
		$york.tumblr.get(function(err, tumblr){
			if(!err) {
				//-----------------------------------------
				//	Pagnation
				//-----------------------------------------
				var current_pag = parseInt($routeParams.pag);//	retrieve current pagnation
				var max_pag = Math.ceil(parseInt(tumblr.total_posts)/5);//	max_pag = Ceiling(total_posts/5);
				
				/**
				 * Changes Pagation
				 * 
				 * @param  {Number||String} pag 
				 *   
				 */
				$scope.changePag = function (pag){
					if(pag === 0){//	Forwards
						$york.goTo('news/' + (current_pag + 1));
					}else if(pag === -1){//	Backwards
						$york.goTo('news/' + (current_pag - 1));
					}else if(pag >= 1){//	Whichever
						$york.goTo('news/' + pag);
					}
				};

				//-----------------------------------------
				//	Analyze pagnation
				//-----------------------------------------
				if(current_pag >= 3 && current_pag <= max_pag ){
					$scope.pagnation = [
						{class:'', value:current_pag - 2, href:''},
						{class:'', value:current_pag - 1, href:''},
						{class:'active', value:current_pag , href:''},
						{class:'', value:current_pag + 1, href:''},
						{class:'', value:current_pag + 2, href:''},
					];
				}else if(current_pag === 1) {
					$scope.pagnation = [
						{class:'active', value:1, href:''},
						{class:'', value:2, href:''},
						{class:'', value:3, href:''},
						{class:'', value:4, href:''},
						{class:'', value:5, href:''},
					];
				}else if(current_pag === 2 && current_pag <= max_pag) {
					$scope.pagnation = [
						{class:'', value:1, href:''},
						{class:'active', value:2, href:''},
						{class:'', value:3, href:''},
						{class:'', value:4, href:''},
						{class:'', value:5, href:''},
					];
				}else if(current_pag === max_pag && current_pag >= 5){
					$scope.pagnation = [
						{class:'', value:current_pag - 4, href:''},
						{class:'', value:current_pag - 3, href:''},
						{class:'', value:current_pag - 2, href:''},
						{class:'', value:current_pag - 1, href:''},
						{class:'active', value:current_pag , href:''},
					];
				}else if(current_pag > max_pag ){
					$location.path('news/' + max_pag + '#MAX-REACHED').replace();
					$location.hash('');
				}else if(current_pag <= 0){
					$location.path('news/1#MIN-REACHED').replace();
					$location.hash('');
				}

				//-----------------------------------------
				//	Determine what to show
				//-----------------------------------------
				var p = 5*(current_pag-1);//	Find current posts
				var max_p = 4*(current_pag-1) + 4;//	Max number of posts
				// hence only 5 posts will be shown ||(0,4)|| = 5
			
				while (p <= tumblr.total_posts - 1 && p <= max_p){
					$scope.tumblr.requested_posts.push(tumblr.partialposts[p]);
					p++;
				}

			}else{//	If no tumblr data was retreived then:
				$scope.tumblr.requested_posts = [tumblr];
			}
		});
	});
