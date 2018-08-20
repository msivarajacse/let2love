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
<div class="container">
  <div class="row">
    <!-- <div class="col s1"></div> -->
    <div class="col s12  " id="gchatcon">
  
    </div>
    <!-- <div class="col s1"></div> -->
  </div>
              <div class="row" >
                <!-- <div class="col s1"></div> -->
                <div class="col s12 " >
                  <form name="gchats" class="" id="gchatform">
                      <input type="hidden" value="<?php echo $id; ?>" id="usid"name="uid">
                    <input autocomplete="off" type="text" name="gmsg" id="gmsg"  class="col s10"placeholder="Type the Message here..." autofocus>
                    <span id="gchatsubmit"  class=" col s2 btn"> <span class="fa fa-send "></span></span>
                  </form>
                </div>
                <!-- <div class="col s1"></div> -->
              </div>
</div>
<br>
<br>
<br>
<br>
<p id="#status">--</p>
<?php include "bott_nav.php"; ?>

</body>
<script>
  $("document").ready(function(){
      $("#gchatcon").load('gchat.php');
    
  setInterval(function(){
      $("#gchatcon").load('gchat.php');
    }, 3000);

$("#gchatsubmit").on("click",function(){
var id=$("#usid").val();
var mes=$("#gmsg").val();
$.post("gchatpost.php",{uid:id,gmsg:mes},function(data){
$("#status").html(data);
$("#gmsg").val("");
});
});
$("#gchatform").on("submit",function(){
var id=$("#usid").val();
var mes=$("#gmsg").val();
$.post("gchatpost.php",{uid:id,gmsg:mes},function(data){
$("#status").html(data);
$("#gmsg").val("");
});
});


  });
</script>
</html>