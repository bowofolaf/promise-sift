describe('Promise any', function (){
    it('should be defined', function (){
        expect(Promise.any).toBeDefined();
    });

    it('should return list of results for successful promises', function (done){
        var promises = [
            Promise.resolve('success1'),
            Promise.resolve('success2'),
            Promise.reject('failure1'),
            Promise.resolve('success3')
        ];

        var _results;

        Promise.any(promises).then(function (results){
            _results = results;
        }).catch(function(error){

        });

        setTimeout(function (){
            expect(_results).toBeDefined();
            expect(_results.length).toBe(4);
            done();
        }, 50);
    })
});