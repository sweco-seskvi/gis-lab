// setup.js

define(['domready', 'proj4', 'map'], (domReady, proj4, MAP) => {
  // Omsluten js-funktion som automatiskt exekveras med efterföljande "();" nedan
	(() => {		
		removeLoader = () => {
			let element = document.getElementById('loader');
			element.parentNode.removeChild(element);
		},
		
		renderDrawControls = () => {
			const mapEl = document.getElementById('olMap');
			
			const drawControls = document.createElement('div');
			drawControls.style.cssText = 'position: absolute; right: 0; bottom: 0; padding: 3px; background: white; z-index: 999';
			
			const inputNav = document.createElement('input');
			inputNav.setAttribute('type', 'radio');
			inputNav.setAttribute('name', 'mapControl');
			inputNav.setAttribute('id', 'nav');
			inputNav.setAttribute('checked', 'checked');
			inputNav.onclick = toggleMapControl;

			const inputDraw = document.createElement('input');
			inputDraw.setAttribute('type', 'radio');
			inputDraw.setAttribute('name', 'mapControl');
			inputDraw.setAttribute('id', 'point');
			inputDraw.onclick = toggleMapControl;
			
			const labelNav = document.createElement('label');
			labelNav.setAttribute('for', 'nav');
			labelNav.innerHTML = 'Navigera';
			
			const labelDraw = document.createElement('label');
			labelDraw.setAttribute('for', 'point');
			labelDraw.innerHTML = 'Rita';
			
			drawControls.appendChild(inputNav);
			drawControls.appendChild(labelNav);
			drawControls.appendChild(inputDraw);
			drawControls.appendChild(labelDraw);
			
			mapEl.parentNode.appendChild(drawControls);
		},
		
		toggleMapControl = (event) => {
			MAP.toogleControl(event.target.id);
		}
		
		domReady(() => {
			// Se till att Proj4js är globalt tillgängligt via window-instansen
			window.Proj4js = {
				Proj: function(code) {
				  return proj4(Proj4js.defs[code]);
				},
				defs: proj4.defs,
				transform: proj4
			 };

			Proj4js.defs['EPSG:3006'] = "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
		  
			console.log('[SETUP] Definitioner för div. projektioner initierade..');
		  
			MAP.create();
			MAP.addLayers();
			MAP.addDrawTool();
			MAP.addLayerSwitcher();
			MAP.addScalebar();
			
			this.renderDrawControls();
			
			MAP.startUp();
			
			this.removeLoader();
		});
	})();
});