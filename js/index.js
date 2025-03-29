function loadBasicTools(){
	if(appConfig.mapTools.length){
		appConfig.mapTools.forEach(function(tool){
			if(tool.enable){
				const button = document.createElement('button');
				button.classList.add('toolBtn');
				button.innerHTML = tool.icon;
				button.style.width = '40px';
				button.style.height = '40px';
				button.style.cursor = 'pointer';				
				button.style.fontWeight = 'bold';
				button.style.fontSize='20px';
				button.setAttribute('title',tool.title);
				button.style.color = 'white';
				button.style.background = '#0368a8';
				if(tool.featureName=='expandCollapse'){
					button.style.color = 'black';
					button.style.background = 'white';
					button.style.width = '45px';
					button.style.height = '45px';
				}
				button.onclick = window[tool.functionName];
				document.getElementById(appConfig.mapToolContainerId).appendChild(button);
			} 
		});
		if(document.getElementById(appConfig.mapToolContainerId).innerHTML){
			document.getElementById(appConfig.mapToolContainerId).style.display = 'block';
		}else{
			document.getElementById(appConfig.mapToolContainerId).style.display = 'none';
		}
	}


	//Setup Popups

	const popupList = ["dragpopup","dragpopuptoc","dragpopupIdentify","dragpopupBuffer","dragpopupSearchAttr"];
	popupList.forEach(function(popupitem){
		let popup = document.getElementById(popupitem);
		let header = document.getElementById(popupitem+"Header");

		// Make the popup draggable
			header.onmousedown = function (event) {
				event.preventDefault();

				let shiftX = event.clientX - popup.getBoundingClientRect().left;
				let shiftY = event.clientY - popup.getBoundingClientRect().top;

				function onMouseMove(event) {
					popup.style.left = event.clientX - shiftX + "px";
					popup.style.top = event.clientY - shiftY + "px";
				}

				document.addEventListener("mousemove", onMouseMove);

				document.onmouseup = function () {
					document.removeEventListener("mousemove", onMouseMove);
					document.onmouseup = null;
				};
			};

			header.ondragstart = function () {
				return false;
			};
	});
}

function closePopup(id) {
	document.getElementById(id).style.display = "none";
	document.getElementById("map").style.cursor = "default";
	IdentifyActive = false;
	indentifyResult = null;
	closeMeasurement();
}

