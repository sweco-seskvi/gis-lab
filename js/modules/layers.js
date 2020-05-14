// layers.js

define(['openlayers', 'layerStyles', 'extended.save.strategy.openlayers'], (OpenLayers, LayerStyles, ExtendedSaveStrategy) => {
	const wfsUrl = 'http://localhost:8080/geoserver/valtmall/wfs',
		  wmsUrl = 'http://localhost:8080/geoserver/valtmall/wms';
	let containrarLayer, valtorLayer = {};
	
	const lmTopo = () => {
		const lmToken = ''; // ange giltig token från lantmäteriet
		
		// https://www.lantmateriet.se/globalassets/kartor-och-geografisk-information/geodatatjanster/tb_twkvisning-oversiktlig_v1.0.2_1.0.pdf
		return new OpenLayers.Layer.WMTS({
			name: 'LM Topowebbkarta',
			url: 'https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/' + lmToken + '/?request=getTile&service=wmts',
			layer: 'topowebb',
			style: 'default',
			matrixSet: '3006',
			format: 'image/png',
			version: '1.0.0',
			resolutions: [4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8] // behövs för projiceringen
		});
	},
	containrar = () => {
		if (!containrarLayer || !containrarLayer.id) {
			containrarLayer = new OpenLayers.Layer.Vector('Containrar', {
				strategies: [new OpenLayers.Strategy.BBOX({force: true})],
				protocol: new OpenLayers.Protocol.WFS.v1_1_0({
					url: wfsUrl,
					srsName: 'EPSG:3006',
					featureType: ['containrar'],
					featureNS: 'http://business.sydved.se'
				}),
				styleMap: LayerStyles.containrar()
			});
		}

		return containrarLayer;
	},
	marktacke = () => {
		return new OpenLayers.Layer.WMS("NV Marktäcke Riks", wmsUrl, {
			format: 'image/png',
			layers: 'valtmall:0',
			srs: 'EPSG:3006',
			version: '1.1.1'
		}, { projection: new OpenLayers.Projection("EPSG:3006") });
	},
	valtor = () => {
		if (!valtorLayer || !valtorLayer.id) {
			valtorLayer = new OpenLayers.Layer.Vector("Vältor", {
				strategies: [new OpenLayers.Strategy.Fixed(), new ExtendedSaveStrategy({ auto: true })],
				projection: new OpenLayers.Projection("EPSG:3006"),
				protocol: new OpenLayers.Protocol.WFS({
					url: wfsUrl,
					version: '1.1.0',
					featurePrefix: 'valtmall',
					featureType: 'containrar',
					featureNS: 'http://business.sydved.se',
					srsName: 'EPSG:3006',
					geometryName: 'geom'
				}),
				styleMap: LayerStyles.valtor()
			});
		}

		return valtorLayer;
	}

	return {
		'containrar': containrar,
		'lmTopo': lmTopo,
		'marktacke': marktacke,
		'valtor': valtor
	}
});