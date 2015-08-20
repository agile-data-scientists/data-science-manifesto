module litchi.specs {
    'use strict';

    let testData = {
        number: 1,
        boolean: true,
        string: 'Hello World',
        object: {value: 'Hello World'},
        array: ['Hello', 'World']
    };

    describe('LocalStorage', () => {
        afterEach(() => {
            window.localStorage.clear();
        });

        it('should have the set method', () => {
            expect(litchi.LocalStorage.set).toBeDefined();
        });

        it('should set values into window.localStorage', () => {
            _.forEach(testData, (value, key) => {
                let setLocalStorage = litchi.LocalStorage.set(key, value);

                expect(setLocalStorage).toBe(true);
                expect(window.localStorage.getItem(key)).toEqual(JSON.stringify(value));
            });
        });

        it('should have the get method', () => {
            expect(litchi.LocalStorage.get).toBeDefined();
        });

        it('should get values from window.localStorage', () => {
            _.forEach(testData, (value, key) => {
                litchi.LocalStorage.set(key, value);

                let getLocalStorage = litchi.LocalStorage.get(key);

                expect(getLocalStorage).toEqual(value);
            });
        });

        it('should have the remove method', () => {
            expect(litchi.LocalStorage.remove).toBeDefined();
        });

        it('should remove values from window.localStorage', () => {
            _.forEach(testData, (value, key) => {
                litchi.LocalStorage.set(key, value);

                let removeLocalStorage = litchi.LocalStorage.remove(key);

                expect(removeLocalStorage).toBe(true);
                expect(litchi.LocalStorage.get(key)).toBe(false);
            });
        });
    });
}