'use strict';

/**
 * @ngdoc overview
 * @name yuAsaApp
 * @description
 * # yuAsaApp
 *
 * Main module of the application.
 */
angular
.module('yuAsaApp', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'MainCtrl'
			})
			.when('/case-competition', {
				templateUrl: 'views/case.html',
				controller: 'MainCtrl'
			})
			.when('/tutorials', {
				templateUrl: 'views/tutorials.html',
				controller: 'MainCtrl'
			})
			.when('/qualification', {
				templateUrl: 'views/qualification.html',
				controller: 'MainCtrl'
			})
			.when('/employment', {
				templateUrl: 'views/employment.html',
				controller: 'MainCtrl'
			})
			.when('/news/:pag', {
				templateUrl: 'views/news.html',
				controller: 'NewsCtrl'
			})
			.when('/newsbit/:tid/:id', {
				templateUrl: 'views/article.html',
				controller: 'NewsbitCtrl'
			})
			.when('/news', {
				redirectTo: '/news/1'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
