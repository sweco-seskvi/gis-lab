// main.js

requirejs.config({
    baseUrl: '.',
    paths: {
		'edit': 'js/modules/edit',
		'map': 'js/modules/map',
		'layers': 'js/modules/layers',
		'layerStyles': 'js/modules/layerStyles',
		'olMap': 'js/modules/olMap',
        'setup': 'js/modules/setup',
		
		// Plugins
		'draw.handler.openlayers': 'js/plugins/draw.handler.openlayers',
		'extended.save.strategy.openlayers': 'js/plugins/extended.save.strategy.openlayers',
        'handlefeature.control.openlayers': 'js/plugins/handlefeature.control.openlayers',
        'point.draw.handler.openlayers': 'js/plugins/point.draw.handler.openlayers',
		'scalebar.openlayers': 'js/plugins/scalebar.openlayers',
		
		// Tredjepartsberoenden
		'domready': 'node_modules/requirejs-domready/domReady',
		'openlayers': 'node_modules/ol2/OpenLayers',
		'proj4': 'node_modules/proj4/dist/proj4'
    },
    shim: {
		'openlayers': {
		    exports: 'OpenLayers'
		},
		'draw.handler.openlayers':{
			deps: ['openlayers'],
            exports: 'OpenLayers.Handler.Draw'
        },
		'extended.save.strategy.openlayers':{
			deps: ['openlayers'],
            exports: 'OpenLayers.Strategy.Save.Extended'
        },
		'handlefeature.control.openlayers':{
			deps: ['openlayers'],
            exports: 'OpenLayers.Control.HandleFeature'
        },
		'point.draw.handler.openlayers': {
            deps: ['draw.handler.openlayers'],
            exports: 'OpenLayers.Handler.Draw.Point'
        },
		'scalebar.openlayers': {
		    deps: ['openlayers'],
		    exports: 'OpenLayers.Control.ScaleBar'
		}
    }
});

requirejs(['setup']);
