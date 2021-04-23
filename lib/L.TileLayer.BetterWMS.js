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
    var url = this.getFeatureInfoUrl(evt.latlng),
        showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
		//url: url,
        url: 'proxy.php?url='+encodeURIComponent(url),
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
	var lyr=this.wmsParams.layers;
    /* if (err) { console.log(err); return; } // do nothing if there's an error
    
    content=JSON.parse(content);
    console.log(content);
    t1=content; */

    if(lyr=='detaivcdnew:CLN'){
		var res_obj = JSON.parse(content);
		t1 = res_obj;
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
		
		
  }
   if(lyr=='detaivcdnew:congtrinhconghop'){
		var res_obj = JSON.parse(content);
		t1 =  res_obj;
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
		
		var noidung='';
		noidung+='<h2>Thông tin cống hộp</h2>';
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
		noidung+='<b>Vận hành cống</b>: '+vanhanh+'<br>';
		noidung+='<b>Nhiệm vụ</b>: '+nhiemvu+'<br>';
		noidung+='<b>Diện tích phục vụ</b>: '+sphucvu+'<br>';
		noidung+='<b>Hệ thống công trình</b>: '+hethongcong+'<br>';
		noidung+='<b>Gói thầu</b>: '+goithau+'<br>';
		noidung+='<b>Đơn vị quản lý</b>: '+donviquanly+'<br>';
		noidung+='<a href="gis/conghop/index.html" target="_blank">Xem chi tiết</a><br>';
		
   }	
   if(lyr=='detaivcdnew:congtrinhcongtron'){
		var res_obj = JSON.parse(content);
		t1 = res_obj;
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
		noidung+='<b>Vận hành cống</b>: '+vanhanh+'<br>';
		noidung+='<b>Nhiệm vụ</b>: '+nhiemvu+'<br>';
		noidung+='<b>Diện tích phục vụ</b>: '+sphucvu+'<br>';
		noidung+='<b>Hệ thống công trình</b>: '+hethongcong+'<br>';
		noidung+='<b>Gói thầu</b>: '+goithau+'<br>';
		noidung+='<b>Đơn vị quản lý</b>: '+donviquanly+'<br>';
		
		
   }
	if(lyr=='detaivcdnew:dapdat'){
		var res_obj = JSON.parse(content);
		t1 = res_obj;
		var ten=t1.features[0].properties.name;
		var loai=t1.features[0].properties.loai;
		var chieudai=t1.features[0].properties.l;
		var berong=t1.features[0].properties.bd;
		var caotrinhdap=t1.features[0].properties.zd;
		var hesomai=t1.features[0].properties.hs;
		var nhiemvu=t1.features[0].properties.muctieu;
		var vitri=t1.features[0].properties.vitri;
		var hethongcongtrinh=t1.features[0].properties.hethongcon;
		var donviquanly=t1.features[0].properties.quanli;
		
		
		var noidung='';
		noidung+='<h2>Thông tin đập đất</h2>';
		noidung+='<hr>';
		noidung+='<b>Tên đập</b>: '+ten+'<br>';
		noidung+='<b>Loại đập</b>: '+loai+'<br>';
		noidung+='<b>Chiều dài (m)</b>: '+chieudai+'<br>';
		noidung+='<b>Bề rộng (m) </b>: '+berong+'<br>';
		noidung+='<b>Cao trình đập (m)</b>: '+caotrinhdap+'<br>';
		noidung+='<b>Hệ số mái</b>: '+hesomai+'<br>';
		noidung+='<b>Nhiệm vụ công trình</b>: '+nhiemvu+'<br>';
		noidung+='<b>Vị trí công trình</b>: '+vitri+'<br>';
		noidung+='<b>Hệ thống công trình</b>: '+hethongcongtrinh+'<br>';
		noidung+='<b>Đơn vị quản lý</b>: '+donviquanly+'<br>';
		
		
	}
	if(lyr=='detaivcdnew:trambom_4326'){
		var res_obj = JSON.parse(content);
		t1 = res_obj;
		var ten=t1.features[0].properties.name;
		var congsuat=t1.features[0].properties.congsuat;
		var muctieu=t1.features[0].properties.muctieu;
		var dtpv=t1.features[0].properties.dientichph;
		var vitri=t1.features[0].properties.vitri;
		var hethongct=t1.features[0].properties.hethongcon;
		var quanly=t1.features[0].properties.quanli;
		
		var noidung='';
		noidung+='<h2>Thông tin trạm bơm</h2>';
		noidung+='<hr>';
		noidung+='<b>Tên trạm</b>: '+ten+'<br>';
		noidung+='<b>Công suất</b>: '+congsuat+'<br>';
		noidung+='<b>Nhiệm vụ</b>: '+muctieu+'<br>';
		noidung+='<b>Diện tích phục vụ</b>: '+dtpv+'<br>';
		noidung+='<b>Vị trí</b>: '+vitri+'<br>';
		noidung+='<b>Hệ thống công trình</b>: '+hethongct+'<br>';
		noidung+='<b>Đơn vị quản lý</b>: '+quanly+'<br>';
		
	}
	if(lyr=='detaivcdnew:debao'){
		var res_obj = JSON.parse(content);
		t1 = res_obj;
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
		
		
		var noidung='';
		noidung+='<h2>Thông tin đê bao</h2>';
		noidung+='<hr>';
		noidung+='<b>Tên đê bao</b>: '+ten+'<br>';
		noidung+='<b>Chiều dài (m)</b>: '+chieudai+'<br>';
		noidung+='<b>Bề rộng kênh (m) </b>: '+berong+'<br>';
		noidung+='<b>Cao trình đáy kênh</b>: '+caotrinhdaykenh+'<br>';
		noidung+='<b>Hệ số mái</b>: '+hesomai+'<br>';
		noidung+='<b>Cao trình bờ trái (m)</b>: '+caotrinhbotrai+'<br>';
		noidung+='<b>Cao trình bờ phải (m)</b>: '+caotrinhbophai+'<br>';
		noidung+='<b>Bề rộng bờ trái (m)</b>: '+berongbotrai+'<br>';
		noidung+='<b>Bề rộng bờ phai (m)</b>: '+berongbophai+'<br>';
		noidung+='<b>Hạ lưu bảo vệ (m)</b>: '+haluubaove+'<br>';
		noidung+='<b>Vị trí</b>: '+vitri+'<br>';
		noidung+='<b>Cấp công trình</b>: '+capct+'<br>';
		noidung+='<b>Kết cấu công trình</b>: '+kcct+'<br>';
		noidung+='<b>Nhiệm vụ công trình</b>: '+muctieu+'<br>';
		noidung+='<b>Hiện trạng công trình</b>: '+htct+'<br>';
		noidung+='<b>Cơ quan quản lý</b>: '+quanly+'<br>';
		noidung+='<b>Năm sử dụng</b>: '+namsd+'<br>';
		
   }
   if(lyr=='detaivcdnew:giaothong'){
		var res_obj = JSON.parse(content);
		t1 = res_obj;
		var ten=t1.features[0].properties.name;
		
		
		var noidung='';
		noidung+='<h2>Thông tin đường giao thông</h2>';
		noidung+='<hr>';
		noidung+='<b>Tên đường</b>: '+ten+'<br>';
   }
   if(lyr=='detaivcdnew:ranhgioihc'){
		var res_obj = JSON.parse(content);
		t1 = res_obj;
		var phuongxa=t1.features[0].properties.commune;
		var quanhuyen=t1.features[0].properties.district;
		
		
		var noidung='';
		noidung+='<h2>Thông tin hành chính</h2>';
		noidung+='<hr>';
		noidung+='<b>Tên phường, xã</b>: '+phuongxa+'<br>';
		noidung+='<b>Thuộc quận, huyện</b>: '+quanhuyen+'<br>';
		
		
   }
	L.popup({ maxWidth: 800})
		.setLatLng(latlng)
		.setContent(noidung)
		.openOn(this._map)
		.autoClose = true;
  }
  
});

L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options);  
};
