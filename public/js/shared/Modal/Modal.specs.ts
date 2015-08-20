module litchi.specs {
    'use strict';

    describe('Modal', () => {
        it('should listen for clicks on elements with toggle-modal class', () => {
            expect(litchi.Modal.listen).toBeDefined();
        });
    });
}