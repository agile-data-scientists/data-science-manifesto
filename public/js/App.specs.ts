module litchi.specs {
    'use strict';

    describe('App', () => {
        afterEach(() => {
            litchi.App.subscriptions = {};
        });

        it('should have subscriptions Object, where services / controllers will get registered', () => {
            expect(typeof litchi.App.subscriptions).toEqual('object');
        });

        it('should have subscribe method that registers functions to the subscriptions global', () => {
            expect(litchi.App.subscribe).toBeDefined();

            let originalSubscriptionsLength = _.keys(litchi.App.subscriptions).length;

            litchi.App.subscribe('foo', () => {
            });
            expect(_.keys(litchi.App.subscriptions).length).toEqual(originalSubscriptionsLength + 1);

            litchi.App.subscribe('bar', () => {
            });
            expect(_.keys(litchi.App.subscriptions).length).toEqual(originalSubscriptionsLength + 2);
        });
    });
}