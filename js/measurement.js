var measurementActive = false;
var overlays = [];

var measurementsource = new ol.source.Vector();

var measurementLayer = new ol.layer.Vector({
	source: measurementsource,
	style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 255, 0.2)'
		}),
		stroke: new ol.style.Stroke({
			color: '#ffcc33',
			width: 2
		}),
		image: new ol.style.Circle({
			radius: 7,
			fill: new ol.style.Fill({
				color: '#ffcc33'
			})
		})
	})
});

map.addLayer(measurementLayer);


/**
	* Currently drawn feature.
	* @type {ol.Feature}
	*/
var sketch;


/**
	* The help tooltip element.
	* @type {Element}
	*/
var helpTooltipElement;


/**
	* Overlay to show the help messages.
	* @type {ol.Overlay}
	*/
var helpTooltip;


/**
	* The measure tooltip element.
	* @type {Element}
	*/
var measureTooltipElement;


/**
	* Overlay to show the measurement.
	* @type {ol.Overlay}
	*/
var measureTooltip;


/**
	* Message to show when the user is drawing a polygon.
	* @type {string}
	*/
var continuePolygonMsg = 'Click to continue drawing the polygon';


/**
	* Message to show when the user is drawing a line.
	* @type {string}
	*/
var continueLineMsg = 'Click to continue drawing the line';


/**
	* Handle pointer move.
	* @param {ol.MapBrowserEvent} evt The event.
	*/
var pointerMoveHandler = function(evt) {
	if(!measurementActive){
		return;
	}
	if (evt.dragging) {
		return;
	}
	/** @type {string} */
	var helpMsg = 'Click to start drawing';

	if (sketch) {
		var geom = (sketch.getGeometry());
		if (geom instanceof ol.geom.Polygon) {
			helpMsg = continuePolygonMsg;
		} else if (geom instanceof ol.geom.LineString) {
			helpMsg = continueLineMsg;
		}
	}

	helpTooltipElement.innerHTML = helpMsg;
	helpTooltip.setPosition(evt.coordinate);

	helpTooltipElement.classList.remove('hidden');
};




map.on('pointermove', pointerMoveHandler);

map.getViewport().addEventListener('mouseout', function() {
    if(helpTooltipElement){
        helpTooltipElement.classList.add('hidden');
    }	
});


var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later


/**
	* Format length output.
	* @param {ol.geom.LineString} line The line.
	* @return {string} The formatted length.
	*/
var formatLength = function(line) {
	var length = ol.Sphere.getLength(line);
	var output;
	if (length > 100) {
		output = (Math.round(length / 1000 * 100) / 100) +
			' ' + 'km';
	} else {
		output = (Math.round(length * 100) / 100) +
			' ' + 'm';
	}
	return output;
};


/**
	* Format area output.
	* @param {ol.geom.Polygon} polygon The polygon.
	* @return {string} Formatted area.
	*/
var formatArea = function(polygon) {
	var area = ol.Sphere.getArea(polygon);
	var output;
	if (area > 10000) {
		output = (Math.round(area / 1000000 * 100) / 100) +
			' ' + 'km<sup>2</sup>';
	} else {
		output = (Math.round(area * 100) / 100) +
			' ' + 'm<sup>2</sup>';
	}
	return output;
};

function addInteraction() {
	measurementActive = true;	
	document.getElementById('dragpopup').style.display='block';

	var type = (typeSelect.value == 'area' ? 'Polygon' : 'LineString');
	draw = new ol.interaction.Draw({
		source: measurementsource,
		type: type,
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 0.5)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.7)'
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				})
			})
		})
	});
	map.addInteraction(draw);

	createMeasureTooltip();
	createHelpTooltip();

	var listener;
	draw.on('drawstart',
		function(evt) {
			// set sketch
			sketch = evt.feature;

			/** @type {ol.Coordinate|undefined} */
			var tooltipCoord = evt.coordinate;

			listener = sketch.getGeometry().on('change', function(evt) {
				var geom = evt.target;
				var output;
				if (geom instanceof ol.geom.Polygon) {
					output = formatArea(geom);
					tooltipCoord = geom.getInteriorPoint().getCoordinates();
				} else if (geom instanceof ol.geom.LineString) {
					output = formatLength(geom);
					tooltipCoord = geom.getLastCoordinate();
				}
				measureTooltipElement.innerHTML = output;
				measureTooltip.setPosition(tooltipCoord);
			});
		}, this);

	draw.on('drawend',
		function() {
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			// unset sketch
			sketch = null;
			// unset tooltip so that a new one can be created
			measureTooltipElement = null;
			createMeasureTooltip();
			ol.Observable.unByKey(listener);
		}, this);
}


/**
	* Creates a new help tooltip
	*/
function createHelpTooltip() {
	if (helpTooltipElement) {
		helpTooltipElement.parentNode.removeChild(helpTooltipElement);
	}
	helpTooltipElement = document.createElement('div');
	helpTooltipElement.className = 'tooltip hidden';
	helpTooltip = new ol.Overlay({
		element: helpTooltipElement,
		offset: [15, 0],
		positioning: 'center-left'
	});
	map.addOverlay(helpTooltip);
	overlays.push(helpTooltip);
}


/**
	* Creates a new measure tooltip
	*/
function createMeasureTooltip() {
	if (measureTooltipElement) {
		measureTooltipElement.parentNode.removeChild(measureTooltipElement);
	}
	measureTooltipElement = document.createElement('div');
	measureTooltipElement.className = 'tooltip tooltip-measure';
	measureTooltip = new ol.Overlay({
		element: measureTooltipElement,
		offset: [0, -15],
		positioning: 'bottom-center'
	});
	map.addOverlay(measureTooltip);
	overlays.push(measureTooltip);
}


/**
	* Let user change the geometry type.
	*/
typeSelect.onchange = function() {
	map.removeInteraction(draw);
	addInteraction();
};

function removeAllTooltips() {
    overlays.forEach(overlay => {
        map.removeOverlay(overlay);
    });
    overlays = []; // Clear the overlay list
}

function closeMeasurement(){
	measurementActive=false;
    measurementsource.clear();
	map.removeInteraction(draw);
    map.removeOverlay(measureTooltip);
	document.getElementById('dragpopup').style.display='none';
	removeAllTooltips();
}
