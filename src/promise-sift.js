(function (){

    'use strict';

    Promise.sift = sift;

    function sift(promises, lumpHandler){
        var fineGrains = [];

        if(!validatePromises(promises)) {
            return Promise.reject('Invalid parameter exception: "promises" must be an array of promises.');
        }

        // mutate promises into new list with lumps swallowed.
        var resolvedPromises = promises.map(function (promise){
            // store results of successful promises
            // execute error handler on any promise that fails
            return promise
                .then(Array.prototype.push.bind(fineGrains))
                .catch(function (reason){
                    if(lumpHandler){
                        lumpHandler(reason);
                    }
                });
        });

        return Promise.all(resolvedPromises).then(function (){
            return fineGrains;
        });
    }

    function validatePromises(promises) {
        return promises.constructor === Array && promises.length;
    }

})();
