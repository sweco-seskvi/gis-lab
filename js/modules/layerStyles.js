// layerStyles.js

define(['openlayers'], (OpenLayers) => {
	const defaultPoint = {
		"fillColor": "#ee9900",
		"fillOpacity": "0.4", 
		"hoverFillColor": "white",
		"hoverFillOpacity": "0.8",
		"strokeColor": "#ee9900",
		"strokeOpacity": "1",
		"strokeWidth": "1",
		"strokeLinecap": "round",
		"strokeDashstyle": "solid",
		"hoverStrokeColor": "red",
		"hoverStrokeOpacity": "1",
		"hoverStrokeWidth": "0.2",
		"pointRadius": "12",
		"hoverPointRadius": "1",
		"hoverPointUnit": "%",
		"pointerEvents": "visiblePainted",
		"cursor": "inherit",
		"fontColor": "#000000",
		"labelAlign": "cm",
		"labelOutlineColor": "white",
		"labelOutlineWidth": "3"
	},
	selectedPoint = {
		"fillColor": "#0a0af5",
		"fillOpacity": "0.4", 
		"hoverFillColor": "white",
		"hoverFillOpacity": "0.8",
		"strokeColor": "#0a0af5",
		"strokeOpacity": "1",
		"strokeWidth": "1",
		"strokeLinecap": "round",
		"strokeDashstyle": "solid",
		"hoverStrokeColor": "red",
		"hoverStrokeOpacity": "1",
		"hoverStrokeWidth": "0.2",
		"pointRadius": "12",
		"hoverPointRadius": "1",
		"hoverPointUnit": "%",
		"pointerEvents": "visiblePainted",
		"cursor": "inherit",
		"fontColor": "#000000",
		"labelAlign": "cm",
		"labelOutlineColor": "white",
		"labelOutlineWidth": "3"
	}
	
	return {
		point: () => new OpenLayers.StyleMap({
			"default": new OpenLayers.Style(defaultPoint),
			"select": new OpenLayers.Style(selectedPoint)
		})
	}
});