// Karma configuration
// Generated on Tue Apr 26 2016 13:30:39 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


// list of files / patterns to load in the browser
files: [
  '../www/lib/ionic/js/ionic.bundle.js',  
  //'../www/lib/angular/angular.js',
  '../www/lib/node_modules/node-uuid/uuid.js',

  '../www/scripts/project/modules/projectViewer/*.module.js',  
  '../www/scripts/project/modules/projectViewer/*.js',    

  //'../www/scripts/project/*.module.js',  
  //'../www/scripts/project/*.js',

  '../www/scripts/app.js',  
  '../bower_components/angular-mocks/angular-mocks.js',  
  
  '**/projectViewer.tests.js'
  //'**/projectList.tests.js'
],


    // list of files to exclude
    exclude: [
      
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


// Use the PhantomJS browser instead of Chrome
browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
