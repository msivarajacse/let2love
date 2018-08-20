<?php
include "database.php";
$pid=$_POST["poid"];

$sql="DELETE FROM post WHERE PID =$pid";

if( $res=$db->query($sql))
			{
                echo "success";
            }
           else {
               echo "failed";
           }
?>