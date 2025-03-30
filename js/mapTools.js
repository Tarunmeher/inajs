function zoomInMap(){
	map.getView().setZoom(map.getView().getZoom() + 1);
}
function zoomOutMap(){
	map.getView().setZoom(map.getView().getZoom() - 1);
}
function gotoMapExtent(){
	map.getView().setCenter(new ol.proj.fromLonLat(mapInfo.center));
	map.getView().setZoom(mapInfo.zoom);
}
function enableMeasurement(){
	addInteraction();
}
function openLayerTOC(){
	document.getElementById('dragpopuptoc').style.display='block';
	if(!$("#layer-list").html()){
		generateTOC();
	} 
}
function enableidentify(){ 
	IdentifyActive=true;
	document.getElementById("map").style.cursor = "help";
}
function bufferAnalysis(){
	document.getElementById('dragpopupBuffer').style.display='block';
	getLayerListForBuffer();
}
function searchByAttribute(){
	document.getElementById('dragpopupSearchAttr').style.display='block';
	getLayerListForSearchAttr();
}

var widgetWidth=null;
var widgetHeight=null;
function expandCollapse(evt){
	var element = document.getElementById(appConfig.mapToolContainerId);
	if(!widgetWidth){
		widgetWidth = $(`#${appConfig.mapToolContainerId}`).css('width');
	}
	if(!widgetHeight){
		widgetHeight = $(`#${appConfig.mapToolContainerId}`).css('height');
	}
	if ($("#expandCloseBtn").attr('toolSts') === 'open') {
		$(`#${appConfig.mapToolContainerId}`).animate({width:"0px",height:widgetHeight}) // Slide out to the left
		$("#expandCloseBtn").attr('toolSts','close');
		
	} else {
		$("#expandCloseBtn").attr('toolSts','open');
		$(`#${appConfig.mapToolContainerId}`).animate({width:widgetWidth,height:widgetHeight}) // Slide out to the left
	}
	$("#expandCloseBtn").toggleClass('bi-x-lg bi-plus-lg')
}

function menuToggle(){
	$("#menu-list").slideToggle();
}
