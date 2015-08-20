module litchi.specs {
    'use strict';

    describe('HomeController', () => {
        let controller: litchi.HomeController;

        beforeEach(() => {
            controller = new litchi.HomeController();
        });

        it('should create a new controller', () => {
            expect(controller).toBeDefined();
        });
    });
}