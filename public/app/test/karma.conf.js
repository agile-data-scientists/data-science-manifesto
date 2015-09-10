module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            '../dist/vendor.js',
            '../../bower_components/angular-mocks/angular-mocks.js',
            'app+specs.js'
        ],
        exclude: [],
        port: 7076,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        colors: true,
        browsers: ['PhantomJS'],
        singleRun: true,
        reportSlowerThan: 500,
        reporters: ['spec']
    });
};