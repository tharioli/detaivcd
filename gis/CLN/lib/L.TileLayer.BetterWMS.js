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
    
		var id=t1.features[0].properties.id;
		var ten=t1.features[0].properties.name;
		var macode=t1.features[0].properties.code;
		var kqt=t1.features[0].properties.kiequantra;
		var loaitram=t1.features[0].properties.loaitram;
		var muctieu=t1.features[0].properties.muctieu;
		var vitri=t1.features[0].properties.vitri;
		var mota=t1.features[0].properties.mota;
		
		
		var noidung='';
		noidung+='<h2>Thông tin trạm đo chất lượng nước</h2>';
		noidung+='<hr>';
		noidung+='<b>ID</b>: '+id+'<br>';
		noidung+='<b>Tên trạm</b>: '+ten+'<br>';
		noidung+='<b>Mã code</b>: '+macode+'<br>';
		noidung+='<b>Kiểu quan trắc</b>: '+kqt+'<br>';
		noidung+='<b>Loại trạm</b>: '+loaitram+'<br>';
		noidung+='<b>Mục tiêu</b>: '+muctieu+'<br>';
		noidung+='<b>Vị trí</b>: '+vitri+'<br>';
		noidung+='<b>Mô tả</b>: '+mota+'<br>';
    
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

