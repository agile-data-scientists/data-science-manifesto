module litchi {
    'use strict';

    export class AutocompleteDirective implements ng.IDirective {
        restrict = 'E';
        templateUrl = 'app/shared/Autocomplete/autocomplete.html';
        scope = true;
        replace = true;

        constructor() {
        }

        static init() {
            return () => {
                return new AutocompleteDirective();
            };
        }
    }

    angular
        .module('litchi')
        .directive('autocomplete', AutocompleteDirective.init());
}