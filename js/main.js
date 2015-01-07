//App
var app = angular.module('homepage', [
  'ngRoute'
]);
//Route Configuration
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "HomeCtrl"})
    .when("/about_the_club", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/employment", {templateUrl: "partials/employment.html", controller: "PageCtrl"})
    .when("/qualifications", {templateUrl: "partials/qualifications.html", controller: "PageCtrl"})
    //News
    .when("/news", {templateUrl: "partials/news.html", controller: "NewsCtrl"})
    .when("/news/article", {templateUrl: "partials/article.html", controller: "ArticleCtrl"})
    //Gallery
    .when("/gallery", {templateUrl: "partials/gallery.html", controller: "GalleryCtrl"})
    .when("/gallery/event", {templateUrl: "partials/thumb.html", controller: "EventCtrl"})
    //Error
    .when("/dateerr", {templateUrl: "partials/dateerror.html", controller: "PageCtrl"})
    .otherwise("/404", {templateUrl: "partials/error.html", controller: "PageCtrl"});
}]);
//Controllers
app.controller('HomeCtrl', function (/* $scope, $location, $http */) {
	document.getElementById("mainbody").className = "homepage ng-scope";
	logoCarousel();
	year_of_interest = new Date().getFullYear();
	month_of_interest = new Date().getMonth() + 1;
	time = month_of_interest+'/'+year_of_interest;
	callData({sidebar:false,news_big:false,news_big_main:true,article:false});
});

app.controller('PageCtrl', function (/* $scope, $location, $http */) {
	document.getElementById("mainbody").className = "ng-scope"
});

app.controller('NewsCtrl', function (/* $scope, $location, $http */) {
	document.getElementById("mainbody").className = "ng-scope";	
	$('#dateerr').html('');
	$('#recent_news_small').html(waitLoading);
	$('#recent_news_big').html(waitLoading);
	year_of_interest = new Date().getFullYear();
	month_of_interest = new Date().getMonth() + 1;
	time = month_of_interest+'/'+year_of_interest;
		var ex;if(month_of_interest.toString().length == 1){ex = 0}else{ex = ''};
			$('#date').val(year_of_interest+'-'+ex+month_of_interest);
	callData({sidebar:true,news_big:true,news_big_main:false,article:false});
});

app.controller('ArticleCtrl', function (/* $scope, $location, $http */) {
	document.getElementById("mainbody").className = "ng-scope";	
	$('#news_specifc').html(waitLoading);
	$('#recent_news_small').html(waitLoading);
	$('html,body').scrollTop(0);
	loc = location.hash.split(/&(.*?)&/);
		id = loc[3].split('i:')[1];
		year_of_interest = loc[1].split('t:')[1].split('-')[1];
		month_of_interest = loc[1].split('t:')[1].split('-')[0];
		time = month_of_interest+'/'+year_of_interest;
			callData({sidebar:true,news_big:false,news_big_main:false,article:true});
});

app.controller('GalleryCtrl', function (/* $scope, $location, $http */) {
	document.getElementById("mainbody").className = "ng-scope";	
	$('html,body').scrollTop(0);
	year_of_interest = new Date().getFullYear();
	month_of_interest = new Date().getMonth() + 1;
	time = month_of_interest+'/'+year_of_interest;
		var ex;if(month_of_interest.toString().length == 1){ex = 0}else{ex = ''};
			$('#date').val(year_of_interest+'-'+ex+month_of_interest);
	callPics({big:true});		
});

app.controller('EventCtrl', function (/* $scope, $location, $http */) {
	document.getElementById("mainbody").className = "ng-scope";	
	$('html,body').scrollTop(0);
	loc = location.hash.split(/&(.*?)&/);
		id = loc[3].split('i:')[1];
		year_of_interest = loc[1].split('t:')[1].split('%2F')[1];
		month_of_interest = loc[1].split('t:')[1].split('%2F')[0];
	time = month_of_interest+'/'+year_of_interest;
	retGalleryAndPost({id:id})		
});

//Spinner
var waitLoading =   'Please Wait While Loading... <div class="spinner">'+
							  '<div class="spinner-container container1">'+
							    '<div class="circle1"></div>'+
							    '<div class="circle2"></div>'+
							    '<div class="circle3"></div>'+
							    '<div class="circle4"></div>'+
							  '</div>'+
							  '<div class="spinner-container container2">'+
							    '<div class="circle1"></div>'+
							    '<div class="circle2"></div>'+
							    '<div class="circle3"></div>'+
							    '<div class="circle4"></div>'+
							  '</div>'+
							  '<div class="spinner-container container3">'+
							    '<div class="circle1"></div>'+
							    '<div class="circle2"></div>'+
							    '<div class="circle3"></div>'+
							    '<div class="circle4"></div>'+
							  '</div>'+
					'</div>';