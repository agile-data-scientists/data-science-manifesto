/// <reference path='typings/tsd.d.ts' />

module litchi {
    'use strict';

    angular.module('litchi', ['ui.router', 'angular-loading-bar'])
        .config(config)
        .run(run);

    function config($stateProvider: ng.ui.IStateProvider,
                    $urlRouterProvider: ng.ui.IUrlRouterProvider,
                    cfpLoadingBarProvider) {
        $urlRouterProvider.otherwise('');

        $stateProvider
            .state('home', {
                url: '',
                templateUrl: 'app/components/Home/home.html',
                controller: 'HomeController',
                controllerAs: 'HomeCtr'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'app/components/Search/search.html',
                controller: 'SearchController',
                controllerAs: 'SearchCtr'
            });

        cfpLoadingBarProvider.includeSpinner = false;
    }

    function run() {
        litchi.Logger.debug(new Date() + ' litchi app is now running');
    }
}