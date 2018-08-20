<?php
	include "database.php";
session_start();
if(!isset($_SESSION["ID"]))
{
  header('Location:index.php');

	//  echo "<script>window.open('index.php','_self')</script>";
}
else{
    $id=$_SESSION["ID"];
    $sql="SELECT * FROM user WHERE ID=".$id;;
    $res=$db->query($sql);
			if($res->num_rows>0)
			{
                $row=$res->fetch_assoc(); 
                 $profilepic=$row["PROFILE"];
                $profilename=$row["USERNAME"];
                $profileemail=$row["EMAIL"];
                $profilebio=$row["BIO"];
                $id=$row["ID"];
                
            }
        }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php include "header.php"; ?>
</head>

<body>
    <?php include "top_nav.php"; ?>

    		<div class="fifty"></div>		
        <div class="row">
            <div class="col s1"></div>
            <div class="col s10  lite ">
            <h3 class="">Let 2 Love <span class="fa fa-heart" style="color:red;"></span> </h3>
                <div class="text-center">
                    <p class=" text-center ">Upload Profile Picture</p>
                </div>
                <div class="divider"></div>


                <form id="upload_form" enctype="multipart/form-data" method="post">
                
                    <div class="input-field col s12 center">
                        
                        <span class="deep-purple btn" id="label_span"><label for="file1" class="center"><span class="fa fa-cloud-upload"></span><span id="labe_span" style="text-transform:none;"> Select Picture</span> </label></span>
                        <br>
                        <input type="file" name="file1" id="file1" style="visibility:hidden !important;"><br>
                        <input type="button" value="Upload File" onclick="uploadFile()" class="btn"><br><br><br>
                        <center><div class="progress " style="width:70%; " >
                        <div class=" determinate " id="pgbar" style=""></div>
                        </div>
                     </center>
                         <progress id="progressBar" value="0" max="100" style="width: 70%; visibility:hidden;" ></progress><br>
                        <p id="status"></p>
                        <p id="loaded_n_total"></p>
                        </div>
                </form>

            </div>
            <div class="col s1"></div>
        </div>
        
    </div>
 <?php 
include "bott_nav.php";
?>



</body>
<script>
    $(document).ready(function() {
        $('.datepicker').datepicker();
    $('.materialboxed').materialbox();
                
    $("#file1").on("change",function(e){

var finame= e.target.value.split('\\').pop();

                $("#labe_span").html(finame);
    });
    
    });
</script>

</html>