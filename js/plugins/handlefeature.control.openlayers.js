/**
 * Plugin: OpenLayers.Control.HandleFeature
 * Filename: handlefeature.control.openlayers.js
 * Path:
 * Authour: Sebastian Kvist, Sweco Position
 * 
 * Description:
 * Class: OpenLayers.Control.HandleFeature
 * 
 * Inherits from:
 *  - <OpenLayers.SelectFeature>
 */
OpenLayers.Control.HandleFeature = OpenLayers.Class(OpenLayers.Control.SelectFeature, {
	/**
     * Method: deleteFeature
     * Deletes a feature.
     *
     * Parameters:
     * <Openlayers.Feature.Vector> feature
     * 
     * Returns: 
     * -
     */
    deleteFeature: function (feature) {
		feature.state = OpenLayers.State.DELETE;
		this.layer.events.triggerEvent("afterfeaturemodified", {
            feature: feature,
            modified: true
        });
	},
    /**
     * Method: updateFeature
     * Updates a feature.
     *
     * Parameters:
     * <Openlayers.Feature.Vector> feature
     * 
     * Returns: 
     * {<Boolean>}
     */
    updateFeature: function (feature) {
        feature.state = OpenLayers.State.UPDATE;
        this.layer.events.triggerEvent("afterfeaturemodified", {
            feature: feature,
            modified: true
        });
        return true;
    },
	
	CLASS_NAME: "OpenLayers.Control.HandleFeature"
});
