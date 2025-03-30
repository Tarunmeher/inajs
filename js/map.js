/**Initialization Of Map */
var scaleLineControl = new ol.control.ScaleLine();
var map = new ol.Map({
	layers: [
		new ol.layer.Tile({
			source: new ol.source.OSM()
		})
	],
	target: 'map',
	controls: ol.control.defaults({
		attributionOptions: {
			collapsible: false
		}
	}).extend([
		scaleLineControl
	  ]),
	view: new ol.View({
		center: new ol.proj.fromLonLat(mapInfo.center),
		zoom: mapInfo.zoom
	})
});

$("#closeScaleUnit").hide();
$("#changeScaleUnit").click(function(){
	$("#units").show();
	$("#changeScaleUnit").hide();
	$("#closeScaleUnit").show();
});
$("#closeScaleUnit").click(function(){
	$("#units").hide();
	$("#changeScaleUnit").show();
	$("#closeScaleUnit").hide();
});
var unitsSelect = document.getElementById('units');
function onChange() {
  scaleLineControl.setUnits(unitsSelect.value);
}
unitsSelect.addEventListener('change', onChange);



// loadLayers();
function loadLayers(){
	var layers = [];
	if(mapInfo.Layers.length>0){
		mapInfo.Layers.forEach(function(element, index){
			if(element.type=='GroupLayer'){
				fetch('/geoserver42/rest/workspaces/'+mapInfo.GeoServer_Workspace+'/layergroups/'+element.layer+'.json')
				.then(response => response.json()) // Convert response to JSON
				.then(data => {
					for(let i=0;i<data.layerGroup.publishables.published.length;i++){
						let layer = new ol.layer.Tile({
							title:element.layer+'#'+data.layerGroup.publishables.published[i].name,
							source: new ol.source.TileWMS({
								url: '/geoserver42/wms',
								params: { 'LAYERS': data.layerGroup.publishables.published[i].name, 'TILED': true }
							})
						});
						map.addLayer(layer);
					} 
				}) // Handle data
				.catch(error => console.error('Error:', error)); // Handle errors 
			}
		});

	}
}

var groupList = {};
// Function to generate TOC
function generateTOC() {
	const layerList = document.getElementById('layer-list');
	const layers = map.getLayers().getArray();
	var layersLi = []
	layers.forEach((layer,index) => {
		let title = layer.get('title');
		if (title) { 
			let li = document.createElement("li");
			let checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.checked = layer.getVisible();
			li.setAttribute('groupname',title.split("#")[0]);
			checkbox.addEventListener("change", function() {
				layer.setVisible(this.checked);
			});

			li.appendChild(checkbox);
			li.appendChild(document.createTextNode(title.split("#")[1].split(":")[1]));
			layersLi.push(li);
			layerList.appendChild(li);
			if((layers.length-1)==index){				
				groupTheLayers()
			}
		}
	});
}

function groupTheLayers(){
	// Get all <li> elements
const items = document.querySelectorAll('#layer-list li');

// Group the items by their data-category attribute
const groupedItems = Array.from(items).reduce((acc, item) => {
  const category = item.getAttribute('groupname');
  
  // Initialize the category group if it doesn't exist
  if (!acc[category]) {
    acc[category] = [];
  }
  
  // Add the item to the appropriate category group
  acc[category].push(item);

  return acc;
}, {});

// Create a new <ul> element for each category group
const groupedLists = Object.keys(groupedItems).map(category => {
  const ul = document.createElement('ul');
  const btn = document.createElement('span');
  btn.textContent = '-';
  btn.style.fontSize='20px';
  btn.style.cursor = 'pointer';
  const categoryHeader = document.createElement('li');
  categoryHeader.textContent = `${category}`; 
  categoryHeader.appendChild(btn); 
  ul.appendChild(categoryHeader);
  
  // Append each item in the group to the new <ul>
  let layerContainer = document.createElement('div');
//   layerContainer.style.marginLeft='20px';
  layerContainer.style.padding='10px';
  groupedItems[category].forEach(item => {
    layerContainer.appendChild(item);
  });
  ul.appendChild(layerContainer);
  $(btn).click(function(){
	$(layerContainer).slideToggle();
	if($(this).text()=='+'){
		$(this).text('-');
	}else{
		$(this).text('+');
	}
  });
  return ul;
});

// Append the grouped lists to the DOM
const container = document.getElementById('layer-list');
groupedLists.forEach(group => {
  container.appendChild(group);
});
}



