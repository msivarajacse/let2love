<?php
	include "database.php";
    session_start();
  if(!isset($_SESSION["ID"]))
{
  header('Location:index.php');

	//  echo "<script>window.open('index.php','_self')</script>";
}
elseif (!isset($_GET["view"])) {
  header('Location:contacts.php');
  
  //  echo "<script>window.open('contacts.php','_self')</script>";

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
                // $pass=$row["PASSWORD"];
                // $depass=base64_decode($pass);
                // $profilepass=base64_decode($depass);
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
  
  <?php
if(isset($_GET["view"])){
  $viewid=$_GET["view"];
$sql='SELECT * FROM user WHERE ID='.$viewid;;
$res=$db->query($sql);
if($res->num_rows>0)
			{
       $row=$res->fetch_assoc();
       $username=$row["USERNAME"];
       $userid=$row["ID"];
       $uid=$userid;
        $userpic=$row["PROFILE"];
       $usergender=$row["GENDER"];
       $usermail=$row["EMAIL"];
        $userstatus=$row["STATUS"];
        $userbio=$row["BIO"];
        $userstate=$row["STATE"];
        $usercity=$row["CITY"];
        $userscname=$row["SCNAME"];
        if($userstatus=="ONLINE"){
          $color="red";
        }
        else{
          $color="grey";
        }
        if($usergender=="MALE"){
$gendercon="fa-male";
$visible="<li class='collection-item'><i><i class='fa fa-envelope' aria-hidden='true'></i> $usermail </i></li>";
        }
        else{
$gendercon="fa-female";
$visible="";
        }
      }
}
?>
<br>
<center>
 <img src="<?php echo $userpic; ?>" height="50%;" width="50%;" class="pro-thumb materialboxed"><br>
</center>
<ul class="collection center">
<li class="collection-item"><b> <?php echo $username ?> </b> <span class="fa <?php echo $gendercon; ?>"></span> <span class="fa fa-heart" style="color:<?php echo $color;?>"></span> </li>
<?php 

echo $visible;
if($userbio!=NULL)
{
echo "<li class='collection-item'><i><i class='fa fa-info-circle' aria-hidden='true'></i> $userbio </i></li>";
}
if($userscname!=NULL)
{
echo "<li class='collection-item'><i><i class='fa fa-graduation-cap' aria-hidden='true'></i> $userscname </i></li>";
}
if($usercity!=NULL)
{
echo "<li class='collection-item'><i><i class='fa fa-map-marker ' aria-hidden='true'></i> $usercity </i></li>";
}
if($userstate!=NULL)
{
echo "<li class='collection-item'><i><i class='fa fa-map ' aria-hidden='true'></i> $userstate </i></li>";
}

?>

<li class="collection-item"><a href="pchats.php?conv=<?php echo $userid; ?>" class="btn ">Let ❤️</a></li>

</ul>


<br><br><br>
</div>
  <!-- <div class="col s1"></div> -->
  </div>
  </div>
   <div class="row well">
   <?php 
$sql = "SELECT USERNAME,UID,PID,POSTIMG,POSTCAP FROM post,user WHERE post.UID=user.ID AND post.UID=$uid ORDER BY PID DESC";
$res=$db->query($sql);
if($res->num_rows>0)
{
$i=0;
 
 while($row=$res->fetch_assoc())
  {
    
    $pid=$row["PID"];
    $puname=$row["USERNAME"];
    $pimg=$row["POSTIMG"];
    $pcap=$row["POSTCAP"];
    if($pimg!=NULL){
    $cardimg="<div class='card-image'>
          <img src='$pimg' >
          <span class='card-title'><b class='pcapimg'></b></span>
        </div>";
    }else {
      $cardimg="";
    }
if($pcap!=NULL)
{
 $cardcap= "<div class='card-content'>
          <p>$pcap</p>
        </div>";
}
else {
  $cardcap="";
}

        $i++;
        echo "<a href='view_post.php?postid=$pid'>  
        <div class='row'>
            <div class='col s12 '>
               <div class='card'>
                  $cardimg";
                  
                  $sql="SELECT PLID,LSTATUS FROM plikes WHERE PLID=$pid AND LSTATUS=1";
                   $result=$db->query($sql);
              if($result->num_rows>0)
              {
                 $pli=0;
              
              while($rows=$result->fetch_assoc())
                {
                  $pli++;
                }
                $lcount=$pli;
              }
              else{
                $lcount="0";
              }

              $sql="SELECT ULID,PLID,LSTATUS FROM plikes WHERE PLID=$pid AND plikes.ULID=$uid AND LSTATUS=1";
        // echo $sql;
            $result=$db->query($sql);
            if($result->num_rows>0)
              {
                $color="blue";

              }
              else {
                $color="black";
              }
              $sql = 'SELECT USERNAME,PROFILE,POID,PUID,COMM FROM user,pcomments WHERE pcomments.PUID=user.ID AND pcomments.POID='.$pid;;
              // echo $sql;
              $result=$db->query($sql);
              if($result->num_rows>0)
              {
                $ccount=0;
          while($rows=$result->fetch_assoc())
                {
                    $ccount++;
                }
                $ccountt=$ccount;
              }
              else{
            $ccountt=0;
              }

                  echo  $cardcap;
                   echo"<div class='card-action '>
                    <div class='row center '>
                  <a class='like left' data-toggle='like' data-uid='#uid$uid' data-pid='#pid$pid' ><i class='material-icons likee' style='color:$color'>toys</i>$lcount</a>
          <a class='comment center' data-toggle='class' data-target='#post$pid' data-classes='is-active'><i class='material-icons'>rate_review</i>$ccountt</a>
          <a  class='share right'  href='whatsapp://send?text=The Amazing app for meme lovers! http://let2love.ml/view_post.php?postid=$pid \n \n \n Get a Application from the link below https://goo.gl/w5WYy5  Thank You.' data-action='share/whatsapp/share' ><i class='material-icons'>share</i></a>
          
         <br>
         </div>
    </div>
                  <div class='card-action  commentload' id='post$pid'>";
   $sql = 'SELECT USERNAME,PROFILE,POID,PUID,COMM FROM user,pcomments WHERE pcomments.PUID=user.ID AND pcomments.POID='.$pid;;
              // echo $sql;
              $result=$db->query($sql);
              if($result->num_rows>0)
              {
              $pi=0;
              echo "<ul class='collection'>";
              while($rows=$result->fetch_assoc())
                {
                  $pi++;
                 $pcomuser=$rows['USERNAME'];
                 $pcomcomm=$rows['COMM'];
                 $pcomprof=$rows['PROFILE'];
                    echo "
                    <li class='collection-item avatar'>
                    <img src='$pcomprof' alt='' class='circle'>
                    <span class='title'><b>$pcomuser</b></span>
                    <p>$pcomcomm </p></li>";




                }
                echo "</ul>";
              }
         echo" <form class='row'>
        <ul>
        <input type='hidden' class='uid' id='uid$uid' value='$uid'>
        <input type='hidden' class='pid' id='pid$pid' value='$pid'>
        <tr>  <input type='text' class='col s10' id='comm$pid' placeholder='Type your comment' /></tr>
        <span class='col s2 cmtsub' id='cmtsub'  data-toggle='submit' data-uid='#uid$uid' data-pid='#pid$pid' data-comment='#comm$pid'><i class='fa fa-comments'></i></span>
        </ul></form>
        </div>";
              
                 
             echo" </div>
          </div>
      </div>
        </a>";

  }

}
?>
<br>
<br>
<br>
<br>

   
   </div>
<!-- <input type="text" value="" id="myInput">       -->
   
<?php 
include "bott_nav.php";
?>
</body>
<script>


$("document").ready(function(){
  $(".commentload").hide();
  // $("#myInput").hide();
// $(".comload").load("commentload.php");

});

$(document).on('click', '[data-toggle="submit"]', function () {
    var u = $($(this).data('uid')).val();
    var p = $($(this).data('pid')).val();
    var comm = $($(this).data('comment')).val();
    $.post("cmt.php",{pid:p,uid:u,comment:comm},function(data){
// $("#pmsg").val("");
// alert(data);
if(data=="posted"){
location.reload();
}
else{
  var toast_comm_failed="We guess you are not type anything please type something and try again";
  M.toast({html: toast_comm_failed});
}
});
    
});




$(document).on('click', '[data-toggle="class"]', function () {
    var $target = $($(this).data('target'));
    $target.toggle(100);
    return false;
});


</script>
<script>
function myFunction(a) {
 
  var toast_copied="Copied to Clipboard";
  $("#myInput").val("The Best Application for Meme Lovers http://let2love.ml/view_post?postid="+a);
  var copyText = document.getElementById("myInput");
  copyText.select();
  document.execCommand("Copy");
 
  M.toast({html:toast_copied});
}

</script>
<script>
$(document).on('click', '[data-toggle="like"]', function () {
    var u = $($(this).data('uid')).val();
    var p = $($(this).data('pid')).val();
$.post("like.php",{pid:p,uid:u},function(data){
location.reload();
});    
});
</script>
</html>