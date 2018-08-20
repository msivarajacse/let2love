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
<style>.home-red{color:#dc1a1af0 !important;}</style>
</head>

<body>
<?php include "top_nav.php"; ?>
<div class="fifty"></div>
<?php 
$sql = "SELECT USERNAME,UID,PID,POSTIMG,POSTCAP FROM post,user WHERE post.UID=user.ID ORDER BY PID DESC";
$res=$db->query($sql);
if($res->num_rows>0)
{
$i=0;
 
 while($row=$res->fetch_assoc())
  {
    
    $pid=$row["PID"];
    $puid=$row["UID"];
    $puname=$row["USERNAME"];
    $pimg=$row["POSTIMG"];
    $pcap=$row["POSTCAP"];
     if($puid==$uid){
       $delbtn="<a href='deletepost.php?pid=$pid&uid=$puid'><span class='right delbtn fa fa-trash' style='margin-right:30px;'></span></a>";
     }
     else{
       $delbtn="";
     }
    if($pimg!=NULL){
     if($puid==$uid){
       $delbtn="<a href='deletepost.php?pid=$pid&uid=$puid'><span class='right delbtn fa fa-trash'></span></a>";
     }
     else{
       $delbtn="";
     }
     
    $cardimg="
     <div class='card-action'>
          <span class='card-title'><b class='pcapimg fstyle' >$puname  </b></span>
          $delbtn
          
        </div>
    <div class='card-image'>
    
          <img src='$pimg' >
          </div> ";
    }else {
      $cardimg="<br><b class='pcap fstyle' >$puname</b> $delbtn";
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
                  $sql="SELECT ULID,PLID,LSTATUS FROM plikes WHERE PLID=$pid AND LSTATUS=1";
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

                echo"  $cardcap
                <div class='card-action'>
<div class='row center '>
          <a class='like left' data-toggle='like' data-uid='#uid$uid' data-pid='#pid$pid' ><i class='material-icons likee' style='color:$color'>toys </i>$lcount </a>
          <a  class='comment center' data-toggle='class' data-target='#post$pid' data-classes='is-active'><i class='material-icons'>rate_review</i>$ccountt</a>
          <a  class='share right'  href='whatsapp://send?text=The Amazing app for meme lovers! http://let2love.ml/view_post.php?postid=$pid \n \n \n  \n \n \n  \n \n \n Get a Application from the link below https://goo.gl/w5WYy5  Thank You.' data-action='share/whatsapp/share' ><i class='material-icons'>share</i></a>
         
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
else{
  echo "<h3 class='center'> No Posts....!</h3>";
}
?>



<!-- <button onclick="myFunction(1)">Copy text</button>  <br> -->
<br>
<br><br>
<br>       
<!-- <input type="text" value="" id="myInput">       -->
<?php include "bott_nav.php"; ?>

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