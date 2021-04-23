<?php
	include('config.php');
	//kiem tra co vao id khong
	if(isset($_GET['stt'])){
		$stt=$_GET['stt'];
		if($stt!=''){
			$truyvan='SELECT*FROM "90muatl" WHERE stt ='.$stt;
			$thucthi=pg_query($dbcon,$truyvan);
			while($kq=pg_fetch_assoc($thucthi)){
				print json_encode($kq);
			}
		}
	}
?>