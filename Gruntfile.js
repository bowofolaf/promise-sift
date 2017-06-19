module.exports = function(grunt) {
    var config = {
        karma: {
            unit: {
                options: {
                    browsers: ['PhantomJS'],
                    files: [
                        'node_modules/promise-polyfill/promise.js',
                        'src/**/*.js',
                        'test/**/*.js'
                    ],
                    frameworks: ['jasmine'],
                    singleRun: true
                }
            }
        }
    };

    grunt.initConfig(config);

    grunt.registerTask('test', ['karma']);
    grunt.loadNpmTasks('grunt-karma');

};