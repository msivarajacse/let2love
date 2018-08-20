<?php
	include "database.php";
    session_start();
  
  if(!isset($_SESSION["ID"]))
{  header('Location:index.php');
// echo "<script>window.open('index.php','_self')</script>";
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

$sid=$id;
$rid=$_SESSION["RECEIVER"];
$sname=$profilename;
$sprofile=$profilepic;

?>
<?php
$sql="SELECT USERNAME,PROFILE,STATUS FROM user WHERE ID=$rid";
if($res=$db->query($sql)){
        $row=$res->fetch_assoc();
        $rname=$row["USERNAME"];
        $rprofile=$row["PROFILE"];
        $rstatus=$row["STATUS"];
}

?>

<?php
$sql="SELECT * FROM pchats WHERE SID=$sid AND RID=$rid OR RID=$sid AND SID=$rid;";
// echo $sql;
$res=$db->query($sql);
if($res->num_rows>0)
{
$i=0;
 
 while($row=$res->fetch_assoc())
  {
    $message=base64_decode($row["MESSAGE"]);
        $i++;	
 if($row["RID"]==$_SESSION["RECEIVER"]){
   $bgcolor="#03a9f433";
   $color="#000";
   $align="right";
   $profile=$sprofile;
   $class="lefbor";
   $opentag="";
   $closetag="";
   $borad="border-top-left-radius:15px;";
  //  Receiver side Styling
 }
 else{
   $bgcolor="lightgrey";
   $color="#000";
   $align="left";
   $profile=$rprofile;
   $class="righbor";
   $opentag="<blockquote>";
   $closetag="</blockquote>";
   $borad="border-top-right-radius:15px;";
   //sender side styling
  
 }
 echo "$opentag<div class='chat-box' style='background-color:$bgcolor; $borad color:$color; text-align:$align; width:auto;'><b> $message </b> </div>$closetag";
 
}
}
else {
  if($rstatus=="ONLINE"){
    $color="red";
  }
  else{
    $color="grey";
  }
  echo "<ul class='collection'>
  <li class='collection-item avatar'>
      <img src='$rprofile' alt='' class='circle'>
      <span class='title'><b> $rname </b> </span>
      <p> 
      <br>
      Start New Conversation....!
      </p>
      <a href='#!' class='secondary-content'><i class='material-icons' style='color:$color;'>favorite</i></a>
    </li>
    </ul>
    ";
}

?>