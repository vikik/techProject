<?php
	// Create connection
	$conn = new mysqli('localhost', 'root', '', 'kickstarter');
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
		return $conn;
?>