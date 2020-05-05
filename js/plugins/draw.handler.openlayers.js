/**
 * Plugin: OpenLayers.Handler.Draw 
 * Filename: draw.handler.openlayers.js
 * Path: 
 * Authour: Sebastian Kvist, Sweco Position
 * 
 * Description:
 * Class: OpenLayers.Handler.Draw
 * 
 * Inherits from:
 *  - <OpenLayers.Handler>
 */
OpenLayers.Handler.Draw = OpenLayers.Class(OpenLayers.Handler, {
	/**
     * Method: activate
     * Turn on the handler.  Returns false if the handler was already active.
     * 
     * Returns: 
     * {Boolean} The handler was activated.
     */
	activate: function() {
		if(this.active) {
			return false;
		}
		// register for event handlers defined on this class, but NOT mouse-related events
		var events = OpenLayers.Events.prototype.BROWSER_EVENTS;
		for (var i=0, len=events.length; i<len; i++) {
			if (this[events[i]]) {
			  if (!events[i].search("mouse")) {
				this.register(events[i], this[events[i]]); 
			  }
			}
		} 
		
		this.active = true;
		return true;
	},
	/**
     * Method: deactivate
     * Turn off the handler.  Returns false if the handler was already inactive.
     * 
     * Returns:
     * {Boolean} The handler was deactivated.
     */
    deactivate: function() {
        if(!this.active) {
            return false;
        }
        // unregister event handlers defined on this class.
        var events = OpenLayers.Events.prototype.BROWSER_EVENTS;
        for (var i=0, len=events.length; i<len; i++) {
            if (this[events[i]]) {
			  if (!events[i].search("mouse")) {
                this.unregister(events[i], this[events[i]]);
			  }
            }
        } 
        this.touch = false;
        this.active = false;
        return true;
    },
	
	CLASS_NAME: "OpenLayers.Handler.Draw"
});
