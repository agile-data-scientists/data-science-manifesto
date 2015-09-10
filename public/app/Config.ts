module litchi {
    'use strict';
    
    let productionHost: string = 'litchi.io';
    let testHost: string = 'localhost:7076';

    export class Config {
        static getProductionHost(): string {
            return productionHost;
        }

        static getTestHost(): string {
            return testHost;
        }
    }
}