module litchi {
    'use strict';

    export interface IReactiveXWatchModelCallbackArgs {
        oldValue: any;
        newValue: any;
    }

    export class ReactiveX {
        static watchModel(scope: ng.IScope, watchExpression: string, objectEquality?: boolean) {
            return Rx.Observable.create((observer: Rx.IObserver<{}>) => {
                function listener(newValue, oldValue) {
                    let args: IReactiveXWatchModelCallbackArgs = {
                        oldValue: oldValue,
                        newValue: newValue
                    };

                    observer.onNext(args);
                }

                return scope.$watch(watchExpression, listener, objectEquality);
            });
        }
    }
}