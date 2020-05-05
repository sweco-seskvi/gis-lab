// olMap.js

define(['openlayers'], (OpenLayers) => {
	const mapExtent = [-1200000, 4700000, 2600000, 8500000];
	const mapId = 'olMap';
	let map = {};
	
	OpenLayers.Projection.prototype.getCode = function () { return this.proj ? this.projCode : undefined };
	
	const createMapView = () => {
		let mapEl = document.createElement('div');
		mapEl.setAttribute('id', mapId);
		mapEl.setAttribute('style', 'width: 100%; height: 100%');
		document.body.appendChild(mapEl);
		
		map = new OpenLayers.Map(mapId, {
			units: 'm',
			maxExtent: mapExtent
		});
	},
	getMap = () => map,
	setStartingPos = () => map.setCenter([6673340.0, 1104304.0], 7);
	
	createMapView();

	return {
		'get': getMap,
		'setStartingPos': setStartingPos
	}
});