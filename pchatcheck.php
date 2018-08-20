<?php
	include "database.php";
    session_start();
  
  if(!isset($_SESSION["ID"]))
{
  header('Location:index.php');

	  // echo "<script>window.open('index.php','_self')</script>";
}
else 
{
  $sid=$_SESSION["ID"];
}
?>
<?php
$sql='SELECT MSGSTAT FROM pchats WHERE  MSGSTAT=0 AND RID='.$sid;;
$res=$db->query($sql);
if($res->num_rows>0)
{
$i=0;
while($row=$res->fetch_assoc())
  {
    $i++;
  }
if($i==0){

}
else{
  echo "<span class='new badge' data-badge-caption='' >$i</span>";
}
}
?>

