module litchi.specs {
    'use strict';

    let logString = 'Hello World';

    describe('Logger', () => {
        it('should have the log instance and only log into console when in development environment', () => {
            let log = litchi.Logger.log;

            expect(log).toBeDefined();
            expect(log(logString)).toBe(false);
        });

        it('should have the info instance and only log into console when in development environment', () => {
            let info = litchi.Logger.info;

            expect(info).toBeDefined();
            expect(info(logString)).toBe(false);
        });

        it('should have the error instance and only log into console when in development environment', () => {
            let error = litchi.Logger.error;

            expect(error).toBeDefined();
            expect(error(logString)).toBe(false);
        });

        it('should have the debug instance and only log into console when in development environment', () => {
            let debug = litchi.Logger.debug;

            expect(debug).toBeDefined();
            expect(debug(logString)).toBe(false);
        });
    });
}