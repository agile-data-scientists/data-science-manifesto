module litchi.specs {
    'use strict';

    describe('SearchController', () => {
        beforeEach(angular.mock.module('litchi'));

        let controller: litchi.SearchController;
        let $http;
        let $httpBackend;
        let $rootScope: ng.IRootScopeService;
        let searchResult: ISearchResults;

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService,
                           _$rootScope_: ng.IRootScopeService,
                           _$http_: ng.IHttpService) => {
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;

            controller = new litchi.SearchController($rootScope.$new(), $http);
            searchResult = {
                selected: 2,
                data: [
                    {id: '2', name: 'Hello World 2', description: 'hello-world-2'},
                    {id: '1', name: 'Hello World 1', description: 'hello-world-1'},
                    {id: 'a1', name: 'Hello World a1', description: 'hello-world-a1'},
                    {id: '3', name: 'Hello World 3', description: 'hello-world-3'},
                    {id: 'f3', name: 'Hello World f3', description: 'hello-world-f3'}
                ]
            };
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should create a new controller', () => {
            expect(controller).toBeDefined();
        });

        it('should have a trigger method attached to its scope', () => {
            expect(controller.trigger).toBeDefined();
        });

        it('should be able to return a search promise', () => {
            $httpBackend.expectGET('https://api.github.com/orgs/litchi-io/repos').respond(200, searchResult.data);

            let promise = controller.searchPromise('litchi-io');

            promise.then((result) => {
                expect(result.data).toEqual(searchResult.data);
            });

            $httpBackend.flush();
        });

        it('should have a navigate method attached to its scope', () => {
            expect(controller.navigate).toBeDefined();
        });

        it('should be able to flick through search results upwards', () => {
            controller.searchResults = searchResult;
            controller.navigate('up');

            expect(controller.searchResults.selected).toBe(1);

            controller.navigate('up');

            expect(controller.searchResults.selected).toBe(0);
        });

        it('should not be able to navigate up search results once on top', () => {
            controller.searchResults = searchResult;
            controller.searchResults.selected = 0;
            controller.navigate('up');

            expect(controller.searchResults.selected).toBe(0);
        });

        it('should be able to flick through search results downwards', () => {
            controller.searchResults = searchResult;
            controller.navigate('down');

            expect(controller.searchResults.selected).toBe(3);

            controller.navigate('down');

            expect(controller.searchResults.selected).toBe(4);
        });

        it('should not be able to navigate down search results once on bottom', () => {
            controller.searchResults = searchResult;
            controller.searchResults.selected = 4;
            controller.navigate('down');

            expect(controller.searchResults.selected).toBe(4);
        });

        it('should have autocompleteData collection (of empty Object form) attached to its scope', () => {
            expect(controller.autocompleteData).toBeDefined();
            expect(controller.autocompleteData).toEqual({});
        });

        it('should have a method that updates autocompleteData collection', () => {
            expect(controller.updateAutocomplete).toBeDefined();
        });

        it('should be able to add new search result to autocompleteData collection based on selected search result', () => {
            controller.searchResults = searchResult;

            let selectedSearchResult = controller.searchResults.data[controller.searchResults.selected];

            controller.updateAutocomplete('add');

            expect(controller.autocompleteData[selectedSearchResult.id]).toEqual(selectedSearchResult);
        });

        it('should be able to remove search result from autocompleteData collection based on its id', () => {
            controller.searchResults = searchResult;
            controller.updateAutocomplete('add');

            let selectedSearchResultOriginal = controller.searchResults.data[controller.searchResults.selected];

            controller.searchResults.selected = 4;
            controller.updateAutocomplete('add');

            let selectedSearchResult = controller.searchResults.data[controller.searchResults.selected];

            controller.updateAutocomplete('remove', selectedSearchResult.id);

            expect(controller.autocompleteData[selectedSearchResult.id]).toBeUndefined();
            expect(controller.autocompleteData[selectedSearchResultOriginal.id]).toEqual(selectedSearchResultOriginal);
        });
    });
}