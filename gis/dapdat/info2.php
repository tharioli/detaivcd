<?php
	include('config.php');
	//kiem tra co vao id khong
	if(isset($_GET['idc'])){
		$idc=$_GET['idc'];
		if($idc!=''){
			$truyvan= 'SELECT * FROM "90muatl" WHERE idc ='.$idc;
			$thucthi=pg_query($dbcon,$truyvan);
			echo '<h2><center>SỐ LIỆU TRẠM</h2>';
			echo'<style>';
				echo'table {
				  font-family: arial, sans-serif;
				  border-collapse: collapse;
				  width: 100%;
				}

				td, th {
				  border: 1px solid #dddddd;
				  text-align: left;
				  padding: 8px;
				}

				tr:nth-child(even) {
				  background-color: #dddddd;
				}';
			echo '</style>';
			echo'<div style="height: 600px;overflow-x:scroll;overflow-y:scroll">';
			echo'<table>';
			echo'<thead>';
			echo '<tr>
					<th>Tên trạm</th>
					<th>Đất nước</th>
					<th>Mưa TB tháng 1</th>
					<th>Mưa min tháng 1</th>
					<th>Mưa max tháng 1</th>
					<th>Mưa TB tháng 2</th>
					<th>Mưa min tháng 2</th>
					<th>Mưa max tháng 2</th>
					<th>Mưa TB tháng 3</th>
					<th>Mưa min tháng 3</th>
					<th>Mưa max tháng 3</th>
					<th>Mưa TB tháng 4</th>
					<th>Mưa min tháng 4</th>
					<th>Mưa max tháng 4</th>
					<th>Mưa TB tháng 5</th>
					<th>Mưa min tháng 5</th>
					<th>Mưa max tháng 5</th>
					<th>Mưa TB tháng 6</th>
					<th>Mưa min tháng 6</th>
					<th>Mưa max tháng 6</th>
					<th>Mưa TB tháng 7</th>
					<th>Mưa min tháng 7</th>
					<th>Mưa max tháng 7</th>
					<th>Mưa TB tháng 8</th>
					<th>Mưa min tháng 8</th>
					<th>Mưa max tháng 8</th>
					<th>Mưa TB tháng 9</th>
					<th>Mưa min tháng 9</th>
					<th>Mưa max tháng 9</th>
					<th>Mưa TB tháng 10</th>
					<th>Mưa min tháng 10</th>
					<th>Mưa max tháng 10</th>
					<th>Mưa TB tháng 11</th>
					<th>Mưa min tháng 11</th>
					<th>Mưa max tháng 11</th>
					<th>Mưa TB tháng 12</th>
					<th>Mưa min tháng 12</th>
					<th>Mưa max tháng 12</th>
				</tr>';
			echo'</thead>';
			echo '<tbody>';
			while($kq=pg_fetch_assoc($thucthi)){
				echo'<tr>
				<td>'.$kq['name'].'</td>
				<td>'.$kq['country'].'</td>
				<td>'.$kq['t1ave'].'</td>
				<td>'.$kq['t1min'].'</td>
				<td>'.$kq['t1max'].'</td>
				<td>'.$kq['t2ave'].'</td>
				<td>'.$kq['t2min'].'</td>
				<td>'.$kq['t2max'].'</td>
				<td>'.$kq['t3ave'].'</td>
				<td>'.$kq['t3min'].'</td>
				<td>'.$kq['t3max'].'</td>
				<td>'.$kq['t4ave'].'</td>
				<td>'.$kq['t4min'].'</td>
				<td>'.$kq['t4max'].'</td>
				<td>'.$kq['t5ave'].'</td>
				<td>'.$kq['t5min'].'</td>
				<td>'.$kq['t5max'].'</td>
				<td>'.$kq['t6ave'].'</td>
				<td>'.$kq['t6min'].'</td>
				<td>'.$kq['t6max'].'</td>
				<td>'.$kq['t7ave'].'</td>
				<td>'.$kq['t7min'].'</td>
				<td>'.$kq['t7max'].'</td>
				<td>'.$kq['t8ave'].'</td>
				<td>'.$kq['t8min'].'</td>
				<td>'.$kq['t8max'].'</td>
				<td>'.$kq['t9ave'].'</td>
				<td>'.$kq['t9min'].'</td>
				<td>'.$kq['t9max'].'</td>
				<td>'.$kq['t10ave'].'</td>
				<td>'.$kq['t10min'].'</td>
				<td>'.$kq['t10max'].'</td>
				<td>'.$kq['t11ave'].'</td>
				<td>'.$kq['t11min'].'</td>
				<td>'.$kq['t11max'].'</td>
				<td>'.$kq['t12ave'].'</td>
				<td>'.$kq['t12min'].'</td>
				<td>'.$kq['t12max'].'</td>
				</tr>';
			}
			echo'</table>';
			echo'</div>';
		}
	}
?>
