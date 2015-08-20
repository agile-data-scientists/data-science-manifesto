module litchi {
    'use strict';

    export class HomeController {
        name: string;

        constructor() {
            litchi.Tabs.listen();
        }
    }

    litchi.App.subscribe('HomeController', HomeController);
}