<?php
include "database.php";

$pid=$_POST["pid"];
$uid=$_POST["uid"];
$sql = "SELECT LSTATUS FROM plikes WHERE PLID=$pid AND ULID=$uid";
     $result=$db->query($sql);
              if($result->num_rows>0)
              {         
                  while($rows=$result->fetch_assoc())
                {
                    $status=$rows["LSTATUS"];
                }
                // echo $status;
                                if($status==0){
                    $sql = "UPDATE plikes SET LSTATUS =1 WHERE PLID=$pid AND ULID=$uid";
                                $result=$db->query($sql);
                }else{
                    $sql = "UPDATE plikes SET LSTATUS =0 WHERE PLID=$pid AND ULID=$uid";
                                $result=$db->query($sql);
                }     
                       
              }
              else{
                
                   $sql="INSERT INTO plikes ( PLID, ULID, LSTATUS) VALUES ( '$pid', '$uid', '1')"; 
                   $result=$db->query($sql);
              }

        
   
?>
