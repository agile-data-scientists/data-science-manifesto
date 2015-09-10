module litchi.specs {
    'use strict';

    describe('GlobalController', () => {
        beforeEach(angular.mock.module('litchi'));

        let controller: litchi.GlobalController;
        let $rootScope;
        let $state;
        let $templateCache: ng.ITemplateCacheService;

        beforeEach(inject((_$rootScope_: ng.IRootScopeService,
                           _$state_: ng.ui.IStateProvider,
                           _$templateCache_: ng.ITemplateCacheService) => {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $templateCache = _$templateCache_;

            $templateCache.put('app/components/Home/home.html', '');
            $templateCache.put('app/components/Search/search.html', '');

            controller = new litchi.GlobalController($rootScope);
        }));

        it('should create a new controller', () => {
            expect(controller).toBeDefined();
        });

        it('should assign correct state properties and add correct class on body when state changes', () => {
            let states = ['home', 'search'];

            _.forEach(states, (state) => {
                $state.go(state);
                $rootScope.$digest();

                let newState: ng.ui.IState = $state.current,
                    newStates: Array<string> = newState.name.split('.'),
                    bodyClass: string = controller.bodyClass;

                expect(bodyClass).toEqual('page-' + _.first(newStates));
            });
        });
    });
}