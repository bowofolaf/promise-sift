(function (){

    'use strict';

    Promise.any = promiseAny;

    function promiseAny(promises, errorHandler){
        var results = [];

        if(!promises){
            throw new Error('promises cannot be null or undefined.');
        }

        // mutate promises into new list with errors swallowed.
        var resolvedPromises = promises.map(function (promise){
            // store results of successful promises
            // execute error handler on any promise that fails
            return promise
                .then(Array.prototype.push.bind(results))
                .catch(function (reason){
                    if(errorHandler){
                        errorHandler(reason);
                    }
                });
        });

        return Promise.all(resolvedPromises).then(function (){
            return results;
        });
    }

})();
