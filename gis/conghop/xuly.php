<?php
	// khai báo php
	include('config.php');
	
	if(isset($_GET['name'])and isset($_GET['vitri'])){
		$name=$_GET['name'];
		$vitri=$_GET['vitri'];
		
	
		if ($name!='' and $vitri!=''){
			//khi co name va vitri
			$truyvan='SELECT * FROM "congtrinhconghop" WHERE 
			"name" = \''.$name.'\' AND "vitri" = \''.$vitri.'\' LIMIT 50';
		}else if($name=='' and $vitri!=''){
			//có tên trạm, không có tên đất nước
			$truyvan='SELECT * FROM "congtrinhconghop" WHERE 
			"vitri" = \''.$vitri.'\' LIMIT 50';
		}else if($name!='' and $vitri==''){
			//có tên đất nước, không có tên trạm
			$truyvan='SELECT * FROM "congtrinhconghop" WHERE 
			"name" = \''.$name.'\' LIMIT 50';
		}else{
			//không điền số liệu
			$truyvan='SELECT * FROM "congtrinhconghop" LIMIT 50';
		}

		
		$thucthi=pg_query($dbcon,$truyvan);
		//check có dữ liệu hay không
		if (pg_num_rows($thucthi)>0){
			echo'<table class="table table-hover">';
			echo'<thead>';
			echo '<tr>
					<th>Tên trạm</th>
					<th>Vị trí</th>
				</tr>';
			echo'</thead>';
			echo '<tbody>';
			//Lay du lieu ra
			while($kq=pg_fetch_assoc($thucthi)){
			
			echo'<tr 
			onclick = "zoom_hightlight('.$kq['id'].');">
				<td>'.$kq['name'].'</td>
				<td>'.$kq['vitri'].'</td>
				</tr>';
		}
			echo '</tbody>';
			echo'</table>';
		
		}else{
			echo '<br>Không tồn tại!';
		}
	
	}else{
		echo '<br>Không tồn tại!';
	}
?>