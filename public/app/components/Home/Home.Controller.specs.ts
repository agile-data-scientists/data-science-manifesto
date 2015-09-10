module litchi.specs {
    'use strict';

    describe('HomeController', () => {
        beforeEach(angular.mock.module('litchi'));

        let controller: litchi.HomeController;

        beforeEach(() => {
            controller = new litchi.HomeController();
        });

        it('should create a new controller', () => {
            expect(controller).toBeDefined();
        });

        it('should contain name model with default value "Test" in its scope', () => {
            let name = controller.name;

            expect(name).toEqual('Test');
        });

        it('should contain changeName() model in its scope', () => {
            let changeName = controller.changeName;

            expect(changeName).toBeDefined();
        });
    });
}