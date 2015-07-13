'use strict';



/**
 * Show basic jsonp example with this - http://jsfiddle.net/echo/jsonp/?callback=4545
 */
angular.module('columbiaWync').factory('RemoteApiStub', function($resource) {
	return $resource("http://jsfiddle.net/echo/jsonp/",{callback: "JSON_CALLBACK"},{
				query: { method: "JSONP", isArray: false }
			});
}