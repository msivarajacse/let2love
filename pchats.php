<?php
	include "database.php";
    session_start();
    $_SESSION["RECEIVER"]=$_GET["conv"];
  if(!isset($_SESSION["ID"]))
{
  header('Location:index.php');

	//  echo "<script>window.open('index.php','_self')</script>";
}
elseif (!isset($_GET["conv"])) {
	//  echo "<script>window.open('view_profile.php','_self')</script>";
  header('Location:view_profile.php');
    
}
else
{

  $sql='SELECT * FROM user WHERE ID='.$_SESSION["ID"];
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

$rid=$_GET["conv"];
$sid=$id;
?>



<!DOCTYPE html>
<html lang="en">

<head>
<?php include "header.php"; ?>
</head>

<body>
<?php include "top_nav.php"; ?>
<div class="fifty"></div>
<?php
$sql="UPDATE pchats SET MSGSTAT = 1 WHERE RID=$sid AND SID=$rid;";
$res=$db->query($sql);
?>
<?php
$sql="SELECT USERNAME FROM user WHERE ID=".$_SESSION["RECEIVER"];
  $res=$db->query($sql);
if($res->num_rows>0)
			{
                 $row=$res->fetch_assoc();
                 $receiver=$row["USERNAME"];
                 
      }

?>



<div class="container">
<div class="row">
<!-- <div class="col s1"></div> -->
<div class="col s12 " id="pchatcon">
<!-- chat container -->

</div>

<!-- <div class="col s1"></div> -->
</div>


<div class="row">
<!-- <div class="col s1"></div> -->
<div class="col s12 ">
<form >
                      <input type="hidden" value="<?php echo $sid; ?>" id="sid" name="sid">
                      <input type="hidden" value="<?php echo $rid; ?>" id="rid" name="rid">
                    <input autocomplete="off" type="text" name="pmsg" id="pmsg"  class="col s10" autofocus placeholder="Send a ❤ to <?php echo $receiver; ?> " autofocus>
                    <!-- <button class="btn" type="submit" name="submit">Send</button> -->
                    <span id="pchatsubmit"  class="sndbtn"> <span class="fa fa-heart"  id="sendbtn"></span></span>
 </form>

</div>

<!-- <div class="col s1"></div> -->
</div>
</div><br><br><br>
<!-- <script>
     $("html, body,#pchatcon").animate({ scrollTop: $(document).height() }, 1000);
     </script> -->
<!-- <p id="#status">--</p> -->
<?php include "bott_nav.php"; ?>

</body>
<script>
  $("document").ready(function(){
    //  alert("hi");
      $("#pchatcon").load('pchatload.php');
    
  setInterval(function(){
      $("#pchatcon").load('pchatload.php');
    }, 5000);

$("#pmsg").keyup(function(){
  var value=$("#pmsg").val();
  if(value==""){
    $("#pchatsubmit").removeClass("sndbtnmsg");
    $("#pchatsubmit").addClass("sndbtn");
    
  }
  else{
    $("#pchatsubmit").removeClass("sndbtn");
    $("#pchatsubmit").addClass("sndbtnmsg");
    
  }
});



$("#pchatsubmit").on("click",function(){
var s=$("#sid").val();
var r=$("#rid").val();
var mes=$("#pmsg").val();

$.post("pchatpost.php",{sid:s,rid:r,pmsg:mes},function(data){
$("#pmsg").val("");
});
});
$("#pchatform").on("submit",function(){
var s=$("#sid").val();
var r=$("#rid").val();
var mes=$("#pmsg").val();
$.post("pchatpost.php",{sid:s,rid:r,pmsg:mes},function(data){
$("#pmsg").val("");
});
});


 });
</script>



</html>