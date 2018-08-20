<?php
	include "database.php";
    session_start();
  if(!isset($_SESSION["ID"]))
{
	// echo "<script>window.open('index.php','_self')</script>";
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

<?php
if(isset($_GET["postid"])){
  $vpid=$_GET["postid"];
 
$sql = "SELECT ID,USERNAME,UID,PID,POSTIMG,POSTCAP FROM post,user WHERE post.UID=user.ID AND PID=$vpid";
$res=$db->query($sql);
if($res->num_rows>0)
{
$i=0;
 
 while($row=$res->fetch_assoc())
  {
    $pid=$row["PID"];
    $userid=$row["ID"];
    
    $puname=$row["USERNAME"];
    $pimg=$row["POSTIMG"];
    $pcaup=$row["POSTCAP"];
    if($pcaup!=NULL){
      $pcap=$pcaup;
    }
    else {
      $pcap='The Great Application for Meme and Chat Lovers. *New Innovation for Communication*';
    }
  }
}
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
<?php

 include "header.php"; 

?>

<meta property="og:title" content="let2love &hearts; <?php echo $puname; ?>" />
<meta property="og:url" content="http://let2love.ml/view_post.php?postid=<?php echo $vpid;?>" />
<meta property="og:description" content="<?php echo $pcap; ?>">
<meta property="og:image" content="https://cdn.iconscout.com/public/images/icon/premium/png-256/two-hearts-couple-love-heart-valentine-valentines-romantic-date-wedding-relationship-marriage-3c7539ea6ca807d3-256x256.png">
<meta property="og:type" content="website" />
<link rel="shortcut icon" href="http://let2love.ml/<?php echo $pimg; ?>">
</head>

<body>
<?php 
if(isset($_SESSION["ID"])){
include "top_nav.php"; 
}?>
<div class="fifty"></div>
 <?php 
$sql = "SELECT ID,USERNAME,UID,PID,POSTIMG,POSTCAP FROM post,user WHERE post.UID=user.ID AND PID=$vpid";
$res=$db->query($sql);
if($res->num_rows>0)
{
$i=0;
 
 while($row=$res->fetch_assoc())
  {
    $pid=$row["PID"];
    $userid=$row["ID"];
    
    $puname=$row["USERNAME"];
    $pimg=$row["POSTIMG"];
    $pcap=$row["POSTCAP"];
           
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
    if($pimg!=NULL){
    $cardimg="<div class='card-image'>
          <img src='$pimg' >
          <span class='card-title'><b class='pcapimg'></b></span>
        </div>";
    }else {
      $cardimg="<br><b class='pcap'></b>";
    }
if($pcap!=NULL)
{
 $cardcap= "<div class='card-content'>
          <p>$pcap</p>
        </div>";
}
else{
  $cardcap="";
}
if(isset($_SESSION["ID"])){
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

$cardlikee="<a  class='like left'  data-toggle='like' data-uid='#uid$uid' data-pid='#pid$pid' ><i class='material-icons likee' style='color:$color'>toys </i>$lcount </a> <span id='view'><i class='fa fa-eye'></i></span>";
}
else{
$cardlikee="";
  
}
$cardlike="  <div class='card-action '>
          $cardlikee
          <a  class='center btn green' href='whatsapp://send?text=The Amazing app for meme lovers! http://let2love.ml/view_post.php?postid=$pid Get a Application from the link below https://goo.gl/w5WYy5  Thank You.' data-action='share/whatsapp/share'>Share via Whatsapp <span class='fa fa-whatsapp'></span></a>
         <br>
    </div>";
 $i++;
        echo "<a href='view_post.php?postid=$pid'>  
        <div class='row'>
        <a href='view_profile.php?view=$userid'>  <h3>$puname</h3> </a>
            <div class='col s12 '>
               <div class='card'>
                  $cardimg
                  $cardcap
                $cardlike
                  <div class='card-action' id='likeview'>";
                  $sql = "SELECT USERNAME,ULID,PLID,LSTATUS FROM plikes,user WHERE PLID=$pid  AND LSTATUS=1 AND user.ID=plikes.ULID";
                  $res=$db->query($sql);
                    if($res->num_rows>0)
                    {
                    $i=1;
                    echo "<ul class='collection with-header center text-uppercase'>
                    <li class='collection-header '><h4>Likes</h4></li>";
                    
                while($row=$res->fetch_assoc())
                      {
                        $liname=$row["USERNAME"];
                        $uli=$row["ULID"];
                        if($uli==$uid){
                          $collection="collection-item active";

                        }
                        else{
                          $collection="collection-item";
                        }

                      echo "<li class='$collection'><b>  $liname </b></li>";
                      $i++;
                    }
                    echo'</ul>';
                    }
                  echo"</div>
                  <div class='card-action  commentload' id='post$pid'>";
   $sql = 'SELECT USERNAME,PROFILE,POID,PUID,COMM FROM user,pcomments WHERE pcomments.PUID=user.ID AND pcomments.POID='.$pid;;
              // echo $sql;
              $result=$db->query($sql);
              if($result->num_rows>0)
              {
              $pi=0;
              echo "<ul class='collection with-header'>
              <li class='collection-header '><h4>Comments</h4></li>";
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
        <ul>";
        if(isset($_SESSION["ID"])){

        echo "
        <input type='hidden' class='uid' id='uid$uid' value='$uid'>
        <input type='hidden' class='pid' id='pid$pid' value='$pid'>
        <tr>  <input type='text' class='col s10' id='comm$pid' placeholder='Type your comment' /></tr>
        <span class='col s2 cmtsub' id='cmtsub'  data-toggle='submit' data-uid='#uid$uid' data-pid='#pid$pid' data-comment='#comm$pid'><i class='fa fa-comments'></i></span>
        </ul></form>
        </div>";
        }
                 
             echo" </div>
          </div>
      </div>
        </a>";

  }

}
?>

<?php if(isset($_SESSION["ID"])){ include "bott_nav.php"; }?>

</body>
<script>


$("document").ready(function(){
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
});

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
<script>
$("document").ready(function(){
$("#likeview").hide();
$("#view").click(function(){
  $("#likeview").toggle(1000);
});
});
</script>
</html>