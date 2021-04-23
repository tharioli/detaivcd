geo_service = 'http://localhost:8080/geoserver/bandothuyvan/wms?';

	
	mbUrl = 'https://www.siwrp.org.vn/';
	var mbAttr='thuoc tinh';
	//var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
		
	var streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
/* 	var layer_EsriOcean_0 = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
            pane: 'pane_EsriOcean_0',
            opacity: 1.0,
            attribution: '',
            minZoom: 3,
            maxZoom: 35,
            minNativeZoom: 0,
            maxNativeZoom: 10
	});
	layer_EsriOcean_0;
	map.addLayer(layer_EsriOcean_0); */
	
	var tobo = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
		layers: 'TOPO-OSM-WMS'
	});
	
	var CLN = L.tileLayer.betterWms(geo_service, {
		layers: 'bandothuyvan:CLN',
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
		center: [10.9314731,106.5034475],
		zoom: 9.7,
		layers: [tobo,CLN]
	});
	
	var baseLayers = {
		"ban do Streets": tobo
	};
	// ban do chuyen de
	var overlays = {
		"công trình đập đất": CLN
	};
	hightlight.addTo(map);
	L.control.layers(baseLayers, overlays).addTo(map);