function openNav() {
	document.getElementById("mySidenav").style.width = "335px";
	document.getElementById("mySidenav").style.borderRight = "ridge";
	/* document.getElementById("mySidebar").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px"; */
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("mySidenav").style.borderRight = "none";
	/* document.getElementById("mySidebar").style.width = "0";
	document.getElementById("main").style.marginLeft= "0"; */
}

function go2obj(bbox,lyr){
	go2bbox(map,bbox);
	if(!map.hasLayer(lyr)){
		lyr.addTo(map);
	}
}

function removelayer(map,maplayer){
	//bounds_group.removeLayer(maplayer);
	map.removeLayer(maplayer);
	//map.setView([10.4666,105.9158], 12);
}

function getCentroid2(arr) {
    var twoTimesSignedArea = 0;
    var cxTimes6SignedArea = 0;
    var cyTimes6SignedArea = 0;

    var length = arr.length

    var x = function (i) { return arr[i % length][0] };
    var y = function (i) { return arr[i % length][1] };

    for ( var i = 0; i < arr.length; i++) {
        var twoSA = x(i)*y(i+1) - x(i+1)*y(i);
        twoTimesSignedArea += twoSA;
        cxTimes6SignedArea += (x(i) + x(i+1)) * twoSA;
        cyTimes6SignedArea += (y(i) + y(i+1)) * twoSA;
    }
    var sixSignedArea = 3 * twoTimesSignedArea;
    return [ cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea];        
}

function json_bindPopup(id,geojsonLayer){
	if(id==18){
		var pnoidung='<img src="upload/tongquan/Tỉnh Nghệ An.jpg">';
	}else{
		var pnoidung='Đang cập nhật...';
	}
	geojsonLayer.bindPopup(pnoidung,{
		maxWidth: "auto"
	});
	
	geojsonLayer.on('mouseover', function (e) {
		this.openPopup();
		this.setStyle({
			'fillColor': 'yellow'
		});
		console.log(e);
	});
	geojsonLayer.on('mouseout', function (e) {
		map.closePopup();            
		this.setStyle({
			'fillColor': 'blue'
		});            
		
	});
	/* geojsonLayer.on('click', function (e) {
		this.openPopup();
		this.setStyle({
			'fillColor': 'yellow'
		});
		console.log(e);
	}); */
}

$(".leaflet-popup-close-button").on('click', function(event){
    //event.stopPropagation();
	//event.stopImmediatePropagation();
	geojsonLayer.setStyle({
		'fillColor': 'blue'
	});
});


function reload_geojson_lyr(map,id,tbl,cols){
    //geojsonLayer.refresh("http://localhost/webgis_csdlman/bando/mapserv.php?table=vn_tinh&id=34&cols=id,ten_vi");
    var url='mapserv.php?table='+tbl+'&id='+id+'&cols='+cols;
    
    if(geojsonLayer==null){
        geojsonLayer = new L.GeoJSON.AJAX(url);
        geojsonLayer.addTo(map);
		json_bindPopup(id,geojsonLayer);
    }else{
        geojsonLayer.refresh(url);
		if(!map.hasLayer(geojsonLayer)){
			geojsonLayer.addTo(map);
		}
		json_bindPopup(id,geojsonLayer);
    }
}

function go2bbox(map,bbox){
    map.fitBounds(bbox);
}

function convert2bbox(str){
    //105.447936430136,18.8114537887775,105.453843209734,18.8178673162228
    console.log(str);
    
    /*
    nghean_bbox=[
        [18.556081, 103.870496],
        [19.995713, 105.806679]
    ];
    */
    
    /*
    var arr = JSON.parse("[" + str + "]");
    //[105.447936430136, 18.8114537887775, 105.453843209734, 18.8178673162228]
    console.log(arr);
    */
    
    var arr=str.split(",").map(Number);
    
    var topleft=[arr[1],arr[0]];
    var rightbottom=[arr[3],arr[2]];
    var bbox=[topleft,rightbottom];    
    console.log(bbox);
    return bbox;
}

function parsejson2(json){
	//obj = JSON.parse(json);
	//alert(json.features[0].properties.id);
    //alert(json.features.length);
    json=JSON.parse(json);
    console.log(json);
	var arr=new Array();
	if(json.features.length>0){
		arr['thuoctinh']=json.features[0].properties;
		arr['fid']=json.features[0].id;
		arr['id']=arr['thuoctinh'].id;		
		arr['lyrname']=arr['fid'].split('.')[0];
		arr.length=4;
    }
    //console.log(arr1['thuoctinh'].tenho);
	return arr;
}
function fid2info2(str){
	//Lấy tên layer và id của record
	var str2arr=str.split('.');
	var arr=new Array();
	arr['lyr']=str2arr[0];
	arr['id']=str2arr[1];	
	return arr;
}
