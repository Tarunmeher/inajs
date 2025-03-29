
var typeSelect = document.getElementById('bufferGeom');
var draw; // global so we can remove it later

var bufferDrawSource = new ol.source.Vector({wrapX: false});
var bufferDrawVector = new ol.layer.Vector({
	source: bufferDrawSource
});
map.addLayer(bufferDrawVector);


function addInteraction() {
	var value = typeSelect.value;
	if (value !== '') {
		draw = new ol.interaction.Draw({
			source: bufferDrawSource,
			type: typeSelect.value
		});
		map.addInteraction(draw);
	}
}
/**
	* Handle change event.
	*/
typeSelect.onchange = function() {
	map.removeInteraction(draw);
	addInteraction();
};


function getLayerListForBuffer(){
	const layers = map.getLayers().getArray();
	$("#bufferLayer").html('<option value="">Select layer</option>');
	layers.forEach(layer => {
		if (layer.getSource().i) { 
			$("#bufferLayer").append('<option value="'+layer.getSource().i.LAYERS.split(":")[1]+'">'+layer.getSource().i.LAYERS.split(":")[1].replaceAll("_"," ")+'</option>')
		}
	});
}

function createBuffer(){
	var parser = new jsts.io.OL3Parser();
	var jstsGeom = parser.read(bufferDrawSource.getFeatures()[0].getGeometry());
	var buffered = jstsGeom.buffer(parseInt($("#geomRadius").val()));
	bufferDrawSource.getFeatures()[0].setGeometry(parser.write(buffered));
    var extent = bufferDrawSource.getFeatures()[0].getGeometry().getExtent();
    map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
}


