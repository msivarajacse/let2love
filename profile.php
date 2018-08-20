<?php
	include "database.php";
    session_start();
  if(!isset($_SESSION["ID"]))
{
  header('Location:index.php');

	//  echo "<script>window.open('index.php','_self')</script>";
}
else{
  $sql='SELECT * FROM user WHERE ID='.$_SESSION["ID"];
  $res=$db->query($sql);
if($res->num_rows>0)
			{
                $row=$res->fetch_assoc();
                $id=$row["ID"];
                $profilepic=$row["PROFILE"];
                $profilename=$row["USERNAME"];
                $profileemail=$row["EMAIL"];
                $profilebio=$row["BIO"];
                $profilegender=$row["GENDER"];
                $profiledob=$row["DOB"];
                $profilestate=$row["STATE"];
                $profilecity=$row["CITY"];
                $profilescname=$row["SCNAME"];
                $profilelover=$row["FIRSTLOVER"];
                $profilephone=$row["PHONE"];
                $pass=$row["PASSWORD"];
                $depass=base64_decode($pass);
                $profilepass=base64_decode($depass);
                    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
 <?php include "header.php"; ?> 
 <style>
 
 </style> 
</head>

<body>
 <?php include "top_nav.php"; ?> 
   <div class="fifty"></div>
<div class="container">
  <div class="row ">
  <!-- <div class="col s1"></div> -->
  <div class="col s12 ">
  
  <br>


  <center >
  <img src="<?php echo $profilepic; ?>" height="30%;" width="30%;" class="pro-thumb materialboxed"><br>
<a href="change_pro_pic.php?id=<?php  echo $id;?>" class="" > <span class="fa fa-edit" id=""> </span> Change Photo</a>
</center>
<form action="<?php echo $_SERVER["PHP_SELF"]; ?>" method="post" autocomplete="off" id="">


<ul class="collection">
<li class="collection-item">
<b class="protitle">Name :</b><br>
<i id="pname"><?php echo $profilename; ?>   <span class="fa fa-edit" id="pnameedit"></span></i>
<i id="pnamecont"> <input type="text" name="pname" value="<?php echo $profilename; ?>" id=""></i>
</li>
<li class="collection-item">
<b class="protitle">Bio :</b><br>
<i id="pbio"><?php echo $profilebio; ?>   <span class="fa fa-edit" id="pbioedit"></span></i>
<i id="pbiocont"> <input type="text" name="pbio" value="<?php echo $profilebio; ?>" id=""></i>
</li>
<li class="collection-item">
<b class="protitle">First Lover :</b><br>
<i id="plr"><?php echo $profilelover; ?>  <span class="fa fa-heart" style="color:red;"></span>   <span class="fa fa-edit" id="plredit"></span></i>
<i id="plrcont"> <input type="text" name="plr" value="<?php echo $profilelover; ?>" id="" ></i>
</li>
<li class="collection-item">
<b class="protitle">Email :</b><br>
<i ><?php echo $profileemail; ?></i>
</li>
<li class="collection-item">
<b class="protitle">Phone No :</b><br>
<i id="pno"><?php echo $profilephone; ?>   <span class="fa fa-edit" id="pnoedit"></span></i>
<i id="pnocont"> <input type="text" name="pno" value="<?php echo $profilephone; ?>" id=""></i>
</li>
<li class="collection-item">
<b class="protitle">Password :</b><br>
<i id="ppass">*********   <span class="fa fa-edit" id="ppassedit"></span></i>
<i id="ppasscont"> <input type="text" name="ppass" value="<?php echo $profilepass; ?>" id=""></i>
</li>
<li class="collection-item">
<b class="protitle">Date of Birth :</b><br>
<i id="pdob"><?php echo $profiledob; ?>   <span class="fa fa-edit" id="pdobedit"></span></i>
<i id="pdobcont"> <input type="text" name="pdob" class="datepicker" value="<?php echo $profiledob; ?>" id=""></i>
</li>
<li class="collection-item">
<b class="protitle">School/College Name :</b><br>
<i id="psc"><?php echo $profilescname; ?>   <span class="fa fa-edit" id="pscedit"></span></i>
<i id="psccont"> <input type="text" name="psc"  value="<?php echo $profilescname; ?>" id=""></i>
</li>
<li class="collection-item">
<b class="protitle">City :</b><br>
<i id="pcity"><?php echo $profilecity; ?>   <span class="fa fa-edit" id="pcityedit"></span></i>
<i id="pcitycont"> <input type="text" name="pcity"  value="<?php echo $profilecity; ?>" id=""></i>
</li>
<li class="collection-item">
<b class="protitle">State :</b><br>
<i id="pstate"><?php echo $profilestate; ?>   <span class="fa fa-edit" id="pstateedit"></span></i>
<i id="pstatecont"> <input type="text" name="pstate"  value="<?php echo $profilestate; ?>" id=""></i>
</li>
<li class="collection-item center"> <input type="submit" class="btn" value="Save Details  &#128190;" name="submit"></li> 
</ul>
</form>
<?php
if (isset($_POST["submit"])) {
  $normalpass=$_POST["ppass"];
  $firstpass=base64_encode($normalpass);
             $finalpass=base64_encode($firstpass);

$sql = "UPDATE user SET USERNAME = '{$_POST["pname"]}', DOB = '{$_POST["pdob"]}', BIO = '{$_POST["pbio"]}', STATE = '{$_POST["pstate"]}', CITY = '{$_POST["pcity"]}', PHONE = '{$_POST["pno"]}', SCNAME = '{$_POST["psc"]}', FIRSTLOVER = '{$_POST["plr"]}',PASSWORD= '$finalpass' WHERE user.ID = ".$id;;
if($db->query($sql))
				{
                echo '<script>M.toast({html: toast_change_success});
                setTimeout(function(){
window.open("profile.php","_self");
  
}, 1000);
                </script>';

        }
        else{
                echo '<script>M.toast({html: toast_change_fail});</script>';

        }

}
?>
<br><br><br>


  </div>
  <!-- <div class="col s1"></div> -->
 
  </div>
  </div>
   
<?php 
include "bott_nav.php";
?>

<script>
$("document").ready(function(){
  $("#pnamecont").hide();
  $("#pbiocont").hide();
  $("#plrcont").hide();
  $("#pnocont").hide();
  $("#ppasscont").hide();
  $("#pdobcont").hide();
  $("#psccont").hide();
  $("#pcitycont").hide();
  $("#pstatecont").hide();

$("#pnameedit").click(function(){
   $("#pname").hide();
 $("#pnamecont").show();
  
});
$("#pbioedit").click(function(){
   $("#pbio").hide();
 $("#pbiocont").show();
  
});
$("#plredit").click(function(){
   $("#plr").hide();
 $("#plrcont").show();
  
});
$("#pnoedit").click(function(){
   $("#pno").hide();
 $("#pnocont").show();
  
});
$("#ppassedit").click(function(){
   $("#ppass").hide();
 $("#ppasscont").show();
  
});
$("#pdobedit").click(function(){
   $("#pdob").hide();
 $("#pdobcont").show();
});
$("#pscedit").click(function(){
   $("#psc").hide();
 $("#psccont").show();
});
$("#pcityedit").click(function(){
   $("#pcity").hide();
 $("#pcitycont").show();
});
$("#pstateedit").click(function(){
   $("#pstate").hide();
 $("#pstatecont").show();
});


$('.datepicker').datepicker();
});

</script>
</body>
</html>