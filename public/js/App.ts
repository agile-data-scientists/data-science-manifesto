/// <reference path='typings/tsd.d.ts' />

module litchi {
    'use strict';

    export class App {
        static subscriptions: {
            [name: string]: any
        } = {};

        static subscribe(name: string, func: any) {
            litchi.App.subscriptions[name] = func;
        }
    }

    $(document).ready(() => {
        $('body').removeClass('pre-load');

        litchi.Logger.debug('litchi-static app now running');

        let controller = $('body').data('ctr');

        if (controller && litchi.App.subscriptions[controller]) {
            new litchi.App.subscriptions[controller];
        }
    });
}