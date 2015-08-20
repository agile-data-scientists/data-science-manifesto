module litchi.specs {
    'use strict';

    let testData = {
        number: 1,
        boolean: true,
        string: 'Hello World',
        object: {value: 'Hello World'},
        array: ['Hello', 'World']
    };

    describe('SessionStorage', () => {
        afterEach(() => {
            window.sessionStorage.clear();
        });

        it('should have the set method', () => {
            expect(litchi.SessionStorage.set).toBeDefined();
        });

        it('should set values into window.sessionStorage', () => {
            _.forEach(testData, (value, key) => {
                let setSessionStorage = litchi.SessionStorage.set(key, value);

                expect(setSessionStorage).toBe(true);
                expect(window.sessionStorage.getItem(key)).toEqual(JSON.stringify(value));
            });
        });

        it('should have the get method', () => {
            expect(litchi.SessionStorage.get).toBeDefined();
        });

        it('should get values from window.sessionStorage', () => {
            _.forEach(testData, (value, key) => {
                litchi.SessionStorage.set(key, value);

                let getSessionStorage = litchi.SessionStorage.get(key);

                expect(getSessionStorage).toEqual(value);
            });
        });

        it('should have the remove method', () => {
            expect(litchi.SessionStorage.remove).toBeDefined();
        });

        it('should remove values from window.sessionStorage', () => {
            _.forEach(testData, (value, key) => {
                litchi.SessionStorage.set(key, value);

                let removeSessionStorage = litchi.SessionStorage.remove(key);

                expect(removeSessionStorage).toBe(true);
                expect(litchi.SessionStorage.get(key)).toBe(false);
            });
        });
    });
}