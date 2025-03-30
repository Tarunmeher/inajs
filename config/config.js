const appConfig = {
    mapToolContainerId:"widget-container",
    mapTools:[
        {
            featureName:"prev",
            title:"Previous",
            enable:true,
            functionName:'prev',
            icon:'<i class="bi bi-arrow-counterclockwise"></i>'
        },
        {
            featureName:"next",
            title:"Next",
            enable:true,
            functionName:'next',
            icon:'<i class="bi bi-arrow-clockwise"></i>'
        },
        {
            featureName:"zoomIn",
            title:"Zoom In",
            enable:true,
            functionName:'zoomInMap',
            icon:'<i class="bi bi-zoom-in"></i>'
        },
        {
            featureName:"zoomOut",
            title:"Zoom Out",
            enable:true,
            functionName:'zoomOutMap',
            icon:'<i class="bi bi-zoom-out"></i>'
        },
        {
            featureName:"gotoExtent",
            title:"Goto Extent",
            enable:true,
            functionName:'gotoMapExtent',
            icon:'<i class="bi bi-arrows-fullscreen"></i>'
        },
        {
            featureName:"pan",
            title:"Pan",
            enable:true,
            functionName:'Pan',
            icon:'<i class="bi bi-hand-index"></i>'
        },
        {
            featureName:"fullScreen",
            title:"Select",
            enable:true,
            functionName:'select',
            icon:'<i class="bi bi-cursor"></i>'
        },
        {
            featureName:"identify",
            title:"Identify",
            enable:true,
            functionName:'enableidentify',
            icon:'<i class="bi bi-info-circle"></i>'
        },
        {
            featureName:"measurement",
            title:"Measurement",
            enable:true,
            functionName:'enableMeasurement',
            icon:'<i class="bi bi-rulers"></i>'
        },
        {
            featureName:"TOC",
            title:"TOC",
            enable:true,
            functionName:'openLayerTOC',
            icon:'<i class="bi bi-stack"></i>'
        },
        {
            featureName:"buffer",
            title:"Buffer",
            enable:true,
            functionName:'bufferAnalysis',
            icon:'<i class="bi bi-geo-fill"></i>'
        },
        {
            featureName:"searchAttribute",
            title:"Search By Attributes",
            enable:true,
            functionName:'searchByAttribute',
            icon:'<i class="bi bi-search"></i>'
        }
    ]
}