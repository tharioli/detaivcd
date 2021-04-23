L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);
  },
  
  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
  },
  
  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    url = this.getFeatureInfoUrl(evt.latlng),
        showResults = L.Util.bind(this.showGetFeatureInfo, this);
	url='proxy.php?url='+encodeURIComponent(url);
	
    $.ajax({
      url: url,
      success: function (data, status, xhr) {
        var err = typeof data === 'string' ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);  
      }
    });
  },
  
  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
        size = this._map.getSize(),
        
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: this.wmsParams.styles,
          transparent: this.wmsParams.transparent,
          version: this.wmsParams.version,      
          format: this.wmsParams.format,
          bbox: this._map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: this.wmsParams.layers,
          query_layers: this.wmsParams.layers,
          //info_format: 'text/html'
          info_format: 'application/json'
        };
    
    params[params.version === '1.3.0' ? 'i' : 'x'] = Math.ceil(point.x);
    params[params.version === '1.3.0' ? 'j' : 'y'] = Math.ceil(point.y)
    
    return this._url + L.Util.getParamString(params, this._url, true);
  },
  
  showGetFeatureInfo: function (err, latlng, content) {
    if (err) { console.log(err); return; } // do nothing if there's an error
    
    content=JSON.parse(content);
    console.log(content);
    t1=content;
	
    
		var ten=t1.features[0].properties.name;
		var lytrinh=t1.features[0].properties.lytrinh;
		var cumct=t1.features[0].properties.cumct;
		var goithau=t1.features[0].properties.goithau;
		var loaict=t1.features[0].properties.loaict;
		var chieudai=t1.features[0].properties.l;
		var berong=t1.features[0].properties.b;
		var chieucao=t1.features[0].properties.h;
		var socua=t1.features[0].properties.socua;
		var zday=t1.features[0].properties.zday;
		var zcua=t1.features[0].properties.zcua;
		var vanhanh=t1.features[0].properties.vanhanh;
		var nhiemvu=t1.features[0].properties.nhiemvu;
		var sphucvu=t1.features[0].properties.sphucvu;
		var vitri=t1.features[0].properties.vitri;
		var capct=t1.features[0].properties.capct;
		var hethongcong=t1.features[0].properties.hethongcon;
		var donviquanly=t1.features[0].properties.donviquanl;
		var hinhthuccong=t1.features[0].properties.hinhthucco;
		
		var noidung='';
		noidung+='<h2>Thông tin cống tròn</h2>';
		noidung+='<hr>';
		noidung+='<b>Tên cống</b>: '+ten+'<br>';
		noidung+='<b>Vị trí cống</b>: '+vitri+'<br>';
		noidung+='<b>Lý trình</b>: '+lytrinh+'<br>';
		noidung+='<b>Cụm công trình</b>: '+cumct+'<br>';
		noidung+='<b>Loại công trình</b>: '+loaict+'<br>';
		noidung+='<b>Chiều dài (m)</b>: '+chieudai+'<br>';
		noidung+='<b>Bề rộng B (m)</b>: '+berong+'<br>';
		noidung+='<b>Chiều cao H (m)</b>: '+chieucao+'<br>';
		noidung+='<b>Cao trình đáy Zđáy</b>: '+zday+'<br>';
		noidung+='<b>Cao trình cửa Zđáy</b>: '+zcua+'<br>';
		noidung+='<b>Số cửa</b>: '+socua+'<br>';
		noidung+='<b>Cấp công trình</b>: '+capct+'<br>';
		noidung+='<b>Hình thức cống</b>: '+hinhthuccong+'<br>';
		noidung+='<b>Vận hành cống</b>: '+vanhanh+'<br>';
		noidung+='<b>Nhiệm vụ</b>: '+nhiemvu+'<br>';
		noidung+='<b>Diện tích phục vụ</b>: '+sphucvu+'<br>';
		noidung+='<b>Hệ thống công trình</b>: '+hethongcong+'<br>';
		noidung+='<b>Gói thầu</b>: '+goithau+'<br>';
		noidung+='<b>Đơn vị quản lý</b>: '+donviquanly+'<br>';
    
	// kiem tra co hinh anh hay khong
	// if(img_path!=null){
		// noidung+='<img src="'+img_path+'" width="300px">';
	// }
    
    // Otherwise show the content in a popup, or something.
	hightlight.refresh(url)
	
    L.popup({ maxWidth: 800})
      .bindPopup(ten)
      .setLatLng(latlng)
      .setContent(noidung)
      .openOn(this._map);
	  
	
  }
});

L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options);  
};

