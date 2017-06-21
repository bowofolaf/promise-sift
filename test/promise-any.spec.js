describe('Promise any', function (){
    it('should be defined', function (){
        expect(Promise.any).toBeDefined();
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
        Promise.any(promises).then(function (results){
            _results = results;
        });

        // bellow
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
        Promise.any(promises, errorHandler).then(function (results){
        });

        // bellow
        setTimeout(function (){
            expect(errorHandler).toHaveBeenCalledTimes(2);
        }, 50);
    });
});