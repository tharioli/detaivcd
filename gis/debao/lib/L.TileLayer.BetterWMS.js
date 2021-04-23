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
		var chieudai=t1.features[0].properties.l_m_1;
		var berong=t1.features[0].properties.bk_m_1;
		var caotrinhdaykenh=t1.features[0].properties.zd;
		var hesomai=t1.features[0].properties.hs_mai_1;
		var caotrinhbotrai=t1.features[0].properties.zbt_m_1;
		var caotrinhbophai=t1.features[0].properties.zbp_m_1;
		var berongbotrai=t1.features[0].properties.bbt_m_1;
		var berongbophai=t1.features[0].properties.bbp_m_1;
		var haluubaove=t1.features[0].properties.hlbv_m_1;
		var capct=t1.features[0].properties.capct;
		var kcct=t1.features[0].properties.kcct_1;
		var nhiemvu=t1.features[0].properties.muctieu;
		var vitri=t1.features[0].properties.vitri;
		var namsd=t1.features[0].properties.namsd;
		var htct=t1.features[0].properties.htct_1;
		var quanly=t1.features[0].properties.quanli;
		var muctieu=t1.features[0].properties.muctieu;
		
		
		var noidung='';
		noidung+='<h2>Thông tin đê bao</h2>';
		noidung+='<hr>';
		noidung+='<b>Tên đê bao</b>: '+ten+'<br>';
		noidung+='<b>Vị trí</b>: '+vitri+'<br>';
		noidung+='<b>Chiều dài (m)</b>: '+chieudai+'<br>';
		noidung+='<b>Bề rộng kênh (m) </b>: '+berong+'<br>';
		noidung+='<b>Cao trình đáy kênh</b>: '+caotrinhdaykenh+'<br>';
		noidung+='<b>Hệ số mái</b>: '+hesomai+'<br>';
		noidung+='<b>Cao trình bờ trái (m)</b>: '+caotrinhbotrai+'<br>';
		noidung+='<b>Cao trình bờ phải (m)</b>: '+caotrinhbophai+'<br>';
		noidung+='<b>Bề rộng bờ trái (m)</b>: '+berongbotrai+'<br>';
		noidung+='<b>Bề rộng bờ phai (m)</b>: '+berongbophai+'<br>';
		noidung+='<b>Hạ lưu bảo vệ (m)</b>: '+haluubaove+'<br>';
		noidung+='<b>Cấp công trình</b>: '+capct+'<br>';
		noidung+='<b>Kết cấu công trình</b>: '+kcct+'<br>';
		noidung+='<b>Nhiệm vụ công trình</b>: '+muctieu+'<br>';
		noidung+='<b>Hiện trạng công trình</b>: '+htct+'<br>';
		noidung+='<b>Cơ quan quản lý</b>: '+quanly+'<br>';
		noidung+='<b>Năm sử dụng</b>: '+namsd+'<br>';
    
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

