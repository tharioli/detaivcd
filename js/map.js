	geo_service = 'http://123.30.236.192:8080/geoserver/detaivcdnew/wms?';

	
	mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
	var mbAttr='thuoc tinh';
		
	var streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

	
	var tobo = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
		layers: 'TOPO-OSM-WMS',
		opacity: 0.6
	});
	
	var trambom = L.tileLayer.betterWms(geo_service, {
		layers: 'detaivcdnew:trambom_4326',
		format: 'image/png',
		transparent: true,
		tiled: true
	});
	
	var giaothong = L.tileLayer.betterWms(geo_service, {
		layers: 'detaivcdnew:giaothong',
		format: 'image/png',
		transparent: true,
		tiled: true
	});
	
	var debao = L.tileLayer.betterWms(geo_service, {
		layers: 'detaivcdnew:debao',
		format: 'image/png',
		transparent: true,
		tiled: true
	});
	
	var dapdat = L.tileLayer.betterWms(geo_service, {
		layers: 'detaivcdnew:dapdat',
		format: 'image/png',
		transparent: true,
		tiled: true
	});
	
	var conghop = L.tileLayer.betterWms(geo_service, {
		layers: 'detaivcdnew:congtrinhconghop',
		format: 'image/png',
		transparent: true,
		tiled: true
	});
	
	var cln = L.tileLayer.betterWms(geo_service, {
		layers: 'detaivcdnew:CLN',
		format: 'image/png',
		transparent: true,
		tiled: true
	});
	
	var congtron = L.tileLayer.betterWms(geo_service, {
		layers: 'detaivcdnew:congtrinhcongtron',
		format: 'image/png',
		transparent: true,
		tiled: true
	});
	
	var rghc = L.tileLayer.betterWms(geo_service, {
		layers: 'detaivcdnew:ranhgioihc',
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
		center: [10.8262817,106.6600042],
		zoom: 9.7,
		layers: [tobo,rghc,giaothong,debao,dapdat,congtron,cln,conghop,trambom]
	});
	
	var baseLayers = {
		"ban do Streets": tobo
	};
	// ban do chuyen de
	var overlays = {
		"Ranh giới hành chính": rghc,
		"Đường giao thông": giaothong,
		"Đê bao": debao,
		"Đập đất": dapdat,
		"Vị trí đo chất lượng nước": cln,
		"Vị trí trạm bơm": trambom,
		"Công trình cống hộp": conghop,
		"Công trình cống tròn": congtron
	};
	//hightlight.addTo(map);
	L.control.layers(baseLayers, overlays).addTo(map);