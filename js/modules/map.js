// map.js

// Eftersom 'olMap'-modulen är ett beroende nedan, kommer den att laddas när
// denna modul, 'map', efterfrågas
define(['olMap', 'layers', 'edit'], (olMap, Layers, Edit) => {
	const init = () => {
		console.log('[MAP] Skapar ny instans av karta..');
	},
	
	addDrawTool = () => {
		olMap.get().addControl(Edit.initDrawToolFor(Layers.valtor()));
	},
	
	addLayers = () => {
		olMap.get().addLayer(Layers.lmTopo());
		olMap.get().addLayer(Layers.valtor());
	},
	
	addLayerSwitcher = () => {
		olMap.get().addControl(new OpenLayers.Control.LayerSwitcher());
	},
	
	addScalebar = () => {
		// AMD-mönstret: Eftersom detta beroende enbart är nödvändigt om vi faktiskt vill ha in en skalstock,
		// anges det här iställer för uppe i define()-sektionen. På så vis laddas filen enbart in om den nyttjas.
		require(['scalebar.openlayers'], (Scalebar) => {
			sb = new Scalebar();
			sb.divisions = 2;
			sb.subdivisions = 4;
			sb.abbreviatelabel = true;
			olMap.get().addControl(sb);
		});
	},
	
	startUp = () => olMap.setStartingPos(),
	
	toggle = (tool) => {	
		const control = olMap.get().getControlsBy('type', tool)[0];
		
		if (control) {
			control.activate();
		}
		
		if (tool !== 'point') {
			olMap.get().getControlsBy('type', 'point')[0].deactivate();
		}
	}

	return {
		'create': init,
		'addDrawTool': addDrawTool,
		'addLayers': addLayers,
		'addLayerSwitcher': addLayerSwitcher,
		'addScalebar': addScalebar,
		'getMap': olMap.get,
		'startUp': startUp,
		'toogleControl': toggle
	}
});