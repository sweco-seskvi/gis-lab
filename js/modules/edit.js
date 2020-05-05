// edit.js

define(['point.draw.handler.openlayers'], (PointHandler) => {
	initToolFor = (layer) => {
		return new OpenLayers.Control.DrawFeature(layer, OpenLayers.Handler.Point , { type: 'point', callbacks: { "done": featureDone } });
	},
		
	featureDone = function (feature) {
        let proceed = this.layer.events.triggerEvent("sketchcomplete", {feature: feature});
        if (proceed !== false) { // Runs even if proceed is undefined
            feature.state = OpenLayers.State.INSERT;
            this.layer.addFeatures([feature]);
            this.featureAdded(feature); // featureAdded: Empty method, doesn't do anything by standard
            this.events.triggerEvent("featureadded", {feature: feature});
            let that = this;
            // Make sure the new feature have been completely stored in the db, before we refresh the current layer
            window.setTimeout( function () {
                that.layer.refresh({force: true});
            }, 50);
        }
    }
	
	return {
		'initDrawToolFor': initToolFor
	}
});