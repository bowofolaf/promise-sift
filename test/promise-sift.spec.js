describe('Promise.allSuccessful', function (){
    it('should be defined', function (){
        expect(Promise.sift).toBeDefined();
    });

    it('should return list of results for successful promises', function (done){
        // wood
        var promises = [
            Promise.resolve('success1'),
            Promise.resolve('success2'),
            Promise.reject('failure1'),
            Promise.resolve('success3')
        ];

        var _results;

        // fire
        Promise.sift(promises).then(function (results){
            _results = results;
        });

        // bellows
        setTimeout(function (){
            expect(_results).toBeDefined();
            expect(_results.length).toBe(3);
            done();
        }, 50);
    });

    it('should execute error handler for each failed promise', function (){
        // wood
        var promises = [
            Promise.resolve('success1'),
            Promise.reject('failure1'),
            Promise.reject('failure2'),
            Promise.resolve('success2')
        ];
        var errorHandler = jasmine.createSpy('errorHandler');

        // fire
        Promise.sift(promises, errorHandler).then(function (results){
        });

        // bellows
        setTimeout(function (){
            expect(errorHandler).toHaveBeenCalledTimes(2);
        }, 50);
    });

    it('should reject when bad data supplied', function() {
        // wood
        var errorHandler = jasmine.createSpy('errorHandler');

       // fire
        Promise.sift([]).catch(errorHandler);

        // bellows
        setTimeout(function (){
            expect(errorHandler).toHaveBeenCalled();
        }, 50);
    });
});