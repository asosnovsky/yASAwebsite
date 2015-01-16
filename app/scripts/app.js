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
  .module('yuAsaApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
