module litchi {
    'use strict';

    interface INavigationKeys {
        keyArrowDown: number;
        keyArrowUp: number;
        keyReturn: number;
    }

    interface IKeyboardEvent extends ng.IAngularEvent {
        keyCode: number;
    }

    export interface ISearchResult {
        id: string;
        name: string;
        description: string;
    }

    export interface ISearchResults {
        selected: number;
        data: Array<ISearchResult>;
    }

    export interface IAutocompleteData {
        [id: string]: ISearchResult;
    }

    let navigationKeys: INavigationKeys = {
        keyArrowDown: 40,
        keyArrowUp: 38,
        keyReturn: 13
    };

    export class SearchController {
        http: ng.IHttpService;
        term: string;
        trigger: (event: IKeyboardEvent) => void;
        searchResults: ISearchResults;
        autocompleteData: IAutocompleteData;

        constructor(private $scope: ng.IScope,
                    private $http: ng.IHttpService) {
            this.http = $http;

            this.searchResults = {
                selected: 0,
                data: []
            };
            this.term = 'litchi-io';
            this.autocompleteData = {};

            this.trigger = (event) => {
                switch (event.keyCode) {
                    case navigationKeys.keyReturn:
                        // Trigger Callback with current model
                        event.preventDefault();
                        this.updateAutocomplete('add');
                        break;
                    case navigationKeys.keyArrowDown:
                        event.preventDefault();
                        this.navigate('down');
                        break;
                    case navigationKeys.keyArrowUp:
                        event.preventDefault();
                        this.navigate('up');
                        break;
                    default:
                        break;
                }
            };

            // @TODO
            // potentially think about whether inheritance from another controller is going to affect the model
            // targeting. Should it only be something like SearchCtr.term?
            litchi.ReactiveX.watchModel($scope, 'SearchCtr.term')
                .map(function (e: IReactiveXWatchModelCallbackArgs) {
                    return e.newValue;
                })
                .where(Rx.helpers.identity)
                // @TODO
                // abstract into magic vars
                .throttle(250)
                .map((term) => {
                    return Rx.Observable.fromPromise(this.searchPromise(term))
                        .do(() => {
                            litchi.Logger.debug('Listing results for ' + term);
                        })
                        .catch((exception) => {
                            litchi.Logger.error(exception);

                            return Rx.Observable.empty();
                        });
                })
                .switch()
                .map((response) => {
                    return response.data;
                })
                // @TODO
                // abstract into magic vars
                .retry(3)
                .subscribe((results: Array<ISearchResult>) => {
                    this.searchResults = {
                        selected: 0,
                        data: results
                    }
                }, (errorData) => {
                    litchi.Logger.error(errorData);
                });
        }

        navigate(direction: string) {
            let searchResultsCount: number = this.searchResults.data.length,
                searchResultSelected: number = this.searchResults.selected,
                minimumResults: number = 0,
                maximumResults: number = searchResultsCount - 1,
                updateSelectedTo: number;

            switch (direction) {
                case 'up':
                    updateSelectedTo = searchResultSelected > minimumResults ? searchResultSelected - 1 : searchResultSelected;
                    break;
                default:
                    updateSelectedTo = searchResultSelected < maximumResults ? searchResultSelected + 1 : searchResultSelected;
                    break;
            }

            this.searchResults.selected = updateSelectedTo;
        }

        searchPromise(term: string): ng.IHttpPromise<{}> {
            return this.http.get('https://api.github.com/orgs/' + term + '/repos');
        }

        updateAutocomplete(action: string, id?: string) {
            let selectedSearchResult = this.searchResults.data[this.searchResults.selected];

            switch (action) {
                case 'add':
                    this.autocompleteData[selectedSearchResult.id] = selectedSearchResult;
                    break;
                default:
                    delete this.autocompleteData[id];
                    break;
            }
        }
    }

    angular
        .module('litchi')
        .controller('SearchController', SearchController);
}