<?php
include "database.php";

$sid=$_POST["sid"];
$rid=$_POST["rid"];
$message=$_POST["pmsg"];
if($message!=""){
    $enmessage=base64_encode($message);
    $sql="INSERT INTO pchats(SID,RID,MESSAGE) VALUES ($sid,$rid,'$enmessage')";
   
 if($res=$db->query($sql))
        {
          
        }
        else{
            echo "failed";
        }

        } 
        else{
            $rheart='<img src="img/additional/heart.gif" height="30px" width="30px">';
            $heart=base64_encode($rheart);
    $sql="INSERT INTO pchats(SID,RID,MESSAGE) VALUES ($sid,$rid,'$heart')";
    if($res=$db->query($sql)){

    }
    else{
        echo "Posting heart failed";
    }
      } 
        
   
?>
