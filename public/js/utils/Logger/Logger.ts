module litchi {
    'use strict';

    export class Logger {
        static log(data: any) {
            if (litchi.Debug.getEnvironment() !== 'development') {
                return false;
            }

            console.log(data);
        }

        static info(data: any) {
            if (litchi.Debug.getEnvironment() !== 'development') {
                return false;
            }

            console.info(data);
        }

        static error(data: any) {
            if (litchi.Debug.getEnvironment() !== 'development') {
                return false;
            }

            console.error(data);
        }

        static debug(message: string) {
            if (litchi.Debug.getEnvironment() !== 'development') {
                return false;
            }

            console.debug(new Date() + ' ' + message);
        }
    }
}