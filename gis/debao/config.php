<?php
	define("PG_DB","webgis");
	define("PG_HOST","localhost");
	define("PG_USER","postgres");
	define("PG_PORT","5432");
	define("PG_PASS","thanhcong2071994");
	$dbcon=pg_connect("dbname=".PG_DB." user=".PG_USER." password=".PG_PASS." host=".PG_HOST." port=".PG_PORT);
?>