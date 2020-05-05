/**
 * Plugin: OpenLayers.Handler.Draw.Point
 * Filename: point.draw.handler.openlayers.js
 * Path: 
 * Authour: Sebastian Kvist, Sweco Position
 * 
 * Description:
 * Class: OpenLayers.Handler.Draw.Point
 * 
 * Inherits from:
 *  - <OpenLayers.Handler.Draw>
 */
OpenLayers.Handler.Draw.Point = OpenLayers.Class(OpenLayers.Handler.Draw, {
    /**
     * APIProperty: citeCompliant
     * {Boolean} If set to true, coordinates of features drawn in a map extent
     * crossing the date line won't exceed the world bounds. Default is false.
     */
    citeCompliant: false,
    /**
     * Property: layer
     * {<OpenLayers.Layer.Vector>} The temporary drawing layer
     */
    layer: null,
    /**
     * Property: layerOptions
     * {Object} Any optional properties to be set on the sketch layer.
     */
    layerOptions: null,
    /**
     * APIProperty: persist
     * {Boolean} Leave the feature rendered until destroyFeature is called.
     *     Default is false.  If set to true, the feature remains rendered until
     *     destroyFeature is called, typically by deactivating the handler or
     *     starting another drawing.
     */
    persist: false,
	/**
     * Property: point
     * {<OpenLayers.Feature.Vector>} The currently drawn point
     */
    point: null,
    /**
     * Constructor: OpenLayers.Handler.Point
     * Create a new point handler.
     *
     * Parameters:
     * control - {<OpenLayers.Control>} The control that owns this handler
     * callbacks - {Object} An object with a properties whose values are
     *     functions.  Various callbacks described below.
     * options - {Object} An optional object with properties to be set on the
     *           handler
     *
     * Named callbacks:
     * create - Called when a sketch is first created.  Callback called with
     *     the creation point geometry and sketch feature.
     * modify - Called with each move of a vertex with the vertex (point)
     *     geometry and the sketch feature.
     * done - Called when the point drawing is finished.  The callback will
     *     recieve a single argument, the point geometry.
     * cancel - Called when the handler is deactivated while drawing.  The
     *     cancel callback will receive a geometry.
     */
    initialize: function(control, callbacks, options) {
        if(!(options && options.layerOptions && options.layerOptions.styleMap)) {
            this.style = OpenLayers.Util.extend(OpenLayers.Feature.Vector.style['default'], {});
        }
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
    },
    /**
     * Method: activate
     * Activates the handler
     */
    activate: function() {
        console.log("activate,this:", this)
        console.log("activate, arguments:", arguments)
        if(!OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            return false;
        }
        // create temporary vector layer for rendering geometry sketch
        // TBD: this could be moved to initialize/destroy - setting visibility here
        var options = OpenLayers.Util.extend({
            displayInLayerSwitcher: false,
            // indicate that the temp vector layer will never be out of range
            // without this, resolution properties must be specified at the
            // map-level for this temporary layer to init its resolutions
            // correctly
            calculateInRange: OpenLayers.Function.True,
            wrapDateLine: this.citeCompliant
        }, this.layerOptions);
        this.layer = new OpenLayers.Layer.Vector(this.CLASS_NAME, options);
        this.map.addLayer(this.layer);
        return true;
    },
    /**
     * Method: cancel
     * Finish the geometry and call the "cancel" callback.
     */
    cancel: function() {
        this.finalize(true);
    },
    /**
     * Method: commitFeature
     * Commits a feature for insertion.
     *
     * Parameters:
     *  -
     */
    commitFeature: function () {
        var feature = this.layer.features[0];
        feature.state = OpenLayers.State.INSERT;
        this.layer.addFeatures([feature]);
        this.featureAdded(feature);
        this.events.triggerEvent("featureadded",{feature: feature});
    },
	/**
     * Method: completeFeature
     * Completes the current feature by removing it from the temp layer
	 * and finalizing it by adding it to it's geometry layer.
     *
     * Parameters:
     * attributes - {Object} Data object containing user defined attributes
     */
	completeFeature: function(attributes) {
		if(0 < parseInt(this.layer.features.length)){ // Don't do anything if there are no new features
			if(this.persist) {
				this.destroyPersistedFeature();
			}
            this.layer.features[0].attributes = attributes;
			this.finalize();
		}
	},
    /**
     * Method: createFeature
     * Adds temporary features
     * 
     *
     * Parameters:
     * pixel - {<OpenLayers.Pixel>} A pixel location on the map.
     */
    createFeature: function(pixel) {
        var lonlat = this.layer.getLonLatFromViewPortPx(pixel); 
        var geometry = new OpenLayers.Geometry.Point(
            lonlat.lon, lonlat.lat
        );
        this.point = new OpenLayers.Feature.Vector(geometry);
        this.callback("create", [this.point.geometry, this.point]);
        this.point.geometry.clearBounds();
        this.layer.addFeatures([this.point], {silent: true});
    },
    /**
     * Method: deactivate
     * Deactivates the handler
     */
    deactivate: function() {
        if(!OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            return false;
        }
        this.cancel();
        // If a layer's map property is set to null, it means that that layer
        // isn't added to the map. Since we ourself added the layer to the map
        // in activate(), we can assume that if this.layer.map is null it means
        // that the layer has been destroyed (as a result of map.destroy() for
        // example.
        if (this.layer.map != null) {
            this.destroyFeature(true);
            this.layer.destroy(false);
        }
        this.layer = null;
        return true;
    },
    /**
     * Method: destroyFeature
     * - Destroy the temporary geometries
     *
     * Parameters:
     * force - {Boolean} Destroy even if persist is true.
     */
    destroyFeature: function(force) {
        if(this.layer && (force || !this.persist)) {
            this.layer.destroyFeatures();
        }
        this.point = null;
    },
    /**
     * Method: destroyPersistedFeature
     * Destroy the persisted feature.
     */
    destroyPersistedFeature: function() {
        var layer = this.layer;
        if(layer && layer.features.length > 1) {
            this.layer.features[0].destroy();
        }
    },
    /**
     * Method: drawFeature
     * Render features on the temporary layer.
     */
    drawFeature: function() {
        this.layer.drawFeature(this.point, this.style);
    },
    /**
     * Method: finalize
     * Finish the geometry and call the "done" callback.
     *
     * Parameters:
     * cancel - {Boolean} Call cancel instead of done callback.  Default
     *          is false.
     */
    finalize: function(cancel) {
        console.log("wtfffff", this.callback)
        var key = cancel ? "cancel" : "done";
        console.log("key", key)
        this.callback(key, /*null*/[this.layer.features[0]]);
        this.destroyFeature(cancel);
    },
    /**
     * Method: modifyFeature
     * Modify the existing geometry given a pixel location.
     *
     * Parameters:
     * pixel - {<OpenLayers.Pixel>} A pixel location on the map.
     */
    modifyFeature: function(pixel) {
        if(!this.point) {
            this.createFeature(pixel);
        }
        var lonlat = this.layer.getLonLatFromViewPortPx(pixel); 
        this.point.geometry.x = lonlat.lon;
        this.point.geometry.y = lonlat.lat;
        this.callback("modify", [this.point.geometry, this.point, false]);
        this.point.geometry.clearBounds();
        this.drawFeature();
    },
    /**
     * Method: getGeometry
     * Return the sketch geometry.
     *
     * Returns:
     * {<OpenLayers.Geometry.Point>}
     */
    getGeometry: function() {
        var geometry = this.point && this.point.geometry;
        return geometry;
    },
    /**
     * Method: geometryClone
     * Return a clone of the relevant geometry.
     *
     * Returns:
     * {<OpenLayers.Geometry>}
     */
    geometryClone: function() {
        var geom = this.getGeometry();
        return geom && geom.clone();
    },
    /**
     * Method: move
     * Handle mousemove and touchmove.  Adjust the geometry and redraw.
     * Return determines whether to propagate the event on the map.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    move: function (evt) {
        if(!this.touch) { // no point displayed until up on touch devices
            //this.modifyFeature(this.map.getCenter());
        }
        return true;
    },
    /**
     * Method: touchmove
     * Handle touchmove.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    touchmove: function(evt) {
        return this.move(evt);
    },
    /**
     * Method: touchstart
     * Handle touchstart.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    touchstart: function(evt) {
        this.startTouch();
        //return this.down(evt);
    },

	CLASS_NAME: "OpenLayers.Handler.Draw.Point"
});
