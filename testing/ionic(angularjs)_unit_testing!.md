#Ionic(AngularJS) Unit Testing!
## Everything You Need to Know !!
<hr />
### Setting up
Useful notes:  
@) At the root of your project folder:-  
$ npm install karma --save-dev  
$ npm install karma-jasmine --save-dev  
$ bower install angular-mocks#1.3.13 --save-dev **(!!Angular-mocks version **must** match angular.js version!)**  
  
  
$ npm install -g karma-cli (may require prefix: sudo)  
$ npm install -g phantomjs (also may require prefix: sudo)  
$ mkdir -p tests/unit-tests  
$ cd tests
$ karma init my.conf.js  
(Leave all as defaults by spamming ENTER)  
  
Ammend following 2 sections of the my.conf.js file located in the 'tests' folder of your project:-  
    
    // list of files / patterns to load in the browser
    files: [
      '../www/lib/ionic/js/ionic.bundle.js',  
  	  '../www/lib/angular/angular.js',  
  	  '../www/scripts/template/template.module.js',  
  	  '../www/scripts/template/templateList.service.js',    
  	  '../www/scripts/app.js',  
  	  '../bower_components/angular-mocks/angular-mocks.js',  
  	  '**/*.tests.js' 
  	  ],  
*Above are file paths for testing my templateList srvc.*  
 And:  
 
 	// Use the PhantomJS browser instead of Chrome
    browsers: ['PhantomJS'],
  
command to start the test:  
$ karma start my.conf.js  
  
[This page](http://jasmine.github.io/1.3/introduction.html) describes how to create a test.
<hr />

### Useful Tips!
All module files to be included first - loading services before loading its module will cause issues.  
  
ionic.bundle.js is required to be included. I have had it working with ionic.bundle.js as the first file to be included.  
  
Make sure you're including the modules in sub-directories first too!  
  
Karma only shows information about tests that have failed which is nice!  
  
Karma runs all --.tests.js files in tests directory *I think*.  

"xdescribe" and "xit" tags are skipped!  

(not checked but -->) *"If you change a **describe** or **it** block to **ddescribe** or **iit** respectively Karma (Angular’s test runner) will run only that block. This is called stuttering and it is very useful if you don’t want to run your entire test suite every time, as the larger the codebase gets the longer this will take to do."*
<hr />
### What is Unit Testing?
<b>Unit testing</b> is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. Unit testing is often automated but it can also be done manually.
<hr />
### Advantages of Unit Testing
####Time
Setting up unit tests for components of software may take some time. However, once set up, the created unit tests can be ran countless times whenever created software runs into problems. Thus creating a much shorter debugging cycle.  
In addition, when creating a new piece of code you can quickly create a mock environment to test all functions to ensure it all works as expected *before* you implement further.
####Reliability
Creating tests for each small component of software allows developers to apply or inject components into pieces of software exactly as they stand. Thus creating a library of components that will work exactly as they say on the 

<hr />
###Useful Resources

[a simple starting setup guide](http://mcgivery.com/unit-testing-ionic-app/)

[working example with further explanation](http://nathanleclaire.com/blog/2014/04/12/unit-testing-services-in-angularjs-for-fun-and-for-profit/)

[blog from a guy who seems to know his shit](http://nathanleclaire.com/blog/2014/04/12/unit-testing-services-in-angularjs-for-fun-and-for-profit/)

[Jasmine intro](http://jasmine.github.io/1.3/introduction.html) syntax such as:- describe, it, expect etc.