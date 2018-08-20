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



    $sql="SELECT * FROM user WHERE STATUS='ONLINE' AND ID != $id;";
    $res=$db->query($sql);
    if($res->num_rows>0)
			{
                  $i=0;
                  echo "<ul class='collection'>";
				while($row=$res->fetch_assoc())
				{
                    $i++;
                    $id=$row["ID"];
                    $username=$row["USERNAME"];
                    $img=$row["PROFILE"];
                    $bio=$row["BIO"];
                    
                   echo"<a href='view_profile.php?view=$id'>  <li class='collection-item avatar'>
      <img src='$img' alt='' class='circle'>
      <span class='title'><b>$username</b></span>
      <p>$bio</p>
    </li></a>";
                    
                }
                  echo "</ul>";
                
            }
    
    ?>