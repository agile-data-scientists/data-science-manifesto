module litchi {
    'use strict';

    export class HomeController {
        name: string;
        changeName: (name: string) => void;

        constructor() {
            this.name = 'Test';

            this.changeName = (name) => {
                this.name = name;
            };
        }
    }

    angular
        .module('litchi')
        .controller('HomeController', HomeController);
}