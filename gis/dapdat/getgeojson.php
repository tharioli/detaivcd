<?php
	include('config.php');
	//kiem tra co vao id khong
	if(isset($_GET['id'])){
		$id=$_GET['id'];
		if($id!=''){
			$truyvan='select ST_AsGeoJSON(geom) as json from "dapdat" where id='.$id;
			$thucthi=pg_query($dbcon,$truyvan);
			while($kq=pg_fetch_assoc($thucthi)){
				echo $kq['json'];
			}
		}
	}
?>
