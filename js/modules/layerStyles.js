// layerStyles.js

define(['openlayers'], (OpenLayers) => {
	const containrarPoint = {
		"fillColor": "#0055ee",
		"fillOpacity": "0.4", 
		"hoverFillColor": "white",
		"hoverFillOpacity": "0.8",
		"strokeColor": "#0055ee",
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
	selectedContainrarPoint = {
		"fillColor": "#0af5f5",
		"fillOpacity": "0.4", 
		"hoverFillColor": "white",
		"hoverFillOpacity": "0.8",
		"strokeColor": "#0af5f5",
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
	valtorPoint = {
		"fillColor": "#ff7400",
		"fillOpacity": "0.4", 
		"hoverFillColor": "white",
		"hoverFillOpacity": "0.8",
		"strokeColor": "#0055ee",
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
	selectedValtorPoint = {
		"fillColor": "#00ff74",
		"fillOpacity": "0.4", 
		"hoverFillColor": "white",
		"hoverFillOpacity": "0.8",
		"strokeColor": "#0af5f5",
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
		containrar: () => new OpenLayers.StyleMap({
			"default": new OpenLayers.Style(containrarPoint),
			"select": new OpenLayers.Style(selectedContainrarPoint)
		}),
		valtor: () => new OpenLayers.StyleMap({
			"default": new OpenLayers.Style(valtorPoint),
			"select": new OpenLayers.Style(selectedValtorPoint)
		})
	}
});