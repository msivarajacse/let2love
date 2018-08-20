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
                $profilepic=$row["PROFILE"];
                $profilename=$row["USERNAME"];
                $profileemail=$row["EMAIL"];
                $profilebio=$row["BIO"];
                $uid=$row["ID"];
      }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
<?php include "header.php"; ?>
<style>
body{
    background:black;
    color:white;
}
a{
  color:white;
}
</style>
</head>

<body>
<?php include "top_nav.php"; ?>
<div class="fifty"></div>
<div class='row'>
<div class='col s1'></div>
<div class='col s10 border'>
<br>
<div class="center">
<center>
<img class="materialboxed logoabt animated infinite pulse" src="img/additional/logo.png"  alt="LET2LOVE logo"> <br>
<h3 class="let2abt animated jello">Let 2 Love </h3>
</center>
</div>
<div class='divider'></div>
<div class='row'>
<div class="col s12">
<h6>Name: </h6>
<p class='animated  bounceIn '><a href="view_profile.php?view=1">Praveenram Balachandran</a></p>
</div>
</div>
<div class='divider'></div>
<div class='row'>
<div class="col s12">
<h6>Mail: </h6>
<p ><a href="mailto:praveenrambalu@gmail.com">praveenrambalu @gmail.com</a></p>
</div>
</div>
<div class='divider'></div>
<div class='row'>
<div class="col s12">
<h6>Phone: </h6>
<p ><a href="tel:+918220085613">+91 8220085613</a></p>
</div>
</div>
<div class='divider'></div>
<div class='row'>
<div class="col s12">
<h6>DOB: </h6>
<p >23 Nov 1997</p>
</div>
</div>
<div class='divider'></div>
<div class='row'>
<div class="col s12">
<h6>Dept: </h6>
<p >Computer Science and Engineering</p>
</div>
</div>
<div class='divider'></div>
<div class='row'>
<div class="col s12">
<h6>College: </h6>
<p >Mahendra Institute of Technology</p>
</div>
</div>
<div class='divider'></div>
<div class='row'>
<div class="col s12">
<h6>Social Media </h6>
<p >
<div class="col s2"><a href="https://facebook.com/praveenrambalu" class="btn btn-facebook"><span class="fa fa-facebook"></span></a></div>
<div class="col s2"><a href="tel:+91 8220085613" class="btn btn-whatsapp "><span class="fa fa-whatsapp"></span></a></div>
<div class="col s2"><a href="https://www.instagram.com/praveenrambalu/" class="btn btn-instagram "><span class="fa fa-instagram"></span></a></div>
<div class="col s2"><a href="https://www.linkedin.com/in/praveenram-balachandran-172402113/" class="btn  btn-linkedin "><span class="fa fa-linkedin"></span></a></div>
<div class="col s2"><a href="https://twitter.com/praveenrambalu" class="btn  btn-twitter "><span class="fa fa-twitter"></span></a></div>
<div class="col s2"><a href="https://plus.google.com/104300890132201177678" class="btn  btn-google-plus "><span class="fa fa-google-plus"></span></a></div>
</p>
</div>
</div>



</div>

<div class='col s1'></div>


</div>
<br>
<br>
<br>
<br>
<br>

<?php include "bott_nav.php"; ?>

</body>


</html>