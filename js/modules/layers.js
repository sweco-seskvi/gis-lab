// layers.js

define(['openlayers', 'layerStyles', 'extended.save.strategy.openlayers'], (OpenLayers, LayerStyles, ExtendedSaveStrategy) => {
	let valtorLayer = {};
	
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
	valtor = () => {
		if (!valtorLayer || !valtorLayer.id) {
			const valtorUrl = 'http://localhost:8080/geoserver/valtmall/wfs';

			valtorLayer = new OpenLayers.Layer.Vector("Vältor", {
				strategies: [new OpenLayers.Strategy.Fixed(), new ExtendedSaveStrategy({ auto: true })],
				projection: new OpenLayers.Projection("EPSG:3006"),
				protocol: new OpenLayers.Protocol.WFS({
					url: valtorUrl,
					version: '1.1.0',
					featurePrefix: 'valtmall',
					featureType: 'valtor',
					featureNS: 'http://gis-lab/valtmall',
					srsName: 'EPSG:3006',
					geometryName: 'geom'
				}),
				styleMap: LayerStyles.point()
			});
		}

		return valtorLayer;
	}

	return {
		'lmTopo': lmTopo,
		'valtor': valtor
	}
});