function getObj(divid){
	return document.getElementById(divid);
}

function timkiem() {
	var name=getObj('name').value;
	var vitri=getObj('vitri').value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      getObj("kq").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "xuly.php?name="+name+"&vitri="+vitri+"", true);
  xhttp.send();
}

function zoom_hightlight(id){

	//service trả về geojson
	url='getgeojson.php?id='+id;
	hightlight.refresh(url);
	
	//zoom vô trạm
	hightlight.on('data:loaded', function () {
		map.fitBounds(hightlight.getBounds());
	});
}