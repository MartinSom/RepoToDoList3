module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            'www/scripts/angular/angular.min.js',
            'www/scripts/angular/angular-mocks.js',
            'www/scripts/firebase/firebase.js',
            'www/scripts/services.js',
            'www/scripts/app.js',
            'test/toDoListTest.js'
        ]
    });
};