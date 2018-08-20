<?php
	include "database.php";
session_start();
if(!isset($_SESSION["ID"]))
{
  header('Location:index.php');

	//  echo "<script>window.open('index.php','_self')</script>";
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
if(move_uploaded_file($fileTmpLoc, "img/pro/$fileName")){

$sql='SELECT * FROM user WHERE ID='.$_SESSION["ID"];
// echo $sql;
$res=$db->query($sql);
if($res->num_rows>0)
			{
                $row=$res->fetch_assoc(); 
            //    print_r ($row);
                $id=$row["ID"];
                $fullfilename="'img/pro/".$fileName."'";
               
                $sql="UPDATE user SET PROFILE = $fullfilename WHERE user.ID =".$id;;
// echo $sql;
               if($db->query($sql))
                {
                    $sql="INSERT INTO post(UID,POSTIMG,POSTCAP) VALUES ($id,$fullfilename,'CHANGED THE PROFILE PICTURE');";
                    if($db->query($sql))
                {
                    echo "<center><img src='img/pro/$fileName' class='pro-thumb' height='100px' width='100px' ></center>";
                } 
                }

                else{

                    echo 'Upload Failed... Please Try after some time..!';

                }

            }

    
} else {
     echo 'Sorry Your file could not be loaded properly please upload small size..';

}
}
?>