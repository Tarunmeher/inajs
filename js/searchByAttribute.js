function getLayerListForSearchAttr(){
	const layers = map.getLayers().getArray();
	$("#layerSelectSearchAttr").html('<option value="">Select layer</option>');
	layers.forEach(layer => {
		if (layer.getSource().i) { 
			$("#layerSelectSearchAttr").append('<option value="'+layer.getSource().i.LAYERS.split(":")[1]+'">'+layer.getSource().i.LAYERS.split(":")[1].replaceAll("_"," ")+'</option>')
		}
	});
}

async function getSearchAttrLayerField(){
    $("#fieldSelectSearchAttr").html('<option value="">Select layer</option>');
    let layerName = $("#layerSelectSearchAttr").val();
    if(!layerName){
        return;
    }
    let typeName = `${mapInfo.GeoServer_Workspace}:${layerName}`;
    const url = `${mapInfo.GeoServerUrl_WFS}?service=WFS&version=1.1.0&request=DescribeFeatureType&typeName=${typeName}`

    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const fields = [...xml.getElementsByTagName("xsd:element")].map(el => ({
            name: el.getAttribute("name"),
            type: el.getAttribute("type"),
        }));

        fields.forEach(function(item){
        $("#fieldSelectSearchAttr").append('<option value="'+item.name+"#"+item.type+'">'+item.name+'</option>')
    });
    } catch (error) {
        console.error("Error fetching layer fields:", error);
    }
}