<?php
	include "database.php";
session_start();
if(!isset($_SESSION["ID"]))
{
  header('Location:index.php');

	//  echo "<script>window.open('index.php','_self')</script>";
}
else{
    $poid=$_GET["pid"];
    $puid=$_GET["uid"];
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
        if($puid!=$id){
            echo "<script>window.open('user_home.php','_self')</script>";
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
         <?php
$sql = "SELECT ID,USERNAME,UID,PID,POSTIMG,POSTCAP FROM post,user WHERE post.UID=user.ID AND PID=$poid";
$res=$db->query($sql);
if($res->num_rows>0)
{
while($row=$res->fetch_assoc())
  { 
$pid=$row["PID"];
    $userid=$row["ID"];
    
    $puname=$row["USERNAME"];
    $pimg=$row["POSTIMG"];
    $pcap=$row["POSTCAP"];

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

echo"
<!--<h4 class='text-red'>Do you Really Want to Delete this Post..?</h4>-->
<div class='row'>
       <h3>$puname</h3>
       <button id='delbtn' class='btn red'>Delete </button>
            <div class='col s12 '>
               <div class='card'>
               $cardimg
                $cardcap
                 </div>
                </div>
               </div>";
}
}
?>

        </div>
        <input type='hidden' value="<?php echo $poid; ?>" id="postid">


<?php 
include "bott_nav.php";
?>



</body>
<script>
    $(document).ready(function() {
   $("#delbtn").on("click",function(){

var id=$("#postid").val();
confirmprompt()
function confirmprompt() {
  
    var r = confirm("The process cannot be reversible please confirm to delete..");
    if (r == true) {
       corm();
    } else {
 var toast_del_cancel="No problem..!";
        M.toast({html: toast_del_cancel});
   }
 
}



function corm(){
$.post("delpostback.php",{poid:id},function(data){
 var toast_del_success="Deleted Successfully";
 var toast_del_failed="Failed please try again later";
   if(data=="success"){
       M.toast({html: toast_del_success});
        setTimeout(function(){
window.open("index.php","_self");
  
}, 1000);
   }
   else{
       M.toast({html: toast_del_failed});
       
   }
});

}
});
    
    });
</script>

</html>