<?php
session_start();

if(isset($_SESSION['sessionId']))
{
	$username = $_SESSION['sessionId'];
    unset($_SESSION['sessionId']);
	
	echo "<script>
    alert('" .$username . " logged out successfully');
	</script>";	
}
?>