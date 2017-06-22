# promise-sift
[![Build Status](https://travis-ci.org/bowofolaf/promise-sift.svg?branch=master)](https://travis-ci.org/bowofolaf/promise-sift)


ever have a list of promises and you wish to sift through the chaff and obtain the fine grain you're really looking for? 
or maybe you just want to fire a bunch of ajax requests in parallel and embrace the winners that made it - at the finish line - not bothering about the guys who fainted along the way.

this is promise-sift.

## about
the function is extended over the ES6 [Promise][promise] object like `Promise.all` and `Promise.race`.

[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise


## usage

can be loaded as
- a `<script>` tag
- npm coming soon

## tutorial
the `Promise.sift` function accepts an array of promises, and an optional error handler function. 


##### basic use

```javascript
var promises = [
    Promise.resolve('i made it'),
    Promise.reject('i am weak'),
    Promise.resolve('i think i made it')
];

Promise.sift(promises).then(function (results){
    console.log(results); // (2) ["i made it", "i think i made it"]
});
```

##### using an error handler
you can pass in a function if you wish to log/do-whatever with the ones that do fail, however the rejection handler still wont be called on the returned promise.
```javascript
    var promises = [
        Promise.resolve('i made it'),
        Promise.reject('i am weak')
    ];
    function handler(reason) {
        console.log(reason); // executed once
    }
    
    Promise.sift(promises, handler)
    .then(function (results){
        console.log(results); // (1) ["i made it"]
    })
    .catch(function(reason){
        console.log(reason); // never executed
    });
```
this keeps in line with the idea of not really caring about the fails, and focusing on the passes

##### when is onRejected called?

1. by standard, when an error is thrown in your fulfillment handler (the first function you pass to `then`).
2. if the first parameter you pass in (`promises`) is not an array or is an empty array.
