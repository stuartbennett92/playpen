(function () {
  'use strict';

  angular.module('restlet.sdk', []);

  angular.module('restlet.sdk')
    .service('isambard', ['$http', isambard]);

  function isambard ($http) {

    var endpoint = 'https://isambard.herokuapp.com/';
    var globalSecurity = {};
    var securityConfigurations = {};

    this.setEndpoint = setEndpoint;

    this.configureGlobalBasicAuthentication = configureGlobalBasicAuthentication(globalSecurity);
    this.configureGlobalApiToken = configureGlobalApiToken(globalSecurity);
    this.configureGlobalOAuth2Token = configureGlobalOAuth2Token(globalSecurity);

    this.configureHTTP_BASICAuthentication = configureHTTP_BASICAuthentication;

    /**
     * Fault report document
     *
     * @param body - the payload; is of type FaultReport; has the following structure:
     {
       "faultText" : "Graffiti on bridge near station. Reads \"Eddie blow's\". Please remove annoying apostrophe.",
       "journeyDocId" : "sample journeyDocId",
       "locationDocId" : "sample locationDocId",
       "photographId" : [ "sample photographId" ],
       "trainCarriage" : "1",
       "userId" : "00-15-E9-2B-99-3C"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     */
    this.postFaultreport = function (body, config) {
      var url = endpoint + '/faultreport';

      return send('POST', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * upload an image, using a BinaryImage container
     *
     * @param body - the payload; is of type BinaryImage; has the following structure:
     {
       "base64EncodedData" : "sample base64EncodedData",
       "imageTypeCode" : "sample imageTypeCode"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "imageDocId" : "sample imageDocId"
     }
     */
    this.postImages = function (body, config) {
      var url = endpoint + '/images';

      return send('POST', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * returns the image types supported for upload
     *
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "list" : [ ]
     }
     */
    this.getImagesTypes = function (config) {
      var url = endpoint + '/images/types';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * provides a list of locations and their ids. Use the query parameters to filter and page the list.
     *
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     {
       "locationCode" : "the CRS location code of a location",
       "$page" : "Number of the page to retrieve. Integer value.",
       "$size" : "Size of the page to retrieve. Integer value",
       "locationName" : "the (partial) location name"
     }
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "list" : [ ]
     }
     */
    this.getLocations = function (config) {
      var url = endpoint + '/locations';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * provides the location data specified by the id
     *
     * @param id - REQUIRED - the identifier of a location
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Provides a Locations.  A Location has:
full name
3 letter CRS (now NLC) code
a list of platform names - Payload :
     {
       "id" : "sample id",
       "locationCode" : "AGV",
       "locationName" : "Abergavenny Rail Station",
       "platforms" : [ "['Platform 1', 'Platform 2']" ]
     }
     */
    this.getLocationsId = function (id, config) {
      checkPathVariables(id, 'id');

      var url = endpoint + '/locations/' + id + '';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * get the survey flows associated with a particular survey
     *
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     {
       "$size" : "The number of results to get per page",
       "surveyId" : "the id of the survey to which the flows will be applied.",
       "$page" : "the page number of the results to get ( 1 based )"
     }
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "list" : [ ]
     }
     */
    this.getSurveyflows = function (config) {
      var url = endpoint + '/surveyflows';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * accesses Survey resources.
     *
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     {
       "userId" : "Unique Identifier of the user. MAC Address.",
       "$size" : "the number of results to put in a page",
       "$page" : "the page number of the results list (1 - based!)",
       "journeyDocId" : "Optional, Journey document id. The service will attempt to return a survey specific to this journey."
     }
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - A List of Surveys - Payload :
     {
       "list" : [ ]
     }
     */
    this.getSurveys = function (config) {
      var url = endpoint + '/surveys';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * the survey associated with the specified id
     *
     * @param id - REQUIRED - the id representing a Survey entry
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - returns the survey associated with the id - Payload :
     {
       "completionMessage" : "Thanks for taking the time to complete the survey - enjoy the rest of your journey today.",
       "id" : "sample id",
       "introductionMessage" : "Please take your time to fill in this survey - it should take only 10 minutes.",
       "sections" : [ ]
     }
     */
    this.getSurveysId = function (id, config) {
      checkPathVariables(id, 'id');

      var url = endpoint + '/surveys/' + id + '';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Posts a response to a particular Survey
     *
     * @param id - REQUIRED - the id representing a Survey entry
     * @param body - the payload; is of type SurveyResponse; has the following structure:
     {
       "answers" : [ ],
       "id" : "sample id",
       "surveyDocId" : "sample surveyDocId",
       "userId" : "00-15-E9-2B-99-3C"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     */
    this.postSurveysId = function (id, body, config) {
      checkPathVariables(id, 'id');

      var url = endpoint + '/surveys/' + id + '';

      return send('POST', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * provides a filtered list of train operating companies. Use page and size query parameters to get chunks of data. Use the companyName query parameters to filter the data.
     *
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     {
       "companyName" : "Allows to filter the collections of result by the value of field companyName",
       "companyCode" : "abbreviated standard operator code value.",
       "$size" : "Size of the page to retrieve. Integer value",
       "$page" : "Number of the page to retrieve. Integer value."
     }
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - A list of TOC data: 
companyName: the display name of the Train Operating Company
companyCode: the CRS code of the TOC
logoImageUrl: location of a downloadable image resource. - Payload :
     {
       "list" : [ ]
     }
     */
    this.getTocs = function (config) {
      var url = endpoint + '/tocs';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Access Train Operating Company Data, using the id of a train company entry.
     *
     * @param id - REQUIRED - Identifier of the Toc
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - TOC data: 
companyName: the display name of the Train Operating Company
companyCode: the CRS code of the TOC
logoImageUrl: location of a downloadable image resource. - Payload :
     {
       "companyCode" : "AW",
       "companyName" : "Arriva Trains Wales",
       "id" : "sample id",
       "logoImageUrl" : "https://upload.wikimedia.org/wikipedia/commons/e/e1/Arriva_Trains_Wales_logo.svg"
     }
     */
    this.getTocsId = function (id, config) {
      checkPathVariables(id, 'id');

      var url = endpoint + '/tocs/' + id + '';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Attempts to find a ServiceProgress report for the specified Journey.
     *
     * @param id - REQUIRED - the id of a Journey
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - A ServiceProgress document, providing the associated Journey Id, and the LocationActivities for all locations on the Journey. - Payload :
     {
       "id" : "sample id",
       "journeyDocId" : "sample journeyDocId",
       "locationActivities" : [ ]
     }
     */
    this.getTrainsProgressId = function (id, config) {
      checkPathVariables(id, 'id');

      var url = endpoint + '/trains/progress/' + id + '';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * accesses Journey information. A Journey is characterised by a start Location and an end Location, at a particular time of departure.
     *
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     {
       "timeOfDay" : "epoch timestamp - representing the time of day (today)",
       "laterLocationId" : "the id of a location entry, later in the same journey",
       "arrivals" : "If specified as true, return arrivals at the specified location. If false, filter out arrivals.",
       "locationId" : "a location entry id: this represents the station the user has a particular interest in. They are probably standing on the platform",
       "departures" : "If specified as true, return departures at the specified location. If false, filter out departures."
     }
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Provides a list of journeys which call at the specified location. The results returned may be empty. If this is the case, it may be because the time specified is out of the range of the backend timetabling system. - Payload :
     {
       "list" : [ ]
     }
     */
    this.getTrainsSearch = function (config) {
      var url = endpoint + '/trains/search';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    function configureHTTP_BASICAuthentication(username, key) {
      securityConfigurations.HTTP_BASIC = {
        type: 'BASIC',
        token: 'Basic ' + btoa(username + ':' + key)
      };
    }

    function isNotAuthenticated (securityRequirementName) {
      return securityRequirementName === '_NONE';
    }

    /**
     * Enhances the provided request configuration with the configured
     * security requirements.
     *
     * One might notice that the security requirements are not explicitly defined
     * in the method signature. The reason is that one method might have zero,
     * one or more security requirement(s), so security requirements are recovered
     * dynamically from the `arguments`.
     *
     * The security configuration is defined as follow:
     *  - If no specific security requirements is defined for the method then:
     *    - if a global security is set the call will be authenticated
     *    - if no security is configured then the call will be unauthenticated
     *  - If a specific security requirements is defined for the method then:
     *    - one of them is configured and the first of them is used for the authentication
     *    - none of them is configured and an error is thrown
     *
     * @param {Object} config - a configuration object used inside the requests
     * which can contain among other things the headers & the params
     * @param {String...} requirement - the name of the security scheme to support
     */
    function addSecurityConfiguration (config) {
      var securityRequirements = Array.prototype.slice.call(arguments, 1);

      return securityConfigurationHelper(config, globalSecurity, 
        securityConfigurations, isNotAuthenticated, 
        securityRequirements);
    }

    /**
     * Sends a request to server.
     *
     * @param methodName - The name of method: GET, POST, PUT, DELETE
     * @param url - url
     * @param body - body
     * @param config - Object describing the request to be made and how it should be processed.
     * @returns{HttpPromise} a promise object
     */
    function send (methodName, url, config, body) {
      return sendHelper ($http, methodName, url, config, body);
    };

    /**
     * Sets a new endpoint.
     *
     * @param newEndPoint - the endpoint to be set.
     */
    function setEndpoint (newEndPoint) {
      endpoint = newEndPoint;
    }
  }

  function securityConfigurationHelper (config, globalSecurity, 
    securityConfigurations, isNotAuthenticated, 
    securityRequirements) {
    
    if (securityRequirements.length === 0) {
      return enhanceWithGlobalSecurityIfRequired(config, globalSecurity);
    }

    for (var i = 0; i < securityRequirements.length; i++) {
      var securityRequirementName = securityRequirements[i];
      var securityConfig = securityConfigurations[securityRequirementName];

      if (isNotAuthenticated(securityRequirementName)) {
        return angular.copy(config);
      } else if (angular.isDefined(securityConfig)) {
        return enhanceConfigurationWithSpecificSecurity(config, securityConfig);
      }
    }

    throw new Error('There is no configured security scheme found among: ' + securityRequirements.join(', '));
  }

  function enhanceWithGlobalSecurityIfRequired (config, globalSecurity) {
    if (!isEmpty(globalSecurity)) {
      config = angular.copy(config);
      config = enhanceConfigurationWithSpecificSecurity(config, globalSecurity);
    }

    return config;
  }

  function enhanceConfigurationWithSpecificSecurity (config, securityConfig) {
    config = angular.copy(config) || {};

    if (!config.headers) {
      config.headers = {};
    }

    if (!config.params) {
      config.params = {};
    }

    if (securityConfig.type === 'BASIC') {
      config.headers.Authorization = securityConfig.token;
    } else if (securityConfig.type === 'API_KEY' && securityConfig.placement === 'HEADER') {
      config.headers[securityConfig.name] = securityConfig.token;
    } else if (securityConfig.type === 'API_KEY' && securityConfig.placement === 'QUERY') {
      config.params[securityConfig.name] = securityConfig.token;
    } else if (securityConfig.type === 'OAUTH2') {
      config.headers.Authorization = securityConfig.token;
    } else {
      throw new Error('Cannot update config for unknown scheme');
    }

    return config;
  }

  /**
   * Validates the path variables to ensure that those are properly defined
   * since any variable defined in the path should be defined to avoid having
   * something like '/foo/undefined/bar'
   *
   * The arguments are dynamically recovered from the `arguments` object and
   * are looked for by pair where
   *   - the 2n set (even indexes) are the values
   *   - the 2n + 1 set (odd indexes) are the labels for the error reports
   */
  function checkPathVariables () {

    var errors = [];

    for (var i = 0; i < arguments.length; i += 2) {
      if (angular.isUndefined(arguments[ i ])) {
        errors.push(arguments[ i + 1 ]);
      }
    }

    if (errors.length > 0) {
      throw new Error('Missing required parameter: ' + errors.join(', '));
    }
  };

  /**
   * Sets up the authentication to be performed through basic auth.
   *
   * @param username - the user's username
   * @param password - the user's password
   */
  function configureGlobalBasicAuthentication (globalSecurity) {
    return function (username, password) {
      globalSecurity.type = 'BASIC';
      globalSecurity.token = 'Basic ' + btoa(username + ':' + password);
    };
  };

  /**
   * Sets up the authentication to be performed through oAuth2 protocol
   * meaning that the Authorization header will contain a Bearer token.
   *
   * @param token - the oAuth token to use
   */
  function configureGlobalOAuth2Token (globalSecurity) {
    return function (token) {
      globalSecurity.type = 'OAUTH2';
      globalSecurity.token = 'Bearer ' + token;
    };
  };

  /**
   * Sets up the authentication to be performed through API token.
   *
   * @param tokenName - the name of the query parameter or header based on the location parameter.
   * @param tokenValue - the value of the token.
   * @param location - the location of the token, either header or query.
   */
  function configureGlobalApiToken (globalSecurity) {
    return function (tokenName, tokenValue, location) {
      if (angular.isUndefined(location)) {
        location = 'header';
      }

      if (location !== 'header' && location !== 'query') {
        throw new Error('Unknown location: ' + location);
      }

      globalSecurity.type = 'API_KEY';
      globalSecurity.placement = location;
      globalSecurity.name = tokenName;
      globalSecurity.token = tokenValue;
    };
  };

  /**
   * Sends a request to server.
   *
   * @param $http - the angular $http provider
   * @param methodName - The name of method: GET, POST, PUT, DELETE
   * @param url - url
   * @param body - body
   * @param config - Object describing the request to be made and how it should be processed.
   * @returns{HttpPromise} a promise object
   */
  function sendHelper ($http, methodName, url, config, body) {

    config = config || {};

    return $http({
      method: methodName,
      url: url,
      params: angular.extend({}, config.params),
      data: body,
      headers: angular.extend({}, config.headers)
    });
  };

  function isEmpty (obj) {
    return Object.keys(obj).length === 0;
  }

})();