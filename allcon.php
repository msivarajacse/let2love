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
                $sid=$row["ID"];
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
                $pass=$row["PASSWORD"];
                $depass=base64_decode($pass);
                $profilepass=base64_decode($depass);
                    }
}



    $sql="SELECT * FROM user WHERE ID != $sid;";
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
                    $status=$row["STATUS"];
                     if ($status=="OFFLINE") {
                        $color="grey";
                    }
                    else {
                        $color="red";
                    
                    }
 $sql="SELECT MSGSTAT FROM pchats WHERE MSGSTAT=0 AND RID=$sid AND SID=$id";
                   
                    $result=$db->query($sql);
                    if($result->num_rows>0)
                {
                $si=0;
                while($rowmsg=$result->fetch_assoc())
                    {
                        $si++;
                    }
                    if($si!=0){
                    echo "<i class='msg-count'><span class='new badge' data-badge-caption='Message'>$si</span><i>-</i></i>";
                            }
                        }

                    
                   echo" <a href='view_profile.php?view=$id'> <li class='collection-item avatar'>
      <img src='$img' alt='' class='circle'>
      <span class='title'><b>$username</b></span>
      <p>$bio</p>
      <a href='#!' class='secondary-content'><i class='fa fa-heart' style='color:$color;'></i></a>
    </li></a> ";
                   
                  
                    
            }
                  echo "</ul>";
                
            }




    
    ?>