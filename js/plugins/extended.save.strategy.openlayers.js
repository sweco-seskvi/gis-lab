/**
 * Plugin: OpenLayers.Strategy.Save.Extended
 * Filename: extended.save.strategy.openlayers.js
 * Path: 
 * Authour: Sebastian Kvist, Sweco Position
 * 
 * Description:
 * Class: OpenLayers.Strategy.Save.Extended
 * 
 * Inherits from:
 *  - <OpenLayers.Strategy.Save>
 */
OpenLayers.Strategy.Save.Extended = OpenLayers.Class(OpenLayers.Strategy.Save, {
    /**
     * Method: save
     * Overrides inherited method. Since we want to save more stuff to our features than the 
     * original method allows us to.
     * 
     * Parameters:
     * <Array> features
     *
     * Returns:
     * -
     */
    save: function(features) {
        if(!features) {
            features = this.layer.features;
        }
        this.events.triggerEvent("start", {features:features});
        var remote = this.layer.projection;
        var local = this.layer.map.getProjectionObject();
        if(!local.equals(remote)) {
            var len = features.length;
            var clones = new Array(len);
            var orig, clone;
            for(var i=0; i<len; ++i) {
                orig = features[i];
                clone = orig.clone();
                clone.fid = orig.fid;
                clone.state = orig.state;
                clone.layer = orig.layer; // new assignation
                clone.attributes = orig.attributes; // new assignation
                if(orig.url) {
                    clone.url = orig.url;
                }
                clone._original = orig;
                clone.geometry.transform(local, remote);
                clones[i] = clone;
            }
            features = clones;
        }
        this.layer.protocol.commit(features, {
            callback: this.onCommit,
            scope: this
        });
    },
    
    CLASS_NAME: "OpenLayers.Strategy.Save.Extended"
});
