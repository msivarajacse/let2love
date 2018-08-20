<?php
include "database.php";

$uid=$_POST["uid"];
$msg=$_POST["msg"];
if($msg!=""){
    
    $sql="INSERT INTO post(UID,POSTCAP) VALUES ($uid,'$msg');";
   
        if($res=$db->query($sql))
        {
          echo "success";
        }
        else{
            echo "failed";
        }

 } 
        
        
   
?>
