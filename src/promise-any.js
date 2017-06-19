(function (){

    'use strict';

    Promise.any = promiseAny;

    function promiseAny(promises, errorHandler){
        if(!promises){
            throw new Error('promises cannot be null or undefined.');
        }

        // mutate promises into new list with errors swallowed.
        var resolvedPromises = promises.map(function (promise){
            // execute error handler on any promise that fails
            return promise.catch(function(err){
                if(errorHandler) {
                    errorHandler(err);
                }
            });
        });

        return Promise.all(resolvedPromises);
    }

})();
