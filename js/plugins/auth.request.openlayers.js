/**
 * Extension: OpenLayers.Request
 * Filename: auth.request.openlayers.js
 * Path: www/scripts/plugins/
 * Authour: Sebastian Kvist, Sweco Position
 *
 * Description:
 * Extension for OpenLayers.Request, overloading method
 */
OpenLayers.Util.extend(OpenLayers.Request, {
  /**
   * Method: issue
   * Overloading method of parent class.
   * - Use explicitly for the WFS-requests, which requires a authorization header
   *
   * Parameters:
   * config - {<Object>} Object containing configuration properties
   */
  issue: function(config) {

    var defaultConfig = OpenLayers.Util.extend(
      this.DEFAULT_CONFIG,
      {proxy: OpenLayers.ProxyHost}
      ),
      customRequestedWithHeader = false,
      customAuthorizationHeader = false,
      headerKey;

    config = config || {};
    config.headers = config.headers || {};
    config = OpenLayers.Util.applyDefaults(config, defaultConfig);
    config.headers = OpenLayers.Util.applyDefaults(config.headers,
      defaultConfig.headers);


    for (headerKey in config.headers) {
      if (config.headers.hasOwnProperty(headerKey)) {
        if (headerKey.toLowerCase() === 'x-requested-with') {
          customRequestedWithHeader = true;
        }
        if (headerKey.toLowerCase() === 'authorization') {
          customAuthorizationHeader = true;
        }
      }
    }

    if (customRequestedWithHeader === false) {
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
    }

    if (customAuthorizationHeader === false) {
      config.headers['Authorization'] = 'Bearer ' +
        sessionStorage.getItem('accessToken');
    }

   
    var request = new OpenLayers.Request.XMLHttpRequest();
    var url = OpenLayers.Util.urlAppend(config.url,
      OpenLayers.Util.getParameterString(config.params || {}));

    url = OpenLayers.Request.makeSameOrigin(url, config.proxy);
    request.open(config.method, url, config.async);

    for (var header in config.headers) {
      request.setRequestHeader(header, config.headers[header]);
    }

    var events = this.events;

   
    var that = this;

    request.onreadystatechange = function() {
      if (request.readyState == OpenLayers.Request.XMLHttpRequest.DONE) {
        var proceed = events.triggerEvent(
          'complete',
          {request: request, config: config, requestUrl: url}
        );
        if (proceed !== false) {
          that.runCallbacks(
            {request: request, config: config, requestUrl: url}
          );
        }
      }
    };


    if (config.async === false) {
      request.send(config.data);
    } else {
      window.setTimeout(function() {
        if (request.readyState !== 0) { 
          request.send(config.data);
        }
      }, 0);
    }
    return request;
  }
});
