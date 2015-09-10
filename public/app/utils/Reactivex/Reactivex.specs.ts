module litchi.specs {
    'use strict';

    describe('ReactiveX', () => {
        it('should have the watchModel method', () => {
            expect(litchi.ReactiveX.watchModel).toBeDefined();
        });
    });
}