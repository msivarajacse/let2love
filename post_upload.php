<?php
	include "database.php";
session_start();
if(!isset($_SESSION["ID"]))
{
  header('Location:index.php');

	//  echo "<script>window.open('index.php','_self')</script>";
}
else{
    $uid=$_SESSION["ID"];
    $cap=$_COOKIE["CAPTION"];
}


if(isset($_FILES["file1"])){
$fileName = $_FILES["file1"]["name"]; // The file name
$fileTmpLoc = $_FILES["file1"]["tmp_name"]; // File in the PHP tmp folder
$fileType = $_FILES["file1"]["type"]; // The type of file it is
$fileSize = $_FILES["file1"]["size"]; // File size in bytes
$fileErrorMsg = $_FILES["file1"]["error"]; // 0 for false... and 1 for true
if (!$fileTmpLoc) { // if file not chosen
    echo '<script>M.toast({html: toast_pro_empty});</script>';
    exit();
}
if(move_uploaded_file($fileTmpLoc, "img/post/$fileName")){
$fullfilename="'img/post/".$fileName."'";
// echo "caption is".$_COOKIE['CAPTION'];;
     $sql="INSERT INTO post(UID,POSTIMG,POSTCAP) VALUES ($uid,$fullfilename,'$cap');";
   
        if($res=$db->query($sql))
        {
          echo "success";
        }
        else{
            echo "failed";
        }
    
} else {
     echo 'Sorry Your file could not be loaded properly please upload small size..';

}
   
}
?>