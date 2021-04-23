geo_service = 'http://localhost:8080/geoserver/bandothuyvan/wms?';

	
	mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
	var mbAttr='thuoc tinh';
		
	var streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

	
	var tobo = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
		layers: 'TOPO-OSM-WMS'
	});
	
	var tramthuyvan = L.tileLayer.betterWms(geo_service, {
		layers: 'bandothuyvan:90muatl',
		format: 'image/png',
		transparent: true,
		tiled: true
	});
	
	var hightlight_style = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
	};
	
	hightlight = new L.GeoJSON.AJAX(null, {
		style: hightlight_style
	});
	
	var map = L.map('map', {
		center: [15.9125196,105.9203372],
		zoom: 6,
		layers: [tobo,tramthuyvan]
	});
	
	var baseLayers = {
		"ban do Streets": tobo
	};
	// ban do chuyen de
	var overlays = {
		"Bản đồ sử dụng đất": tramthuyvan
	};
	hightlight.addTo(map);
	L.control.layers(baseLayers, overlays).addTo(map);