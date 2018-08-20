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
  <div class="row ">
  <!-- <div class="col s1"></div> -->
  <div class="col s12 ">
  
  <br>
<div class="row">
    <div class="col s12">
      <ul class="tabs">
        <li class="tab col s4"><a href="#allcon" class="active">All Contacts</a></li>
        <li class="tab col s4"><a  href="#acticon">Active Contacts</a></li>
        <li class="tab col s4"><a href="#articon">shradha</a></li>
      </ul>
    </div>
  <!-- <button class="btn"></button> -->
    <div id="allcon" class="col s12"></div>
    <div id="acticon" class="col s12"></div>
    <div id="articon" class="col s12 row">
   
    <div class="col s12">
     <div class="container "><div id="chat-so-far" class="gap-above"></div>
          <form action="#" method="get" id="chat_form">
            <div class="form-group gap-above">
               <input type="text" class="form-control" id="chat_question" placeholder="Type a message" autocomplete="off" autofocus>
            </div>
        </form>
    </div>
 
    </div>
    </div>
   
  </div>

  </div>
  <!-- <div class="col s1"></div> -->
  </div>
  </div>
   <br><br><br>
<?php 
include "bott_nav.php";
?>
<script>
$("document").ready(function(){
      $("#allcon").load('allcon.php');
      $("#acticon").load('acticon.php');
      setInterval(function(){
      $("#allcon").load('allcon.php');
    }, 20000);
 setInterval(function(){
      $("#acticon").load('acticon.php');
    }, 20000);
      
  
});

    


</script>
</body>
</html>