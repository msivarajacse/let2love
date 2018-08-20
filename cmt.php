<?php
include "database.php";

$pid=$_POST["pid"];
$uid=$_POST["uid"];
$comm=$_POST["comment"];
if($comm!=""){
    // $enmessage=base64_encode($message);
    $sql="INSERT INTO pcomments(POID,PUID,COMM) VALUES ($pid,$uid,'$comm')";

        if($db->query($sql))
        {
          echo "posted";
        }
        else{
            echo "failed";
        }

    } 
   
       
        
   
?>
