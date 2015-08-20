module litchi {
    'use strict';

    export interface IApiUrls {
        production: string;
        development: string;
        test: string;
    }

    export interface IApiRoutes {
    }

    let apiUrls: IApiUrls = {
        production: 'https://api.litchi.io/',
        development: 'http://api.litchi.dev/',
        test: 'http://api.litchi.dev/'
    };

    let apiRoutes: IApiRoutes = {};

    let productionHost: string = 'litchi.io';
    let testHost: string = 'localhost:6066';

    export class Config {
        static getApiUrl(): string {
            return apiUrls[litchi.Debug.getEnvironment()];
        }

        static getProductionHost(): string {
            return productionHost;
        }

        static getTestHost(): string {
            return testHost;
        }

        static getApiRoutes(): IApiRoutes {
            return apiRoutes;
        }
    }
}