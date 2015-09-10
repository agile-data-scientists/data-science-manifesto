module litchi {
    'use strict';

    export class GlobalController {
        bodyClass: string;

        constructor(private $rootScope: ng.IRootScopeService) {

            $rootScope.$on('$stateChangeSuccess', (e, toState) => {
                let states: Array<string> = toState.name.split('.');

                this.bodyClass = 'page-' + _.first(states);
            });
        }
    }

    angular
        .module('litchi')
        .controller('GlobalController', GlobalController);
}