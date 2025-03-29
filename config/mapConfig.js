const mapInfo = {
	center:[72.862564, 19.065265],
	zoom:12,
	Layers:[
		{displayname : "Survey Data", layer : "Survey Data", type : "GroupLayer"},
		{displayname : "Grid Data", layer : "Grid Data", type : "GroupLayer"}
	],
	defaultVisibleLayers:[
		//{
		// displayname : "Grid Data",
		// layer : "grid"
		// }
	],
	GeoServer_Workspace : "gp_collection",
	GeoServerUrl : "/geoserver42/",
	GeoServerUrl_WMS : "/geoserver42/gp_collection/wms",
	GeoServerUrl_WFS : "/geoserver42/gp_collection/wfs",
	GeoServerUrl_OWS : "/geoserver42/gp_collection/ows?",
	serviceUrl:"/gp_usermanagement/webUser",
	serviceImages : "/PTP_Survey_Images",
	headers : {
		"Content-type" : "application/json"
	},
	attachfile : [ ".csv,application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain,application/pdf,image/jpg,image/png,image/jpeg,image/gif,image/bmp,image/tif" ],

}
