<?php
include "database.php";
$uid=$_POST["uid"];
$message=$_POST["gmsg"];
if($message!=""){
$sql="INSERT INTO gchats(UID,MESSAGE,LOG) VALUES ('$uid','$message',NOW())";
 $res=$db->query($sql);
if($res->num_rows>0)
			{
                echo "posted";
            }
        }     
?>