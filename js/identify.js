var IdentifyActive = false;
var indentifyResult = null;
map.on('singleclick', function (event) {
	if(!IdentifyActive){
		return;
	}
	var viewResolution = map.getView().getResolution();
	var layers = map.getLayers().getArray();
	var allRequests = [];

	layers.forEach(layer => {
		if (layer instanceof ol.layer.Tile) {
			var wmsSource = layer.getSource();
			if(wmsSource.i){
				var url = wmsSource.getGetFeatureInfoUrl(
					event.coordinate, 
					viewResolution, 
					'EPSG:3857', 
					{'INFO_FORMAT': 'application/json'}
				);

				if (url) {
					allRequests.push(fetch(url).then(response => response.json()));
				}
			}
		}
	});

	Promise.all(allRequests)
		.then(responses => {
			let allFeatures = responses.flatMap(response => response.features || []);
			indentifyResult = allFeatures;
			if(indentifyResult && indentifyResult.length){
				$("#identifyLayers").html('');
				document.getElementById('dragpopupIdentify').style.display='block';
				indentifyResult.forEach(function(layer, index){
					$("#identifyLayers").append("<option value='"+layer.id+"'>"+layer.id.split(".")[0]+"</option>");                    
					if(index==0){
                        $("#identifyTable").html('');
                        var tbody = '';
						for (let key in layer.properties) {
                            tbody = tbody+'<tr><th style="border:1px solid gray;">'+key+'</th><td style="border:1px solid gray;">'+layer.properties[key]+'</td></tr>';
						}
                        $("#identifyTable").html(tbody);
					}
				});
			} 
		})
		.catch(error => console.error('Error fetching feature info:', error));
});


$("#identifyLayers").change(function(){
    var selectedLayer = $(this).val();
    if(indentifyResult && indentifyResult.length){
        indentifyResult.forEach(function(layer, index){
            if(layer.id==selectedLayer){
                $("#identifyTable").html('');
                var tbody = '';
                for (let key in layer.properties) {
                    tbody = tbody+'<tr><th style="border:1px solid gray;">'+key+'</th><td style="border:1px solid gray;">'+layer.properties[key]+'</td></tr>';
                }
                $("#identifyTable").html(tbody);
            }
        });
    }    
});
