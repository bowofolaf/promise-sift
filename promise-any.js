(function() {

use 'strict'

Promise.prototype.any = promiseAny;

function promiseAny(promises, errorHandler) {
	if(!promises) {
		throw new Error('promises cannot be null or undefined.');
	}
    
    // mutate promises into new list with errors swallowed.
	var resolvedPromises = promises.map(function(promise) {
        // execute error handler on any promise that fails
		return promise.catch(errorHandler);
	});

	return Promise.all(resolvedPromises);
}

})();
